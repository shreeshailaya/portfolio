"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches errors thrown by `useGLTF` / Suspense child trees (e.g. 404, parse
 * error, decoder failure) and renders the procedural fallback instead.
 *
 * This makes the site robust to half-set-up asset slots: you can edit
 * MODEL_REGISTRY and the missing file won't crash the page — you'll just see
 * the procedural version until the file is in place.
 */
export class AssetErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[ModelSlot] asset load failed →", error.message, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return this.props.children;
  }
}
