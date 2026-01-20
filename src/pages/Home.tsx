import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Zap, 
  TrendingUp, 
  Activity, 
  Timer, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export function Home() {
  const testingServices = [
    {
      icon: Zap,
      title: 'Load Testing',
      description: 'Simulate thousands of concurrent users to measure system performance under expected load conditions.',
      color: 'text-[#3b82f6]',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Stress Testing',
      description: 'Push your system beyond normal capacity to identify breaking points and failure modes.',
      color: 'text-[#f97316]',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Activity,
      title: 'Spike Testing',
      description: 'Test how your application handles sudden traffic spikes and rapid load variations.',
      color: 'text-[#10b981]',
      bgColor: 'bg-green-50'
    },
    {
      icon: Timer,
      title: 'Soak Testing',
      description: 'Validate system stability and reliability over extended periods of sustained load.',
      color: 'text-[#8b5cf6]',
      bgColor: 'bg-purple-50'
    }
  ];

  const tools = [
    { name: 'Apache JMeter', description: 'Industry-standard open-source tool' },
    { name: 'LoadRunner', description: 'Enterprise performance testing platform' },
    { name: 'k6', description: 'Modern developer-centric tool' },
    { name: 'Gatling', description: 'High-performance load testing' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Performance Testing at Enterprise Scale
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8">
              Ensure your applications perform flawlessly under any load. Expert performance testing services powered by industry-leading tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-[#1e3a8a] hover:bg-gray-100">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Testing Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4">
              Comprehensive Testing Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our expert team delivers tailored performance testing solutions to ensure your applications meet the highest standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testingServices.map((service, index) => (
              <Card 
                key={index}
                className="border-2 hover:border-[#3b82f6] transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className={`${service.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Used */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4">
              Industry-Leading Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We leverage the most powerful performance testing tools to deliver accurate, actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
                Why Choose PerfScale?
              </h2>
              <div className="space-y-4">
                {[
                  'Expert team with 10+ years of experience',
                  'Comprehensive testing across multiple scenarios',
                  'Detailed reporting and actionable recommendations',
                  'Scalable solutions for businesses of all sizes',
                  'Continuous support and optimization',
                  'Certified testing professionals'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-[#10b981] flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card className="border-2 border-[#3b82f6] bg-gradient-to-br from-blue-50 to-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1e3a8a]">Ready to Get Started?</CardTitle>
                  <CardDescription className="text-gray-600">
                    Let's discuss how we can help optimize your application's performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/contact">
                    <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white">
                      Contact Us
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button variant="outline" className="w-full border-[#3b82f6] text-[#3b82f6] hover:bg-blue-50">
                      View Services
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
