import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Bot, 
  Mail, 
  MessageSquare, 
  ShoppingCart, 
  BookOpen, 
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function UsefulLinks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const links = [
    {
      title: "Agent Mock",
      url: "agentmock.com",
      description: "AI HR platform to hire the suitable candidate",
      icon: <Bot className="h-6 w-6" />,
      gradient: "from-purple-600 to-blue-600"
    },
    {
      title: "Email Login",
      url: "email.linksinbio.in",
      description: "Professional email hosting and management portal",
      icon: <Mail className="h-6 w-6" />,
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "SMS Panel",
      url: "http://sms.hishree.com",
      description: "Bulk SMS services and messaging platform",
      icon: <MessageSquare className="h-6 w-6" />,
      gradient: "from-green-600 to-blue-600"
    },
    {
      title: "PublicMart E-Comm Store",
      url: "publicmart.in",
      description: "Digital marketplace for creative products and digital packs",
      icon: <ShoppingCart className="h-6 w-6" />,
      gradient: "from-orange-600 to-red-600"
    },
    {
      title: "CDAC Notes",
      url: "https://github.com/shreeshailaya/C-DAC-Notes",
      description: "Comprehensive study materials and notes for CDAC courses",
      icon: <BookOpen className="h-6 w-6" />,
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      title: "Job Portal",
      url: "linksinbio.in/jobs",
      description: "Find and post job opportunities in technology and development",
      icon: <Briefcase className="h-6 w-6" />,
      gradient: "from-teal-600 to-green-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Floating animation elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-bounce delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge variant="outline" className="mb-4 animate-pulse">
            🔗 Useful Links
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Quick Access to Our
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Projects & Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our live projects, tools, and platforms that are helping businesses and individuals achieve their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((link, index) => (
            <Card 
              key={index} 
              className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 group cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => window.open(link.url.startsWith('http') ? link.url : `https://${link.url}`, '_blank')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`bg-gradient-to-r ${link.gradient} text-white p-3 rounded-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                      {link.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                        {link.title}
                      </CardTitle>
                      <p className="text-sm text-purple-600 font-medium">{link.url}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transform group-hover:scale-110 transition-all duration-300" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {link.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  className="w-full text-purple-600 hover:bg-purple-50 group-hover:bg-purple-100 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(link.url.startsWith('http') ? link.url : `https://${link.url}`, '_blank');
                  }}
                >
                  Visit Platform
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Explore More Projects</h3>
              <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
                These are just a few of our active projects. We're constantly building and launching new solutions to help businesses grow.
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                onClick={() => window.open('https://github.com/shreeshailaya/', '_blank')}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View All Projects
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}