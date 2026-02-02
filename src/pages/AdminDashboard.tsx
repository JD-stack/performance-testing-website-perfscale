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

  useEffect(() => {
    if (role !== "admin" || !token) {
      navigate("/login");
    }
  }, [role, token, navigate]);

  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !pdf) {
      toast.error("Blog title and PDF are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdf);

    try {
      const res = await fetch(`${API_URL}/api/blogs/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Upload failed");
        return;
      }

      toast.success("PDF uploaded successfully");
      setTitle("");
      setPdf(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      toast.error("Server error during upload");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6] flex items-center justify-center px-4">
      
      {/* Same width & feel as Login */}
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-[#1e3a8a]">
            Admin Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpload} className="space-y-5">

            {/* Blog title */}
            <div>
              <Label>Blog Title</Label>
              <Input
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* File upload */}
            <div>
              <Label className="mb-2 block">Upload PDF</Label>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setPdf(e.target.files?.[0] || null)}
              />

              <div className="flex flex-col items-center gap-2">
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6"
                >
                  Choose file from system
                </Button>

                <span className="text-xs text-gray-600">
                  {pdf ? pdf.name : "No file selected"}
                </span>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white py-6 text-lg"
            >
              Upload PDF
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}




