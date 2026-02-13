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
      title: 'Load Testing Strategy',
      description: 'Validate system performance under expected user loads and real-world traffic patterns.',
      features: [
        'Concurrent user simulation',
        'Response time benchmarking',
        'Throughput measurement',
        'Resource utilization monitoring'
      ]
    },
    {
      icon: LineChart,
      title: 'Stress & Resilience Testing',
      description: 'Identify system limits and evaluate stability under extreme conditions.',
      features: [
        'Beyond-capacity testing',
        'Failure point identification',
        'Recovery validation',
        'System stability assessment'
      ]
    },
    {
      icon: BarChart3,
      title: 'Traffic Surge Simulation',
      description: 'Assess system behavior during sudden traffic spikes and peak demand.',
      features: [
        'Rapid load variation testing',
        'Auto-scaling validation',
        'Peak traffic simulation',
        'Elasticity verification'
      ]
    },
    {
      icon: ClipboardList,
      title: 'Endurance & Stability Testing',
      description: 'Ensure long-term reliability under sustained load conditions.',
      features: [
        'Extended duration testing',
        'Memory leak detection',
        'Performance degradation tracking',
        'Sustained load validation'
      ]
    }
  ];

  const methodology = [
    {
      step: '01',
      title: 'Requirements Analysis',
      description: 'Understanding application architecture, user behavior, and performance objectives.'
    },
    {
      step: '02',
      title: 'Test Planning',
      description: 'Designing realistic performance scenarios aligned with business goals.'
    },
    {
      step: '03',
      title: 'Environment Setup',
      description: 'Configuring environments that closely mirror production systems.'
    },
    {
      step: '04',
      title: 'Execution & Monitoring',
      description: 'Running structured tests while capturing critical system metrics.'
    },
    {
      step: '05',
      title: 'Analysis & Reporting',
      description: 'Delivering actionable insights based on data-driven analysis.'
    },
    {
      step: '06',
      title: 'Optimization & Validation',
      description: 'Implementing improvements and validating measurable performance gains.'
    }
  ];

  const deliverables = [
    'Comprehensive performance reports with key metrics',
    'Detailed bottleneck and risk analysis',
    'Actionable optimization recommendations',
    'Performance benchmark documentation',
    'Executive summary for stakeholders',
    'Reusable test scripts and configurations'
  ];

  return (
    <div className="min-h-screen">

      {/* Header */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Our Capabilities
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Comprehensive performance engineering capabilities tailored to your application, scale, and business objectives.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
              Performance Engineering Overview
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Performance engineering ensures applications can scale efficiently, remain stable under load,
              and deliver consistent user experiences. Our structured approach evaluates speed, scalability,
              and resilience under real-world scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-[#3b82f6] transition-colors">
              <CardHeader>
                <Target className="h-10 w-10 text-[#3b82f6] mb-2" />
                <CardTitle>Precision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Accurate measurements and realistic simulations ensure reliable performance insights.
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
                  Validate system growth from hundreds to millions of users.
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
                  Detect vulnerabilities early and eliminate performance risks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4">
              Core Performance Testing Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized performance assessments tailored to diverse system demands.
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

      {/* Deliverables */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
                Engagement Deliverables
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Each engagement includes comprehensive documentation and actionable insights.
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
                <CardTitle className="text-2xl text-white">
                  Ready to Optimize Performance?
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Start with a structured performance assessment today.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/contact">
                  <Button className="w-full bg-white text-[#1e3a8a] hover:bg-gray-100">
                    Request a Consultation
                  </Button>
                </Link>
                <p className="text-sm text-blue-100 text-center mt-4">
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
