import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Target, 
  LineChart, 
  FileCheck, 
  Users,
  Workflow,
  BarChart3,
  CheckCircle2,
  ClipboardList
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export function Services() {
  const testingTypes = [
    {
      icon: Target,
      title: 'Load Testing',
      description: 'Measure application behavior under expected user loads',
      features: [
        'Concurrent user simulation',
        'Response time analysis',
        'Throughput measurement',
        'Resource utilization tracking'
      ]
    },
    {
      icon: LineChart,
      title: 'Stress Testing',
      description: 'Determine application breaking points and limits',
      features: [
        'Beyond-capacity testing',
        'Failure point identification',
        'Recovery testing',
        'System stability analysis'
      ]
    },
    {
      icon: BarChart3,
      title: 'Spike Testing',
      description: 'Evaluate response to sudden traffic increases',
      features: [
        'Rapid load variation testing',
        'Auto-scaling validation',
        'Peak traffic simulation',
        'Response elasticity checks'
      ]
    },
    {
      icon: ClipboardList,
      title: 'Soak Testing',
      description: 'Assess long-term stability and performance',
      features: [
        'Extended duration testing',
        'Memory leak detection',
        'Performance degradation analysis',
        'Sustained load validation'
      ]
    }
  ];

  const methodology = [
    {
      step: '01',
      title: 'Requirements Analysis',
      description: 'Understanding your application, user patterns, and performance goals'
    },
    {
      step: '02',
      title: 'Test Planning',
      description: 'Designing comprehensive test scenarios and selecting appropriate tools'
    },
    {
      step: '03',
      title: 'Environment Setup',
      description: 'Configuring test environments that mirror production conditions'
    },
    {
      step: '04',
      title: 'Test Execution',
      description: 'Running performance tests and monitoring system metrics'
    },
    {
      step: '05',
      title: 'Analysis & Reporting',
      description: 'Analyzing results and providing detailed performance insights'
    },
    {
      step: '06',
      title: 'Optimization',
      description: 'Implementing recommendations and validating improvements'
    }
  ];

  const deliverables = [
    'Comprehensive test reports with performance metrics',
    'Detailed analysis of bottlenecks and issues',
    'Actionable optimization recommendations',
    'Performance benchmark documentation',
    'Executive summary for stakeholders',
    'Test scripts and configurations for future use'
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Comprehensive performance testing services tailored to your specific needs and industry requirements.
          </p>
        </div>
      </section>

      {/* Performance Testing Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
              Performance Testing Overview
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Performance testing is critical for ensuring your applications can handle real-world usage patterns. 
              Our comprehensive approach evaluates speed, scalability, and stability under various conditions, 
              helping you deliver exceptional user experiences and prevent costly downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-[#3b82f6] transition-colors">
              <CardHeader>
                <Target className="h-10 w-10 text-[#3b82f6] mb-2" />
                <CardTitle>Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Precise measurements and realistic test scenarios ensure accurate performance insights.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#10b981] transition-colors">
              <CardHeader>
                <Users className="h-10 w-10 text-[#10b981] mb-2" />
                <CardTitle>Scalability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Test your system's ability to scale from hundreds to millions of users.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#f97316] transition-colors">
              <CardHeader>
                <Workflow className="h-10 w-10 text-[#f97316] mb-2" />
                <CardTitle>Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Identify and eliminate potential failures before they impact your users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testing Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4">
              Testing Types
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer specialized testing services for every performance scenario
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testingTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <type.icon className="h-8 w-8 text-[#3b82f6]" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">{type.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {type.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4">
              Our Methodology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven six-step process to ensure thorough and effective performance testing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodology.map((item, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#3b82f6]/10 to-transparent rounded-bl-full" />
                <CardHeader>
                  <div className="text-5xl font-bold text-[#3b82f6]/20 mb-2">
                    {item.step}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
                Deliverables
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Every engagement includes comprehensive documentation and actionable insights to drive performance improvements.
              </p>
              <div className="space-y-4">
                {deliverables.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FileCheck className="h-6 w-6 text-[#10b981] flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white border-none">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Ready to Optimize Performance?</CardTitle>
                <CardDescription className="text-blue-100">
                  Get started with a comprehensive performance testing assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/contact">
                  <Button className="w-full bg-white text-[#1e3a8a] hover:bg-gray-100">
                    Request a Consultation
                  </Button>
                </Link>
                <p className="text-sm text-blue-100 text-center">
                  Free initial assessment • No commitment required
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
