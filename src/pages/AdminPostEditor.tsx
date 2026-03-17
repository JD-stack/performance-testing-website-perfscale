import "react-quill/dist/quill.snow.css";
import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

// Lazy load ReactQuill to avoid SSR/Vite "document is not defined" errors
const ReactQuill = lazy(() => import("react-quill"));

const API_URL = import.meta.env.VITE_API_URL;

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold", "italic", "underline", "strike",
  "color", "background",
  "list", "bullet",
  "indent",
  "align",
  "blockquote", "code-block",
  "link", "image",
];

function isQuillEmpty(value: string) {
  return value.replace(/<(.|\n)*?>/g, "").trim().length === 0;
}

export default function AdminPostEditor() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Post title is required");
      return;
    }
    if (!author.trim()) {
      toast.error("Author name is required");
      return;
    }
    if (isQuillEmpty(content)) {
      toast.error("Post content cannot be empty");
      return;
    }
    if (!thumbnail) {
      toast.error("Please upload a thumbnail image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    formData.append("thumbnail", thumbnail);

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/posts/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create post");
        return;
      }

      toast.success("Post published successfully!");
      navigate("/posts");

    } catch (err) {
      console.error("Post creation error:", err);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-[#0f172a] min-h-screen text-white pb-20">
      <h1 className="text-3xl font-bold mb-8">Create Blog Post</h1>

      <div className="max-w-4xl space-y-6">

        <div>
          <Label className="text-white mb-2 block">Title *</Label>
          <Input
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>

        <div>
          <Label className="text-white mb-2 block">Author Name *</Label>
          <Input
            placeholder="Author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>

        <div>
          <Label className="text-white mb-2 block">Thumbnail Image *</Label>
         <div className="flex items-center gap-4">
  <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
    Choose File
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
    />
  </label>
  <span className="text-gray-400 text-sm">
    {thumbnail ? thumbnail.name : "No file chosen"}
  </span>
</div>
        </div>

        <div>
          <Label className="text-white mb-2 block">Content *</Label>
          <div className="rounded-lg overflow-hidden">
            <Suspense fallback={
              <div className="bg-gray-800 h-64 flex items-center justify-center text-gray-400 rounded-lg">
                Loading editor…
              </div>
            }>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your post content here..."
                style={{ backgroundColor: "white", color: "#0f172a", minHeight: "300px", maxWidth: "100%" }}
              />
            </Suspense>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base"
          >
            {loading ? "Publishing…" : "Publish Post"}
          </Button>

        <Button
        variant="outline"
        onClick={() => navigate("/posts")}
        className="!border-gray-500 !text-gray-300 hover:!bg-gray-800 bg-transparent">
  Cancel
</Button>
        </div>

      </div>
    </div>
  );
}
