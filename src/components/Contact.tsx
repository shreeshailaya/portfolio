import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, ExternalLink, MapPin, Calendar } from 'lucide-react';

export default function Contact() {
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      description: "Let's discuss your next project",
      action: "Send Email",
      link: "mailto:shree@linksinbio.in",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      description: "Connect for professional networking",
      action: "Connect",
      link: "https://www.linkedin.com/in/shreeshailaya/",
      gradient: "from-blue-600 to-blue-800"
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub",
      description: "Check out my open source contributions",
      action: "View Profile",
      link: "https://github.com/shreeshailaya/",
      gradient: "from-gray-600 to-gray-800"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            📬 Get In Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Let's Build Something
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Amazing Together</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you have a project in mind, need technical consultation, or just want to connect, 
            I'm always open to discussing new opportunities and collaborations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center space-y-6">
                  <div className={`bg-gradient-to-r ${method.gradient} text-white p-4 rounded-lg w-fit mx-auto`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                  </div>
                  <Button 
                    className={`w-full bg-gradient-to-r ${method.gradient} hover:opacity-90 text-white`}
                    onClick={() => window.open(method.link, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Location & Availability</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Based in India, working with clients globally. Available for remote collaborations, 
                  consulting projects, and full-time opportunities in data engineering and automation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Response Time</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  I typically respond to emails and messages within 24 hours. For urgent projects or 
                  time-sensitive discussions, feel free to mention it in your message.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-4">Ready to Start Your Next Project?</h3>
                <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                  From MVP development to enterprise automation, let's discuss how we can bring your ideas to life 
                  with cutting-edge technology and proven execution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="bg-white text-purple-600 hover:bg-gray-100 px-8"
                    onClick={() => window.open('mailto:shree@linksinbio.in', '_blank')}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-white text-purple-600 hover:bg-gray-100 px-8"
                    onClick={() => window.open('https://cal.com/shreeshail-vitkar', '_blank')}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}