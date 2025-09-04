import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Bot, ShoppingCart, Database, FileText, Users, Zap } from 'lucide-react';

export default function Projects() {
  const mainProjects = [
    {
      title: "AgentMock.com",
      subtitle: "AI Product Studio",
      description: "A vision-led platform focused on creating lightweight AI tools and automations. From AI-powered chatbots trained on private documents, to job preparation engines.",
      features: [
        "Create Resume for This Job",
        "Prepare Me for This Interview", 
        "Privacy-respecting AI agents",
        "Open models & serverless backends"
      ],
      icon: <Bot className="h-8 w-8" />,
      link: "https://agentmock.com",
      tags: ["AI", "Python", "Serverless", "Privacy-First"],
      gradient: "from-purple-600 to-blue-600"
    },
    {
      title: "PublicMart.in",
      subtitle: "Digital Marketplace",
      description: "An e-commerce site selling unique digital packs with automated delivery systems. Built with webhook-first automation using Python and AWS Lambda.",
      features: [
        "1500+ Animated Funny Reels",
        "1000+ Email Templates",
        "250+ Hindi-English eBooks",
        "Zero-touch fulfillment"
      ],
      icon: <ShoppingCart className="h-8 w-8" />,
      link: "https://publicmart.in",
      tags: ["E-commerce", "WooCommerce", "AWS Lambda", "Automation"],
      gradient: "from-green-600 to-blue-600"
    }
  ];

  const otherProjects = [
    {
      title: "AI Chatbot from Documents",
      description: "Lightweight chatbot framework that answers only from uploaded document context with PDF parsing and multilingual support.",
      icon: <FileText className="h-6 w-6" />,
      tags: ["AI", "PDF Processing", "Multilingual"]
    },
    {
      title: "WooCommerce → Google Drive Integration",
      description: "Automated system to share private digital files via Drive API post-purchase using webhooks.",
      icon: <Database className="h-6 w-6" />,
      tags: ["API Integration", "Webhooks", "Automation"]
    },
    {
      title: "Microsoft Dynamics 365 Tools",
      description: "Async and secure Python-based contact insertion/deletion tools with performance optimization.",
      icon: <Users className="h-6 w-6" />,
      tags: ["Enterprise", "Python", "Performance"]
    },
    {
      title: "CSV-to-Database Mapper",
      description: "Automated mapping and ingestion system for mismatched CSVs and SQL table schemas.",
      icon: <Zap className="h-6 w-6" />,
      tags: ["Data Engineering", "ETL", "SQL"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-purple-300 border-purple-300 mb-4">
            🛠️ Projects & MVPs
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building Solutions That
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent"> Drive Results</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From AI-powered platforms to automated e-commerce systems, here are the projects that showcase my ability to turn ideas into reality.
          </p>
        </div>

        {/* Main Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {mainProjects.map((project, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${project.gradient} p-3 rounded-lg`}>
                      {project.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                      <p className="text-purple-300 font-medium">{project.subtitle}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-white/20 text-white border-white/30">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className={`w-full bg-gradient-to-r ${project.gradient} hover:opacity-90 text-white`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit {project.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Notable Projects */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">Other Notable MVPs & Systems</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 space-y-4">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg w-fit">
                    {project.icon}
                  </div>
                  <h4 className="font-bold text-lg">{project.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-purple-300 text-purple-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}