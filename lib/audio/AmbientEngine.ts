/**
 * Cinematic ambient audio engine.
 *
 * Per-scene layers are synthesized live with the Web Audio API so the site
 * has its own evolving soundscape without shipping any audio files. Each
 * layer has its own oscillator topology + gain envelope; the engine
 * crossfades scene gains based on the global scroll progress.
 *
 * Started on first user gesture (browser autoplay policy compliance).
 * Cleanly tears down on stop().
 */

import { SCENES, SCENE_RANGES, type SceneId } from "@/lib/scenes";

interface SceneLayer {
  id: SceneId;
  /** master gain for this layer */
  gain: GainNode;
  /** wrapper to disconnect everything at once */
  nodes: AudioNode[];
}

export class AmbientEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private layers: SceneLayer[] = [];
  private running = false;
  private rafId = 0;
  private getProgress: () => number = () => 0;
  private targetMasterGain = 0.18;
  private muted = false;

  attach(getProgress: () => number) {
    this.getProgress = getProgress;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.master && this.ctx) {
      const target = muted ? 0 : this.targetMasterGain;
      this.master.gain.setTargetAtTime(target, this.ctx.currentTime, 0.25);
    }
  }

  isMuted() {
    return this.muted;
  }

  async start() {
    if (this.running) return;
    const AC: typeof AudioContext =
      (typeof window !== "undefined" &&
        ((window as unknown as { AudioContext?: typeof AudioContext })
          .AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext)) ||
      (AudioContext as typeof AudioContext);
    if (!AC) return;

    const ctx = new AC();
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        /* ignore */
      }
    }

    const master = ctx.createGain();
    master.gain.value = this.muted ? 0 : this.targetMasterGain;
    master.connect(ctx.destination);

    this.ctx = ctx;
    this.master = master;
    this.layers = SCENES.map((s) => this.buildLayer(ctx, master, s.id));
    this.running = true;
    this.tick = this.tick.bind(this);
    this.rafId = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.rafId);
    for (const l of this.layers) {
      try {
        l.nodes.forEach((n) => n.disconnect());
      } catch {
        /* ignore */
      }
    }
    this.layers = [];
    if (this.master) {
      try {
        this.master.disconnect();
      } catch {
        /* ignore */
      }
      this.master = null;
    }
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }

  private tick() {
    if (!this.running || !this.ctx) return;
    const t = this.getProgress();

    let idx = SCENE_RANGES.findIndex((r) => t >= r.start && t <= r.end);
    if (idx === -1) idx = t < 0.5 ? 0 : SCENE_RANGES.length - 1;
    const local = SCENE_RANGES[idx].local(t);

    // Each scene's gain is a triangle window centered on its midpoint
    const now = this.ctx.currentTime;
    for (let i = 0; i < this.layers.length; i++) {
      let target = 0;
      if (i === idx) target = 1 - Math.abs(local - 0.5) * 0.8;
      else if (i === idx - 1) target = Math.max(0, 0.4 * (0.5 - local));
      else if (i === idx + 1) target = Math.max(0, 0.4 * (local - 0.5));
      this.layers[i].gain.gain.setTargetAtTime(target, now, 0.5);
    }

    this.rafId = requestAnimationFrame(this.tick);
  }

  /** Build the layer topology for a given scene. */
  private buildLayer(
    ctx: AudioContext,
    master: GainNode,
    id: SceneId,
  ): SceneLayer {
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(master);

    const nodes: AudioNode[] = [gain];

    switch (id) {
      case "cosmic": {
        // Low cosmic drone (Bb + F drone) + soft "tanpura" pluck-like sine
        nodes.push(...this.makeDrone(ctx, gain, [55, 82.4], 0.35));
        nodes.push(...this.makeArp(ctx, gain, [220, 277.18, 329.63], 6, 0.08));
        break;
      }
      case "street": {
        // Synth pulse + filtered noise traffic
        nodes.push(...this.makePulse(ctx, gain, 110, 0.5));
        nodes.push(...this.makeFilteredNoise(ctx, gain, 420, 0.1));
        break;
      }
      case "projects": {
        // Wide pad + bell
        nodes.push(...this.makePad(ctx, gain, [146.83, 220, 293.66], 0.35));
        break;
      }
      case "temple": {
        // Warm tanpura drone + small bell
        nodes.push(...this.makeDrone(ctx, gain, [65.4, 98], 0.4));
        nodes.push(...this.makeArp(ctx, gain, [261.63, 311.13, 392], 8, 0.07));
        break;
      }
      case "neural": {
        // Deep violet — slow filtered noise + low sine
        nodes.push(...this.makeDrone(ctx, gain, [41.2], 0.45));
        nodes.push(...this.makeFilteredNoise(ctx, gain, 220, 0.18));
        break;
      }
      case "timeline": {
        // Cold high wind
        nodes.push(...this.makeWind(ctx, gain, 0.18));
        nodes.push(...this.makeDrone(ctx, gain, [73.42], 0.22));
        break;
      }
      case "kailash": {
        // Cinematic warm pad + tanpura
        nodes.push(...this.makePad(ctx, gain, [110, 164.81, 220], 0.45));
        nodes.push(...this.makeArp(ctx, gain, [440, 523.25], 5, 0.06));
        break;
      }
    }

    return { id, gain, nodes };
  }

  // ---- Voice builders ----------------------------------------------------

  private makeDrone(
    ctx: AudioContext,
    out: AudioNode,
    freqs: number[],
    level: number,
  ): AudioNode[] {
    const nodes: AudioNode[] = [];
    for (const f of freqs) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = level / freqs.length;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.08 + Math.random() * 0.06;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.04;
      lfo.connect(lfoGain).connect(g.gain);
      osc.connect(g).connect(out);
      osc.start();
      lfo.start();
      nodes.push(osc, g, lfo, lfoGain);
    }
    return nodes;
  }

  private makePad(
    ctx: AudioContext,
    out: AudioNode,
    freqs: number[],
    level: number,
  ): AudioNode[] {
    const nodes: AudioNode[] = [];
    const filt = ctx.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = 1100;
    filt.Q.value = 0.5;
    filt.connect(out);
    nodes.push(filt);

    for (const f of freqs) {
      const o1 = ctx.createOscillator();
      o1.type = "sawtooth";
      o1.frequency.value = f;
      const o2 = ctx.createOscillator();
      o2.type = "sawtooth";
      o2.frequency.value = f * 1.005;
      const g = ctx.createGain();
      g.gain.value = level / freqs.length;
      o1.connect(g);
      o2.connect(g);
      g.connect(filt);
      o1.start();
      o2.start();
      nodes.push(o1, o2, g);
    }
    return nodes;
  }

  private makePulse(
    ctx: AudioContext,
    out: AudioNode,
    freq: number,
    level: number,
  ): AudioNode[] {
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = freq;
    const filt = ctx.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = 800;
    const g = ctx.createGain();
    g.gain.value = level;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 1.5;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.25 * level;
    lfo.connect(lfoGain).connect(g.gain);
    osc.connect(filt).connect(g).connect(out);
    osc.start();
    lfo.start();
    return [osc, filt, g, lfo, lfoGain];
  }

  private makeFilteredNoise(
    ctx: AudioContext,
    out: AudioNode,
    cutoff: number,
    level: number,
  ): AudioNode[] {
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filt = ctx.createBiquadFilter();
    filt.type = "bandpass";
    filt.frequency.value = cutoff;
    filt.Q.value = 0.7;
    const g = ctx.createGain();
    g.gain.value = level;
    src.connect(filt).connect(g).connect(out);
    src.start();
    return [src, filt, g];
  }

  private makeWind(
    ctx: AudioContext,
    out: AudioNode,
    level: number,
  ): AudioNode[] {
    const nodes = this.makeFilteredNoise(ctx, out, 900, level);
    const filt = nodes[1] as BiquadFilterNode;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 350;
    lfo.connect(lfoGain).connect(filt.frequency);
    lfo.start();
    return [...nodes, lfo, lfoGain];
  }

  private makeArp(
    ctx: AudioContext,
    out: AudioNode,
    notes: number[],
    bpm: number,
    level: number,
  ): AudioNode[] {
    // Use a long looping buffer of pluck-like sine envelopes
    const beatLen = 60 / bpm;
    const totalLen = beatLen * notes.length * 4;
    const buf = ctx.createBuffer(
      1,
      Math.floor(totalLen * ctx.sampleRate),
      ctx.sampleRate,
    );
    const data = buf.getChannelData(0);
    for (let n = 0; n < notes.length * 4; n++) {
      const f = notes[n % notes.length];
      const start = Math.floor(n * beatLen * ctx.sampleRate);
      const dur = Math.floor(beatLen * 0.9 * ctx.sampleRate);
      for (let i = 0; i < dur; i++) {
        const tt = i / ctx.sampleRate;
        const env = Math.exp(-tt * 2);
        data[start + i] = Math.sin(2 * Math.PI * f * tt) * env;
      }
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const g = ctx.createGain();
    g.gain.value = level;
    const filt = ctx.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = 2000;
    src.connect(filt).connect(g).connect(out);
    src.start();
    return [src, g, filt];
  }
}
