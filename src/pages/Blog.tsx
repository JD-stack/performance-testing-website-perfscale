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
      
      {/* Tabs */}
      <div className="px-6 pt-6 flex gap-4">
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

      {/* CONTENT AREA — FULL WIDTH */}
      <div className="mt-6">
        {activeTab === "manual" && (
          <>
            <iframe
              src="/docs/Generating and Analyzing HTML Reports in JMeter.htm"
              title="HTML Reports in JMeter"
              className="w-full h-[85vh] border-t"
            />

            <div className="px-6 py-6">
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
            <iframe
              src="/docs/The 7 Most Useful JMeter Plugins.htm"
              title="JMeter Plugins"
              className="w-full h-[85vh] border-t"
            />

            <div className="px-6 py-6">
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






