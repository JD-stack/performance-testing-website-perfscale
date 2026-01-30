import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Tab = "manual-testers" | "automation-architects";

export default function Blog() {
  const [activeTab, setActiveTab] = useState<Tab>("manual-testers");
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return Boolean(localStorage.getItem("token"));
  };

  const handleDownload = (url: string) => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="blog-page">
      <h1>Curated Learning Paths</h1>
      <p className="subtitle">
        Pick your track. Go as deep as you’re ready for.
      </p>

      <div className="tabs">
        <button
          className={activeTab === "manual-testers" ? "active" : ""}
          onClick={() => setActiveTab("manual-testers")}
        >
          Manual Testers
        </button>

        <button
          className={activeTab === "automation-architects" ? "active" : ""}
          onClick={() => setActiveTab("automation-architects")}
        >
          Automation Architects
        </button>
      </div>

      {activeTab === "manual-testers" && (
        <div className="tab-content">
          <p>
            Every expert starts by learning how software behaves when no one is
            guiding it.
            <br />
            This reading isn’t about tools — it’s about how sharp testers notice
            what others miss.
          </p>

          <button
            className="download-btn"
            onClick={() =>
              handleDownload(
                "https://www.qt.io/hubfs/A%20Beginners%20Guide%20to%20Software%20Testing.pdf?hsLang=en"
              )
            }
          >
            Download PDF
          </button>
        </div>
      )}

      {activeTab === "automation-architects" && (
        <div className="tab-content">
          <p>
            Scaling automation isn’t about writing more scripts.
            <br />
            It’s about building systems that survive growth, change, and time —
            and knowing where most teams go wrong.
          </p>

          <button
            className="download-btn"
            onClick={() =>
              handleDownload(
                "https://nadiacavalleri.com.ar/wp-content/uploads/2020/05/The-importance-of-SCM-in-testing-201003-Testing-Experience.pdf"
              )
            }
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
