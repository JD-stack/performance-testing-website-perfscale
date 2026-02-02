import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner@2.0.3";

const API_URL = import.meta.env.VITE_API_URL;

export function AdminDashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (role !== "admin" || !token) {
      navigate("/login");
    }
  }, [role, token, navigate]);

  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !pdf) {
      toast.error("Title and PDF are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdf);

    try {
      const res = await fetch(`${API_URL}/api/blogs/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Upload failed");
        return;
      }

      toast.success("PDF uploaded successfully!");
      setTitle("");
      setPdf(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      toast.error("Server error during upload");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border border-blue-200 shadow-2xl">

        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-t-lg">
          <CardTitle className="text-center text-xl text-white">
            Admin Dashboard
          </CardTitle>
          <p className="text-center text-blue-100 text-sm mt-1">
            Upload blog PDFs visible to users
          </p>
        </CardHeader>

        {/* Content */}
        <CardContent className="bg-white p-6">
          <form onSubmit={handleUpload} className="space-y-6">

            {/* Blog Title */}
            <div>
              <Label className="text-gray-700 font-medium">
                Blog Title
              </Label>
              <Input
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            {/* Upload PDF */}
            <div>
              <Label className="text-gray-700 font-medium">
                Upload PDF
              </Label>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => setPdf(e.target.files?.[0] || null)}
              />

              <div className="mt-3 flex flex-col items-center gap-3">
                <Button
                  type="button"
                  className="px-6 py-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose file from system
                </Button>

                {pdf ? (
                  <div className="text-sm bg-blue-50 border border-blue-200 rounded-md px-3 py-1 text-blue-800">
                    Selected: <strong>{pdf.name}</strong>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    No file selected
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="px-8 py-3 bg-[#1e3a8a] hover:bg-[#1e40af] text-white"
              >
                Upload PDF
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}

