import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

type BlogItem = {
  _id: string;
  title: string;
  pdfUrl: string;
  originalName: string;
  category: "fundamentals" | "advanced";
};

export default function Blog() {
  const [activeTab, setActiveTab] = useState<
    "fundamentals" | "advanced" | "all"
  >("fundamentals");

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = () => Boolean(localStorage.getItem("token"));

  /* ================= PREVIEW ================= */
  const handlePreview = (pdfUrl: string) => {
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
    window.open(viewerUrl, "_blank");
  };

  /* ================= DOWNLOAD ================= */
  const handleDownload = async (id: string) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/blogs/download/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Download failed");

      const { downloadUrl } = await res.json();

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.rel = "noopener";
      link.target = "_self";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  /* ================= FETCH BLOGS ================= */
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
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Resources & Insights
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Explore performance engineering fundamentals, advanced strategies,
            and expert knowledge.
          </p>
        </div>
      </section>

      {/* ================= TABS ================= */}
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            variant={activeTab === "fundamentals" ? "default" : "outline"}
            className="rounded-xl px-6 py-5"
            onClick={() => setActiveTab("fundamentals")}
          >
            Fundamentals
          </Button>

          <Button
            variant={activeTab === "advanced" ? "default" : "outline"}
            className="rounded-xl px-6 py-5"
            onClick={() => setActiveTab("advanced")}
          >
            Advanced Engineering
          </Button>

          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            className="rounded-xl px-6 py-5"
            onClick={() => setActiveTab("all")}
          >
            All Resources
          </Button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* FUNDAMENTALS */}
        {activeTab === "fundamentals" && (
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <iframe
              src="/docs/Generating and Analyzing HTML Reports in JMeter.htm"
              className="w-full"
              style={{ height: "120vh" }}
            />
          </div>
        )}

        {/* ADVANCED */}
        {activeTab === "advanced" && (
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <iframe
              src="/docs/The 7 Most Useful JMeter Plugins.htm"
              className="w-full"
              style={{ height: "120vh" }}
            />
          </div>
        )}

        {/* ALL BLOGS */}
        {activeTab === "all" && (
          <>
            {loading && (
              <p className="text-center text-gray-500 py-10">
                Loading resources...
              </p>
            )}

            {!loading && blogs.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                No resources uploaded yet.
              </p>
            )}

            {!loading && blogs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">
                        {blog.title}
                      </h3>

                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-6
                        ${
                          blog.category === "fundamentals"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {blog.category === "fundamentals"
                          ? "Performance Testing Fundamentals"
                          : "Advanced JMeter Engineering"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="rounded-xl flex-1"
                        onClick={() => handlePreview(blog.pdfUrl)}
                      >
                        Preview
                      </Button>

                      <Button
                        className="rounded-xl flex-1"
                        onClick={() => handleDownload(blog._id)}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}




