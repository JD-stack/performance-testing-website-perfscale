import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Award, 
  Users, 
  Target, 
  TrendingUp,
  Shield,
  Lightbulb,
  Heart,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export function About() {
  const values = [
    {
      icon: Shield,
      title: 'Excellence',
      description: 'We maintain the highest standards in every aspect of our work, delivering quality results consistently.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay ahead of industry trends, adopting cutting-edge tools and methodologies to serve you better.'
    },
    {
      icon: Heart,
      title: 'Partnership',
      description: 'Your success is our success. We work collaboratively to understand and exceed your expectations.'
    },
    {
      icon: Zap,
      title: 'Agility',
      description: 'We adapt quickly to changing requirements and deliver solutions that meet evolving business needs.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '200+', label: 'Happy Clients' },
    { number: '10+', label: 'Years Experience' },
    { number: '99.8%', label: 'Client Satisfaction' }
  ];

  const expertise = [
    'Enterprise Application Performance',
    'Cloud-Based Systems Testing',
    'E-commerce Platform Optimization',
    'API and Microservices Testing',
    'Mobile Application Performance',
    'Database Performance Tuning',
    'CI/CD Pipeline Integration',
    'Real-time System Analysis'
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">About PerfScale</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Delivering world-class performance testing services since 2015
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  PerfScale is a leading performance testing consultancy dedicated to helping organizations 
                  deliver exceptional digital experiences. Founded in 2015, we've grown from a small team of 
                  performance engineers to a globally recognized firm serving Fortune 500 companies and 
                  innovative startups alike.
                </p>
                <p>
                  Our expertise spans across industries including finance, healthcare, e-commerce, and 
                  technology. We understand that every millisecond matters in today's digital landscape, 
                  and we're committed to ensuring your applications perform flawlessly under any condition.
                </p>
                <p>
                  With a team of certified performance engineers and a proven methodology, we've successfully 
                  tested thousands of applications, identifying critical bottlenecks and delivering actionable 
                  insights that drive measurable improvements in system performance and user satisfaction.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-2 hover:border-[#3b82f6] transition-colors">
                  <CardHeader>
                    <div className="text-4xl font-bold text-[#3b82f6] mb-2">
                      {stat.number}
                    </div>
                    <CardTitle className="text-sm text-gray-600 font-normal">
                      {stat.label}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Target className="h-16 w-16 text-[#3b82f6] mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
                Our Mission
              </h2>
            </div>
            
            <Card className="border-2 border-[#3b82f6] shadow-xl">
              <CardContent className="p-8">
                <p className="text-xl text-gray-700 leading-relaxed text-center">
                  To empower organizations with the insights and confidence needed to deliver high-performance 
                  applications that delight users, drive business growth, and withstand the demands of modern 
                  digital ecosystems. We achieve this through rigorous testing, expert analysis, and a 
                  relentless commitment to excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-[#3b82f6]" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
                Our Expertise
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We bring deep technical expertise across a wide range of technologies, platforms, and industries. 
                Our team stays current with the latest performance testing tools and best practices to deliver 
                cutting-edge solutions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="bg-[#10b981] w-2 h-2 rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-[#3b82f6]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <Award className="h-8 w-8 text-[#3b82f6]" />
                    </div>
                    <div>
                      <CardTitle>Certified Professionals</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Our team holds industry-recognized certifications
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 border-[#10b981]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <Users className="h-8 w-8 text-[#10b981]" />
                    </div>
                    <div>
                      <CardTitle>Experienced Team</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Average of 8+ years in performance engineering
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 border-[#f97316]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-[#f97316]" />
                    </div>
                    <div>
                      <CardTitle>Proven Track Record</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Consistent results and client satisfaction
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ready to optimize your application's performance? Our team is here to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-[#1e3a8a] hover:bg-gray-100">
                Get in Touch
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
