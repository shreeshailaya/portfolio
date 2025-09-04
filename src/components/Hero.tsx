import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Interactive mouse-following elements */}
      <div 
        className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="space-y-8 max-w-4xl mx-auto">
          <Badge 
            variant="outline" 
            className="text-purple-300 border-purple-300 mb-4 animate-bounce hover:scale-110 transition-transform duration-300"
          >
            🚀 Available for New Opportunities
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Shreeshail Vitkar
          </h1>
          
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              Self-driven <span className="text-purple-300 font-semibold hover:text-purple-200 transition-colors duration-300">Technologist</span>, 
              <span className="text-blue-300 font-semibold hover:text-blue-200 transition-colors duration-300"> Data Engineer</span> & 
              <span className="text-green-300 font-semibold hover:text-green-200 transition-colors duration-300"> Automation Enthusiast</span>
            </p>
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Specializing in building automated backend systems, AI-powered tools, and digital commerce platforms 
              that solve real business problems.
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
               <strong className="text-white">Building AI-powered solutions that scale Turning chaos into systems</strong>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              onClick={() => window.open('mailto:shree@linksinbio.in', '_blank')}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              onClick={() => window.open('https://github.com/shreeshailaya?tab=repositories', '_blank')}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              View Projects
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
            <a 
              href="https://github.com/shreeshailaya" 
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/shreeshailaya/" 
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="mailto:shree@linksinbio.in" 
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
}