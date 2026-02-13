import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

type BlogItem = {
  _id: string;
  title: string;
  pdfUrl: string;        // Cloudinary secure_url
  originalName: string; // includes .pdf
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

  /* ================= PREVIEW (GOOGLE DOCS VIEWER) ================= */
  const handlePreview = (pdfUrl: string) => {
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;

    window.open(viewerUrl, "_blank");
  };

  /* ================= DOWNLOAD (AUTH-GUARDED) ================= */
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

    if (!res.ok) {
      throw new Error("Download failed");
    }

    const data = await res.json();

    // This URL already forces attachment
    window.location.href = data.downloadUrl;

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
    <div className="bg-gray-50 min-h-screen">

      {/* ================= TABS ================= */}
      <div className="px-6 pt-6 flex gap-4">
        <Button
          variant={activeTab === "fundamentals" ? "default" : "outline"}
          onClick={() => setActiveTab("fundamentals")}
        >
          Performance Testing Fundamentals
        </Button>

        <Button
          variant={activeTab === "advanced" ? "default" : "outline"}
          onClick={() => setActiveTab("advanced")}
        >
          Advanced JMeter Engineering
        </Button>

        <Button
          variant={activeTab === "all" ? "default" : "outline"}
          onClick={() => setActiveTab("all")}
        >
          All Resources
        </Button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-6 pt-6 pb-10">

        {/* ================= MANUAL ================= */}
        {activeTab === "fundamentals" && (
          <>
            <iframe
              src="/docs/Generating and Analyzing HTML Reports in JMeter.htm"
              className="w-full border rounded-lg"
              style={{ height: "140vh" }}
            />

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

        {/* ================= AUTOMATION ================= */}
        {activeTab === "advanced" && (
          <>
            <iframe
              src="/docs/The 7 Most Useful JMeter Plugins.htm"
              className="w-full border rounded-lg"
              style={{ height: "140vh" }}
            />

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

        {/* ================= ALL BLOGS ================= */}
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
                    className="bg-white border rounded-xl shadow-sm p-6 flex flex-col justify-between"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
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





