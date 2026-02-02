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
    <div className="min-h-screen bg-gray-50">
      
      {/* Tabs Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-4">
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
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === "manual" && (
          <>
            <div className="w-full">
              <iframe
                src="/docs/Generating and Analyzing HTML Reports in JMeter.htm"
                title="HTML Reports in JMeter"
                className="w-full min-h-[1400px] border rounded-lg bg-white"
              />
            </div>

            <div className="mt-8">
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

        {activeTab === "automation" && (
          <>
            <div className="w-full">
              <iframe
                src="/docs/The 7 Most Useful JMeter Plugins.htm"
                title="JMeter Plugins"
                className="w-full min-h-[1400px] border rounded-lg bg-white"
              />
            </div>

            <div className="mt-8">
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







