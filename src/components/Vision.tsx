import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Shield, Zap, Users, ArrowRight } from 'lucide-react';

export default function Vision() {
  const visionPoints = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast & Efficient",
      description: "Delivering solutions that work at speed without compromising quality"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy-Respecting",
      description: "Building systems that protect user data and respect digital privacy"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "AI-Powered",
      description: "Leveraging artificial intelligence to solve complex business problems"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "User-Focused",
      description: "Creating tools that genuinely improve workflows and drive results"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-purple-300 border-purple-300 mb-4">
            🌱 Vision & Future
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simplifying Digital
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent"> Complexity</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            I'm on a mission to simplify digital complexity for solopreneurs, creators, and businesses by delivering 
            fast, privacy-respecting, and AI-powered systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">My Mission</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Whether it's a fully automated product delivery system, a smart data pipeline, or a micro SaaS idea — 
                  I build with <strong className="text-white">clarity</strong>, <strong className="text-white">ownership</strong>, 
                  and a focus on <strong className="text-white">results</strong>.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">What Drives Me</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <ArrowRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Building tools that generate real business value</span>
                </li>
                <li className="flex items-start space-x-3">
                  <ArrowRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Enabling automation-first workflows for modern businesses</span>
                </li>
                <li className="flex items-start space-x-3">
                  <ArrowRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Democratizing access to AI and automation technologies</span>
                </li>
                <li className="flex items-start space-x-3">
                  <ArrowRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Creating privacy-respecting solutions in an AI-driven world</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {visionPoints.map((point, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg w-fit mx-auto">
                    {point.icon}
                  </div>
                  <h4 className="font-bold text-lg">{point.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Build the Future Together?</h3>
              <p className="text-lg text-purple-100 mb-6 max-w-2xl">
                Let's create something amazing that solves real problems and drives meaningful results.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100" onClick={() => window.open('https://tawk.to/chat/5b9d1eabc9abba5796779244/default', '_blank')}>
                Start a Conversation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}