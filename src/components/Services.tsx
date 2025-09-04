import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Bot, 
  Palette, 
  MessageSquare, 
  Server, 
  Workflow, 
  Mail, 
  Globe,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Services() {
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

  const services = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Product Engineering & MVP Development",
      description: "From idea to launch – fast and focused. We help you transform your concepts into real, working software. Whether it's a prototype, proof of concept, or a complete MVP, we build scalable, clean, and cost-efficient products that you can test with real users quickly.",
      idealFor: "Startups, entrepreneurs, SaaS builders",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI & Automation Workflows",
      description: "Automate repetitive tasks and scale smarter. We design intelligent workflows using tools like Python, N8N, and custom APIs to automate your business logic — from lead capture to customer support and document processing. Integrate your tools, reduce manual work, and grow without growing overhead.",
      idealFor: "Agencies, digital sellers, B2B systems",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Custom Web Design & Development",
      description: "Beautiful. Functional. Optimized. We build modern, responsive websites tailored to your brand — whether it's a portfolio, landing page, or business website. All designs are mobile-friendly, SEO-ready, and lightning-fast.",
      idealFor: "Personal brands, businesses, consultants",
      gradient: "from-green-600 to-blue-600"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Bulk SMS Services",
      description: "Reach thousands, instantly. Send promotional, transactional, or OTP SMS with our reliable bulk messaging solution. We support integration with your existing CRM, website, or backend systems.",
      idealFor: "Schools, retailers, logistics",
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Web Hosting",
      description: "Reliable and secure hosting to keep you online. We offer affordable, fast, and secure web hosting packages for websites, web apps, and landing pages — with full support and uptime monitoring.",
      idealFor: "WordPress sites, custom sites, landing pages",
      gradient: "from-indigo-600 to-blue-600"
    },
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "N8N Workflow Hosting",
      description: "Self-hosted N8N for full control of your automations. We provide optimized N8N hosting so you can create powerful no-code/low-code automation workflows — without platform limits. Full setup, maintenance, and custom module support included.",
      idealFor: "Automation lovers, technical founders",
      gradient: "from-teal-600 to-green-600"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Hosting",
      description: "Branded email that works. Get professional email addresses like you@yourdomain.com with our secure and easy-to-manage email hosting. Supports webmail, IMAP/SMTP, and spam protection.",
      idealFor: "Businesses, freelancers, teams",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "WordPress Design & Development",
      description: "Full control. Endless possibilities. We specialize in creating and customizing WordPress websites — including custom plugin development, custom theme development, advanced theme/plugin customization, and performance optimization and integrations.",
      idealFor: "Self-hosted CMS solutions",
      gradient: "from-gray-600 to-blue-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge variant="outline" className="text-purple-300 border-purple-300 mb-4 animate-pulse">
            🛠️ Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Turn Ideas Into
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent"> Reality</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We help individuals, startups, and small businesses turn ideas into reality with smart technology, automation, and design
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 hover:scale-105 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <div className={`bg-gradient-to-r ${service.gradient} p-3 rounded-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold mb-2">{service.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed text-sm">
                  {service.description}
                </p>
                
                <div className="flex items-center space-x-2 pt-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-green-300 text-sm font-medium">
                    Ideal for: {service.idealFor}
                  </span>
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full text-white hover:bg-white/20 group-hover:bg-white/30 transition-all duration-300 mt-4"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
                Let's discuss how we can help you build, automate, and scale your business with the right technology solutions.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                Get Started Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}