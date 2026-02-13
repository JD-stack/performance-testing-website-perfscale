import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import {
  Target,
  LineChart,
  FileCheck,
  Users,
  Workflow,
  BarChart3,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export function Services() {
  const testingTypes = [
    {
      icon: Target,
      title: "Load Testing Strategy",
      description:
        "Validate system performance under expected user loads and real-world traffic patterns.",
      features: [
        "Concurrent user simulation",
        "Response time benchmarking",
        "Throughput measurement",
        "Resource utilization monitoring",
      ],
    },
    {
      icon: LineChart,
      title: "Stress & Resilience Testing",
      description:
        "Identify system limits and evaluate stability under extreme conditions.",
      features: [
        "Beyond-capacity testing",
        "Failure point identification",
        "Recovery validation",
        "System stability assessment",
      ],
    },
    {
      icon: BarChart3,
      title: "Traffic Surge Simulation",
      description:
        "Assess system behavior during sudden traffic spikes and peak demand.",
      features: [
        "Rapid load variation testing",
        "Auto-scaling validation",
        "Peak traffic simulation",
        "Elasticity verification",
      ],
    },
    {
      icon: ClipboardList,
      title: "Endurance & Stability Testing",
      description:
        "Ensure long-term reliability under sustained load conditions.",
      features: [
        "Extended duration testing",
        "Memory leak detection",
        "Performance degradation tracking",
        "Sustained load validation",
      ],
    },
  ];

  const deliverables = [
    "Comprehensive performance reports with key metrics",
    "Detailed bottleneck and risk analysis",
    "Actionable optimization recommendations",
    "Performance benchmark documentation",
    "Executive summary for stakeholders",
    "Reusable test scripts and configurations",
  ];

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-600 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Performance Engineering Capabilities
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Scalable, resilient, and data-driven performance strategies
            designed to ensure enterprise-grade reliability.
          </p>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-slate-800 mb-6">
            Why Performance Engineering Matters
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            We combine structured methodology with real-world simulation to
            ensure your systems scale confidently under pressure and deliver
            seamless user experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {[
              {
                icon: Target,
                title: "Precision",
                desc: "Accurate simulations and realistic load modeling.",
                color: "text-blue-600",
              },
              {
                icon: Users,
                title: "Scalability",
                desc: "Validate growth from hundreds to millions of users.",
                color: "text-green-600",
              },
              {
                icon: Workflow,
                title: "Reliability",
                desc: "Detect vulnerabilities before they impact production.",
                color: "text-orange-500",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200"
              >
                <CardHeader>
                  <item.icon className={`h-10 w-10 mb-3 ${item.color}`} />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CORE CAPABILITIES ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-slate-800 mb-4">
              Core Testing Capabilities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized performance validation strategies tailored to your
              system architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {testingTypes.map((type, index) => (
              <Card
                key={index}
                className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <type.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {type.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-2">
                        {type.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mt-4">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
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

      {/* ================= DELIVERABLES + CTA ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-semibold text-slate-800 mb-6">
              Engagement Deliverables
            </h2>
            <p className="text-gray-600 mb-10">
              Every engagement provides measurable insights and clear,
              actionable recommendations.
            </p>

            <div className="space-y-4">
              {deliverables.map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <FileCheck className="h-6 w-6 text-green-500 mt-1" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-indigo-700 to-blue-600 text-white border-none">
            <CardHeader>
              <CardTitle className="text-2xl">
                Ready to Elevate Performance?
              </CardTitle>
              <CardDescription className="text-blue-100">
                Let’s design a scalable performance roadmap for your system.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Link to="/contact">
                <Button className="w-full bg-white text-indigo-700 hover:bg-gray-100 rounded-xl py-6 text-lg">
                  Request a Consultation
                </Button>
              </Link>

              <p className="text-sm text-blue-100 text-center mt-6">
                Free initial assessment • No commitment required
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
