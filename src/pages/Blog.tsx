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
    <div className="min-h-screen bg-gray-50 px-6 py-14">
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

        {/* ================= Manual Testers ================= */}
        {activeTab === "manual" && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Reading Material
            </h2>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-10">
              <iframe
                src="/docs/Generating and Analyzing HTML Reports in JMeter.htm"
                title="Generating and Analyzing HTML Reports in JMeter"
                className="w-full min-h-[85vh]"
              />
            </div>

            <div className="flex justify-center">
              <Button
                className="px-8 py-5 text-lg"
                onClick={() =>
                  handleDownload("/pdfs/Webtours_Test_Fragment_Manisha.pdf")
                }
              >
                Download PDF
              </Button>
            </div>
          </>
        )}

        {/* ================= Automation Architects ================= */}
        {activeTab === "automation" && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Reading Material
            </h2>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-10">
              <iframe
                src="/docs/The 7 Most Useful JMeter Plugins.htm"
                title="The 7 Most Useful JMeter Plugins"
                className="w-full min-h-[85vh]"
              />
            </div>

            <div className="flex justify-center">
              <Button
                className="px-8 py-5 text-lg"
                onClick={() =>
                  handleDownload("/pdfs/JMeter Perfmon Integration_Manisha.pdf")
                }
              >
                Download PDF
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

