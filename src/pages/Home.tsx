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
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/40'
    },
    {
      icon: TrendingUp,
      title: 'Stress Testing',
      description: 'Push your system beyond normal capacity to identify breaking points and failure modes.',
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/30'
    },
    {
      icon: Activity,
      title: 'Spike Testing',
      description: 'Test how your application handles sudden traffic spikes and rapid load variations.',
      color: 'text-green-400',
      bgColor: 'bg-green-900/30'
    },
    {
      icon: Timer,
      title: 'Soak Testing',
      description: 'Validate system stability and reliability over extended periods of sustained load.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/30'
    }
  ];

  const tools = [
    { name: 'Apache JMeter', description: 'Industry-standard open-source tool' },
    { name: 'LoadRunner', description: 'Enterprise performance testing platform' },
    { name: 'k6', description: 'Modern developer-centric tool' },
    { name: 'Gatling', description: 'High-performance load testing' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section
        className="relative py-20 lg:py-32"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom right,
              rgba(15,23,42,0.85),
              rgba(30,58,138,0.85)
            ),
            url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Performance Testing at Enterprise Scale
            </h1>
            <p className="text-xl text-blue-200 mb-8">
              Ensure your applications perform flawlessly under any load.
              Expert performance testing services powered by industry-leading tools.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/about#contact">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-400 text-blue-300 hover:bg-blue-900/40"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* SERVICES */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-400 mb-4">
              Comprehensive Testing Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our expert team delivers tailored performance testing solutions to ensure your applications meet the highest standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testingServices.map((service, index) => (
              <Card
                key={index}
                className="bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl"
              >
                <CardHeader>
                  <div className={`${service.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <CardTitle className="text-white text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* TOOLS */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-400 mb-4">
              Industry-Leading Tools
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We leverage the most powerful performance testing tools to deliver accurate, actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-white text-lg">
                    {tool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* BLOG */}
      <section className="py-20 bg-slate-900 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-blue-400 mb-6">
          Blog
        </h2>

        <Link to="/blog">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
          >
            Visit Blog
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>


      {/* WHY CHOOSE US */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-400 mb-6">
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
                  <CheckCircle2 className="h-6 w-6 text-green-400 mt-1" />
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-slate-800 border border-blue-500 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400">

