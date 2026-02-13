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
    if (role !== "admin" || !token) navigate("/login");
  }, [role, token, navigate]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"fundamentals" | "advanced">(
    "fundamentals"
  );
  const [pdf, setPdf] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !pdf) {
      toast.error("Resource title and PDF are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
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

      toast.success("Resource uploaded successfully!");
      setTitle("");
      setPdf(null);
      setCategory("fundamentals");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      toast.error("Server error during upload");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-600 flex items-center justify-center px-6">

      <Card className="w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-slate-800 text-center">
            Admin Resource Upload
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpload} className="space-y-8">

            {/* Title */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">
                Resource Title
              </Label>
              <Input
                placeholder="Enter resource title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">
                Category
              </Label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as "fundamentals" | "advanced")
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="fundamentals">
                  Performance Testing Fundamentals
                </option>
                <option value="advanced">
                  Advanced JMeter Engineering
                </option>
              </select>
            </div>

            {/* File Upload */}
            <div className="space-y-3">
              <Label className="text-slate-700 font-medium">
                Upload PDF
              </Label>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setPdf(e.target.files?.[0] || null)}
              />

              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl px-6 py-5"
                >
                  Choose File
                </Button>

                <span className="text-sm text-gray-600 truncate max-w-[180px]">
                  {pdf ? pdf.name : "No file selected"}
                </span>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full rounded-xl py-6 text-lg"
            >
              Upload Resource
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


