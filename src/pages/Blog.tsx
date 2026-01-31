import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Blog() {
  const [activeTab, setActiveTab] = useState<"manual" | "automation">("manual");
  const navigate = useNavigate();

  const isLoggedIn = () => Boolean(localStorage.getItem("token"));

  const handleDownload = (pdf: string) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    window.open(pdf, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
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

        {/* Manual Testers */}
        {activeTab === "manual" && (
          <>
            <iframe
              src="/docs/Generating and Analyzing HTML Reports in JMeter.htm"
              className="w-full h-[700px] bg-white rounded shadow mb-6"
              title="HTML Reports in JMeter"
            />

            <Button
              onClick={() =>
                handleDownload("/pdfs/Webtours_Test_Fragment_Manisha.pdf")
              }
            >
              Download PDF
            </Button>
          </>
        )}

        {/* Automation Architects */}
        {activeTab === "automation" && (
          <>
            <iframe
              src="/docs/The 7 Most Useful JMeter Plugins.htm"
              className="w-full h-[700px] bg-white rounded shadow mb-6"
              title="JMeter Plugins"
            />

            <Button
              onClick={() =>
                handleDownload("/pdfs/JMeter Perfmon Integration_Manisha.pdf")
              }
            >
              Download PDF
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

