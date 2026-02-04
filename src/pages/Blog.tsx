import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

type BlogItem = {
  _id: string;
  title: string;
  category: "manual" | "automation";
  previewUrl: string;
  downloadUrl: string;
};

export default function Blog() {
  const [activeTab, setActiveTab] = useState<
    "manual" | "automation" | "all"
  >("manual");

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const navigate = useNavigate();

  const isLoggedIn = () => Boolean(localStorage.getItem("token"));

  const handlePreview = (url: string) => {
    window.open(url, "_blank"); // Google Drive viewer
  };

  const handleDownload = (url: string) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    window.open(url, "_blank"); // Google Drive download
  };

  useEffect(() => {
    if (activeTab === "all") {
      fetch(`${API_URL}/api/blogs`)
        .then(res => res.json())
        .then(setBlogs);
    }
  }, [activeTab]);

  return (
    <div className="bg-gray-50 min-h-screen px-6 pt-6">

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <Button onClick={() => setActiveTab("manual")}>Manual Testers</Button>
        <Button onClick={() => setActiveTab("automation")}>Automation Architects</Button>
        <Button onClick={() => setActiveTab("all")}>All Blogs</Button>
      </div>

      {/* Hardcoded PDFs */}
      {activeTab === "manual" && (
        <Button onClick={() => handleDownload("/pdfs/Webtours_Test_Fragment_Manisha.pdf")}>
          Download PDF
        </Button>
      )}

      {activeTab === "automation" && (
        <Button onClick={() => handleDownload("/pdfs/JMeter Perfmon Integration_Manisha.pdf")}>
          Download PDF
        </Button>
      )}

      {/* All Blogs */}
      {activeTab === "all" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4">{blog.title}</h3>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => handlePreview(blog.previewUrl)}>
                  View
                </Button>
                <Button onClick={() => handleDownload(blog.downloadUrl)}>
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


