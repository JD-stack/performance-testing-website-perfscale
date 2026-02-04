import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

type BlogItem = {
  _id: string;
  title: string;
  pdfUrl: string;
  originalName: string;
  category: "manual" | "automation";
};

export default function Blog() {
  const [activeTab, setActiveTab] =
    useState<"manual" | "automation" | "all">("manual");
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = () => Boolean(localStorage.getItem("token"));

  const handlePreview = (pdfUrl: string) => {
    const googleViewer = `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
    window.open(googleViewer, "_blank");
  };

  const handleDownload = (pdfUrl: string) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    window.open(pdfUrl, "_blank");
  };

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
    <div className="bg-gray-50 min-h-screen">
      <div className="px-6 pt-6 flex gap-4">
        <Button onClick={() => setActiveTab("manual")}>Manual Testers</Button>
        <Button onClick={() => setActiveTab("automation")}>
          Automation Architects
        </Button>
        <Button onClick={() => setActiveTab("all")}>All Blogs</Button>
      </div>

      <div className="px-6 pt-6 pb-10">
        {activeTab === "all" && (
          <>
            {loading && <p>Loading blogs…</p>}

            {!loading && blogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white border rounded-xl p-6"
                  >
                    <h3 className="font-semibold mb-4">{blog.title}</h3>

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



