import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, Clock, BookOpen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  guid: string;
}

export default function Blogs() {
  const [isVisible, setIsVisible] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Using a CORS proxy to fetch Medium RSS feed
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const mediumRssUrl = 'https://medium.com/@shreeshail/feed';
        const response = await fetch(proxyUrl + encodeURIComponent(mediumRssUrl));
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        const items = xmlDoc.querySelectorAll('item');
        const blogPosts: BlogPost[] = [];
        
        items.forEach((item, index) => {
          if (index < 3) { // Only get latest 3 blogs
            const title = item.querySelector('title')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            const content = item.querySelector('content\\:encoded')?.textContent || description;
            const guid = item.querySelector('guid')?.textContent || '';
            
            blogPosts.push({
              title,
              link,
              pubDate,
              description: description.replace(/<[^>]*>/g, ''), // Strip HTML tags
              content,
              guid
            });
          }
        });
        
        setBlogs(blogPosts);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load latest blogs. Please check back later.');
        // Fallback to mock data for development
        setBlogs([
          {
            title: "Building Scalable Web Applications with Modern Technologies",
            link: "https://medium.com/@shreeshail/building-scalable-web-applications",
            pubDate: new Date().toISOString(),
            description: "Learn how to build scalable web applications using modern frameworks and best practices for performance and maintainability.",
            content: "",
            guid: "1"
          },
          {
            title: "Data Engineering Best Practices for 2024",
            link: "https://medium.com/@shreeshail/data-engineering-best-practices",
            pubDate: new Date(Date.now() - 86400000).toISOString(),
            description: "Explore the latest trends and best practices in data engineering, including cloud platforms, automation, and data pipeline optimization.",
            content: "",
            guid: "2"
          },
          {
            title: "The Future of AI in Software Development",
            link: "https://medium.com/@shreeshail/future-of-ai-in-software-development",
            pubDate: new Date(Date.now() - 172800000).toISOString(),
            description: "Discover how artificial intelligence is transforming software development workflows and what developers need to know to stay ahead.",
            content: "",
            guid: "3"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return 'Recent';
    }
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Floating animation elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-bounce delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge variant="outline" className="mb-4 animate-pulse">
            📝 Latest Blogs
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Thoughts & Insights
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> from My Medium</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my latest articles on technology, development, and industry insights. 
            Stay updated with practical tips and real-world experiences.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-pulse">
                <CardHeader className="pb-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">{error}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Card 
                key={blog.guid} 
                className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 group cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => window.open(blog.link, '_blank')}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
                        {blog.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(blog.pubDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{getReadingTime(blog.content || blog.description)} min read</span>
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transform group-hover:scale-110 transition-all duration-300 flex-shrink-0 ml-2" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {blog.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-600 hover:bg-blue-50 group-hover:bg-blue-100 transition-all duration-300"
                  >
                    Read on Medium
                    <ExternalLink className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Follow My Writing Journey</h3>
              <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                I regularly share insights about technology, development practices, and industry trends. 
                Follow me on Medium to stay updated with my latest thoughts and tutorials.
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                onClick={() => window.open('https://medium.com/@shreeshail', '_blank')}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Follow on Medium
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
