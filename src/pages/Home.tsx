import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import {
  Zap,
  TrendingUp,
  Activity,
  Timer,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function Home() {
  const testingServices = [
    {
      icon: Zap,
      title: "Load Testing",
      description:
        "Simulate thousands of concurrent users to measure system performance under expected load conditions.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      title: "Stress Testing",
      description:
        "Push your system beyond normal capacity to identify breaking points and failure modes.",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Activity,
      title: "Spike Testing",
      description:
        "Test how your application handles sudden traffic spikes and rapid load variations.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Timer,
      title: "Soak Testing",
      description:
        "Validate system stability and reliability over extended periods of sustained load.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const tools = [
    { name: "Apache JMeter", description: "Industry-standard open-source tool" },
    { name: "LoadRunner", description: "Enterprise performance testing platform" },
    { name: "k6", description: "Modern developer-centric tool" },
    { name: "Gatling", description: "High-performance load testing" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section
        className="relative text-white py-28 lg:py-36"
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
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Enterprise Performance Testing
            </h1>
            <p className="text-xl text-blue-100 mb-10">
              Ensure your applications perform flawlessly under any load.
              Expert performance engineering powered by industry-leading tools.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/about#contact">
                <Button
                  size="lg"
                  className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-6 rounded-xl shadow-md"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-6 py-6 rounded-xl"
                >
                  Explore Capabilities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-slate-800 mb-6">
            Comprehensive Testing Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-14">
            Tailored performance testing solutions designed to ensure your
            applications meet the highest enterprise standards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testingServices.map((service, index) => (
              <Card
                key={index}
                className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200"
              >
                <CardHeader>
                  <div
                    className={`${service.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}
                  >
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
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

      {/* ================= TOOLS ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-slate-800 mb-6">
            Industry-Leading Tools
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-14">
            We leverage powerful performance testing tools to deliver
            accurate, actionable insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200"
              >
                <CardHeader>
                  <CardTitle>{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-semibold text-slate-800 mb-8">
              Why Choose PerfScale?
            </h2>

            <div className="space-y-4">
              {[
                "Expert team with 10+ years of experience",
                "Comprehensive testing across multiple scenarios",
                "Detailed reporting and actionable recommendations",
                "Scalable solutions for businesses of all sizes",
                "Continuous support and optimization",
                "Certified testing professionals",
              ].map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-indigo-700 to-blue-600 text-white border-none">
            <CardHeader>
              <CardTitle className="text-2xl">
                Ready to Get Started?
              </CardTitle>
              <CardDescription className="text-blue-100">
                Let’s discuss how we can optimize your application's performance.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Link to="/about#contact">
                <Button className="w-full bg-white text-indigo-700 hover:bg-gray-100 rounded-xl py-6">
                  Contact Us
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10 rounded-xl py-6"
                >
                  View Capabilities
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
