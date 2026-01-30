
import { useState } from "react";
import { Button } from "../components/ui/button";

export default function Blog() {
  const [activeTab, setActiveTab] = useState<"manual" | "automation">("manual");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#1e3a8a] mb-2">
            Curated Learning Paths
          </h1>
          <p className="text-gray-600 text-lg">
            Pick your track. Go as deep as you’re ready for.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "manual" ? "default" : "outline"}
            onClick={() => setActiveTab("manual")}
            className={activeTab === "manual" ? "bg-[#1e3a8a]" : ""}
          >
            Manual Testers
          </Button>

          <Button
            variant={activeTab === "automation" ? "default" : "outline"}
            onClick={() => setActiveTab("automation")}
            className={activeTab === "automation" ? "bg-[#1e3a8a]" : ""}
          >
            Automation Architects
          </Button>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {activeTab === "manual" && (
            <>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Every expert starts by learning how software behaves when no one
                is guiding it.
                <br />
                <br />
                This reading isn’t about tools — it’s about how sharp testers
                notice what others miss.
              </p>

              <Button
                className="bg-[#1e3a8a] hover:bg-[#1e40af]"
                onClick={() =>
                  window.open(
                    "https://www.qt.io/hubfs/A%20Beginners%20Guide%20to%20Software%20Testing.pdf?hsLang=en",
                    "_blank"
                  )
                }
              >
                Download PDF
              </Button>
            </>
          )}

          {activeTab === "automation" && (
            <>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Scaling automation isn’t about writing more scripts.
                <br />
                <br />
                It’s about building systems that survive growth, change, and
                time — and knowing where most teams go wrong.
              </p>

              <Button
                className="bg-[#1e3a8a] hover:bg-[#1e40af]"
                onClick={() =>
                  window.open(
                    "https://nadiacavalleri.com.ar/wp-content/uploads/2020/05/The-importance-of-SCM-in-testing-201003-Testing-Experience.pdf",
                    "_blank"
                  )
                }
              >
                Download PDF
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

