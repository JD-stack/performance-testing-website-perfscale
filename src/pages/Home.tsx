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
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: TrendingUp,
      title: 'Stress Testing',
      description: 'Push your system beyond normal capacity to identify breaking points and failure modes.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: Activity,
      title: 'Spike Testing',
      description: 'Test how your application handles sudden traffic spikes and rapid load variations.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Timer,
      title: 'Soak Testing',
      description: 'Validate system stability and reliability over extended periods of sustained load.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const tools = [
    { name: 'Apache JMeter', description: 'Industry-standard open-source tool' },
    { name: 'LoadRunner', description: 'Enterprise performance testing platform' },
    { name: 'k6', description: 'Modern developer-centric tool' },
    { name: 'Gatling', description: 'High-performance load testing' }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">

      {/* HERO */}
      <section
        className="relative py-24"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom right,
              rgba(15,23,42,0.92),
              rgba(30,58,138,0.92)
            ),
            url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Performance Testing at Enterprise Scale
            </h1>

            <p className="text-xl text-blue-200 mb-10">
              Ensure your applications perform flawlessly under any load.
              Expert performance testing services powered by industry-leading tools.
            </p>

            <div className="flex gap-5">
              <Link to="/about#contact">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-400 text-blue-300 hover:bg-blue-900"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* SERVICES */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#1e3a8a] mb-4">
              Comprehensive Testing Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our expert team delivers tailored performance testing solutions to ensure your applications meet the highest standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testingServices.map((service, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className={`${service.bgColor} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                    <service.icon className={`h-7 w-7 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {service.title}
                  </CardTitle>
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


      {/* TOOLS */}
      <section className="py-20 bg-gray-100 text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#1e3a8a] mb-4">
              Industry-Leading Tools
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We leverage the most powerful performance testing tools to deliver accurate, actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-lg transition"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">
                    {tool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* BLOG */}
      <section className="py-20 bg-white text-center text-black">
        <h2 className="text-4xl font-bold text-[#1e3a8a] mb-6">
          Blog
        </h2>

        <Link to="/blog">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          >
            Visit Blog
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>


      {/* WHY CHOOSE */}
      <section className="py-20 bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14">

          <div>
            <h2 className="text-4xl font-bold text-blue-400 mb-8">
              Why Choose PerfScale?
            </h2>

            <div className="space-y-5">
              {[
                'Expert team with 10+ years of experience',
                'Comprehensive testing across multiple scenarios',
                'Detailed reporting and actionable recommendations',
                'Scalable solutions for businesses of all sizes',
                'Continuous support and optimization',
                'Certified testing professionals'
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 mt-1" />
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-white text-black border border-blue-500 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1e3a8a]">
                Ready to Get Started?
              </CardTitle>
              <CardDescription className="text-gray-600">
                Let's discuss how we can help optimize your application's performance.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Link to="/about#contact">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Contact Us
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  View Services
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </section>

    </div>
  );
}

