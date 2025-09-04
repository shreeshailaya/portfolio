import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Cloud, Database, Bot, Zap, Globe } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code className="h-6 w-6" />,
      skills: ["Python", "Java", "Shell", "JavaScript"],
      gradient: "from-blue-600 to-purple-600"
    },
    {
      title: "Cloud & Infra",
      icon: <Cloud className="h-6 w-6" />,
      skills: ["AWS (IOT, Lambda, S3, AppFlow)", "Docker", "CI/CD"],
      gradient: "from-green-600 to-blue-600"
    },
    {
      title: "APIs",
      icon: <Globe className="h-6 w-6" />,
      skills: ["Salesforce","Google Drive", "WooCommerce REST", "Microsoft Dynamics Web API"],
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "Automation",
      icon: <Zap className="h-6 w-6" />,
      skills: ["N8N", "Webhooks", "FastAPI", "Event-based Architecture"],
      gradient: "from-yellow-600 to-orange-600"
    },
    {
      title: "Data Engineering",
      icon: <Database className="h-6 w-6" />,
      skills: ["Glue","ETL pipelines", "Airbyte", "Databricks"],
      gradient: "from-indigo-600 to-blue-600"
    },
    {
      title: "AI/ML Stack",
      icon: <Bot className="h-6 w-6" />,
      skills: ["PyTorch", "Open-source LLMs", "Contextual Chatbots"],
      gradient: "from-red-600 to-purple-600"
    }
  ];

  const coreStrengths = [
    { name: "Python Development", level: 95 },
    { name: "API Integration", level: 90 },
    { name: "Cloud Architecture", level: 85 },
    { name: "Automation Systems", level: 92 },
    { name: "Data Engineering", level: 88 },
    { name: "AI/ML Implementation", level: 85 }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            🧰 Technologies & Skills
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Technical
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Arsenal</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience in building scalable, automated systems.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`bg-gradient-to-r ${category.gradient} text-white p-3 rounded-lg`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {category.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Core Strengths */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900">Core Strengths</CardTitle>
            <p className="text-gray-600">Proficiency levels based on real-world project experience</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {coreStrengths.map((strength, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{strength.name}</span>
                    <span className="text-sm font-medium text-gray-600">{strength.level}%</span>
                  </div>
                  <Progress value={strength.level} className="h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Always Learning, Always Building</h3>
              <p className="text-lg text-purple-100 max-w-3xl mx-auto">
                I stay ahead of the curve in AI, data engineering, and automation — constantly exploring new technologies 
                and techniques to deliver cutting-edge solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}