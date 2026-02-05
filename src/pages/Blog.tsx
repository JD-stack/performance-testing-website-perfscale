import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

type BlogItem = {
  _id: string;
  title: string;
  pdfUrl: string; // Cloudinary secure_url
  originalName: string; // includes .pdf
  category: "manual" | "automation";
};

export default function Blog() {
  const [activeTab, setActiveTab] = useState<"manual" | "automation" | "all">(
    "manual"
  );
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = () => Boolean(localStorage.getItem("token"));

  // ================= PREVIEW (GOOGLE DOCS VIEWER) =================
  const handlePreview = (pdfUrl: string) => {
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
    window.open(viewerUrl, "_blank");
  };

  // ================= DOWNLOAD (AUTH-GUARDED) =================
  const handleDownload = (pdfUrl: string) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    window.open(pdfUrl, "_blank");
  };

  // ================= FETCH BLOGS =================
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data || []);
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "all") fetchBlogs();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-50">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16">
        {/* HEADER */}
        <header className="mb-8">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-sky-400">
            PerfScale Blog
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Performance testing playbook
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            Deep‑dive guides, reusable setups, and downloadable PDFs for manual
            testers and automation architects.
          </p>
        </header>

        {/* TABS */}
        <div className="mb-8">
          <div className="inline-flex rounded-full border border-slate-700 bg-slate-900/80 p-1 shadow-lg shadow-slate-950/40 backdrop-blur">
            {[
              { id: "manual", label: "Manual Testers" },
              { id: "automation", label: "Automation Architects" },
              { id: "all", label: "All Blogs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as typeof activeTab)
                }
                className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-sky-400 text-slate-950 shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid lg:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)] gap-8 items-start">
          {/* ARTICLE CARD */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl shadow-xl shadow-slate-950/60 overflow-hidden backdrop-blur">
            {/* Browser chrome */}
            <div className="border-b border-slate-800 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <p className="ml-3 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                  {activeTab === "manual"
                    ? "HTML report walkthrough"
                    : activeTab === "automation"
                    ? "JMeter plugins guide"
                    : "All articles"}
                </p>
              </div>
            </div>

            {/* IFRAME CONTENT */}
            {activeTab === "manual" && (
              <iframe
                src="/docs/Generating and Analyzing HTML Reports in JMeter.htm"
                className="w-full border-0"
                style={{ height: "140vh" }}
              />
            )}

            {activeTab === "automation" && (
              <iframe
                src="/docs/The 7 Most Useful JMeter Plugins.htm"
                className="w-full border-0"
                style={{ height: "140vh" }}
              />
            )}

            {activeTab === "all" && (
              <div className="p-6">
                {loading && (
                  <p className="text-sm text-slate-300">Loading blogs…</p>
                )}
                {!loading && blogs.length === 0 && (
                  <p className="text-sm text-slate-300">
                    No blogs uploaded yet.
                  </p>
                )}
                {!loading && blogs.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {blogs.map((blog) => (
                      <div
                        key={blog._id}
                        className="group bg-slate-900/80 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-sm shadow-slate-950/40 hover:-translate-y-1 hover:shadow-lg transition-transform"
                      >
                        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-sky-400 mb-2">
                          {blog.category === "manual"
                            ? "Manual"
                            : "Automation"}
                        </p>
                        <h3 className="text-sm font-semibold text-slate-50 line-clamp-2">
                          {blog.title}
                        </h3>
                        <div className="mt-4 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-800"
                            onClick={() => handlePreview(blog.pdfUrl)}
                          >
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-sky-400 text-slate-950 hover:bg-sky-300"
                            onClick={() => handleDownload(blog.pdfUrl)}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SIDE PANEL */}
          <aside className="space-y-4">
            {(activeTab === "manual" || activeTab === "automation") && (
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl shadow-xl shadow-slate-950/60 p-5 backdrop-blur">
                <h2 className="text-sm font-semibold text-slate-50">
                  Download this guide
                </h2>
                <p className="mt-2 text-xs text-slate-300">
                  Get an offline‑ready PDF with all steps and screenshots. Ideal
                  for sharing with your team or using during test runs.
                </p>
                <Button
                  className="mt-4 w-full justify-center gap-2 bg-sky-400 text-slate-950 hover:bg-sky-300"
                  onClick={() =>
                    handleDownload(
                      activeTab === "manual"
                        ? "/pdfs/Webtours_Test_Fragment_Manisha.pdf"
                        : "/pdfs/JMeter Perfmon Integration_Manisha.pdf"
                    )
                  }
                >
                  Download PDF
                </Button>
              </div>
            )}

            <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 text-xs text-slate-300">
              <p className="font-semibold mb-1 text-slate-100">
                Tip for better readability
              </p>
              <p>
                Use a 75% zoom level in your browser when following along with
                long HTML report walkthroughs so charts and tables fit nicely
                on screen.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


