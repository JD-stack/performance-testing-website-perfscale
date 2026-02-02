import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Blog() {
  const [activeTab, setActiveTab] = useState<"manual" | "automation">("manual");
  const navigate = useNavigate();

  const isLoggedIn = () => Boolean(localStorage.getItem("token"));

  const handleDownload = (pdfPath: string) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    window.open(pdfPath, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Tabs */}
        <div className="flex gap-4 mb-10">
          <Button
            variant={activeTab === "manual" ? "default" : "outline"}
            onClick={() => setActiveTab("manual")}
          >
            Manual Testers
          </Button>
          <Button
            variant={activeTab === "automation" ? "default" : "outline"}
            onClick={() => setActiveTab("automation")}
          >
            Automation Architects
          </Button>
        </div>

        {/* ========== MANUAL TESTERS ========== */}
        {activeTab === "manual" && (
          <article className="bg-white rounded-xl shadow-md p-10 max-w-5xl mx-auto">

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Generating and Analyzing HTML Reports in JMeter
            </h1>

            <p className="text-red-600 text-lg leading-relaxed mb-8">
              Turning numbers into insights – that’s where JMeter’s HTML reports
              shine. Instead of digging through raw .jtl or .csv files, you get
              clean, interactive dashboards that instantly highlight response
              times, throughput, errors, and more.
            </p>

            <iframe
              src="/docs/Generating and Analyzing HTML Reports in JMeter.htm"
              title="HTML Reports in JMeter"
              className="w-full min-h-[120vh] border rounded-lg"
            />

            <div className="mt-10">
              <Button
                className="px-10 py-6 text-lg"
                onClick={() =>
                  handleDownload("/pdfs/Webtours_Test_Fragment_Manisha.pdf")
                }
              >
                Download PDF
              </Button>
            </div>
          </article>
        )}

        {/* ========== AUTOMATION ARCHITECTS ========== */}
        {activeTab === "automation" && (
          <article className="bg-white rounded-xl shadow-md p-10 max-w-5xl mx-auto">

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              The 7 Most Useful JMeter Plugins
            </h1>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              JMeter plugins extend core functionality and unlock advanced
              performance insights. From custom listeners to real-time
              monitoring, plugins make large-scale testing more effective.
            </p>

            <iframe
              src="/docs/The 7 Most Useful JMeter Plugins.htm"
              title="JMeter Plugins"
              className="w-full min-h-[120vh] border rounded-lg"
            />

            <div className="mt-10">
              <Button
                className="px-10 py-6 text-lg"
                onClick={() =>
                  handleDownload("/pdfs/JMeter Perfmon Integration_Manisha.pdf")
                }
              >
                Download PDF
              </Button>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}




