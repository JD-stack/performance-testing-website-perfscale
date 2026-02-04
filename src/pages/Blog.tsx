import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

type BlogItem = {
  _id: string;
  title: string;
  pdfUrl: string;
  originalName: string;
};

export default function Blog() {
  const [activeTab, setActiveTab] = useState<
    "manual" | "automation" | "all"
  >("manual");

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = () => Boolean(localStorage.getItem("token"));

  const handlePreview = (pdfUrl: string) => {
    window.open(`${pdfUrl}?inline=true`, "_blank");
  };

  const handleDownload = (pdfUrl: string) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    window.open(`${pdfUrl}?download=true`, "_blank");
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "all") fetchBlogs();
  }, [activeTab]);

  return (
    <div className="bg-gray-50 min-h-screen">

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

        <Button
          variant={activeTab === "all" ? "default" : "outline"}
          onClick={() => setActiveTab("all")}
        >
          All Blogs
        </Button>
      </div>

      {/* CONTENT */}
      <div className="px-6 pt-6 pb-10">

        {/* KEEP HARDCODED PDFs */}
        {activeTab === "manual" && (
          <>
            <iframe
              src="/docs/Generating and Analyzing HTML Reports in JMeter.htm"
              className="w-full border rounded-lg"
              style={{ height: "140vh" }}
            />
          </>
        )}

        {activeTab === "automation" && (
          <>
            <iframe
              src="/docs/The 7 Most Useful JMeter Plugins.htm"
              className="w-full border rounded-lg"
              style={{ height: "140vh" }}
            />
          </>
        )}

        {/* ALL BLOGS */}
        {activeTab === "all" && (
          <>
            {loading && <p className="text-gray-500">Loading blogs…</p>}

            {!loading && blogs.length === 0 && (
              <p className="text-gray-500">No blogs uploaded yet.</p>
            )}

            {!loading && blogs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white border rounded-xl shadow-sm p-6"
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      {blog.title}
                    </h3>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handlePreview(blog.pdfUrl)}
                      >
                        Preview
                      </Button>

                      <Button
                        onClick={() => handleDownload(blog.pdfUrl)}
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

