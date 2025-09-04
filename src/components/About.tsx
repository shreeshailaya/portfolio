import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Database, Bot, Cloud, Zap, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function About() {
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

  const highlights = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Full-Stack Builder",
      description: "I don't just plan — I ship working tools and MVPs that generate value"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "End-to-End Automator",
      description: "From API integration to digital delivery to cloud-based workflows"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Business-Aware Technologist",
      description: "Every tool I build solves a real need and often results in product-market fit tests"
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI & Automation Expert",
      description: "Constantly exploring new technologies in AI, data engineering, and automation"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Supportive Mentor",
      description: "I've mentored junior engineers and encourage open-source contributions"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud-Native Architecture",
      description: "Strong foundation in Python, cloud-native architecture, and real-world API integrations"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge variant="outline" className="mb-4 animate-bounce">
            🧑‍💻 About Me
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Building the Future with
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Code & Vision</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            I'm a self-driven technologist, data engineer, and automation enthusiast with a strong foundation in 
            <strong> Python</strong>, <strong>cloud-native architecture</strong>, and real-world <strong>API integrations</strong>. 
            I specialize in building automated backend systems, AI-powered tools, and digital commerce platforms 
            that solve real business problems with speed and scale.
          </p>
        </div>

        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Excellence & Product Thinking</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  I blend <strong>technical execution</strong> with <strong>product thinking</strong>, and have launched 
                  multiple MVPs that validate ideas, drive revenue, and enable automation-first workflows.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <Card 
              key={index} 
              className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100 + 500}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg transform hover:rotate-12 transition-transform duration-300">
                    {highlight.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}