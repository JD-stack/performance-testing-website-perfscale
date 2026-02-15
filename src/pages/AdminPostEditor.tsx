import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPostEditor() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    await fetch(`${API_URL}/api/posts/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    alert("Post created!");
  };

  return (
    <div className="p-10 bg-[#0f172a] min-h-screen text-white">
      <h1 className="text-3xl mb-6">Create Blog Post</h1>

      <input
        placeholder="Title"
        className="w-full mb-4 p-3 rounded bg-gray-800"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Author Name"
        className="w-full mb-4 p-3 rounded bg-gray-800"
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
      />

      <ReactQuill theme="snow" value={content} onChange={setContent} />

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-blue-600 rounded"
      >
        Publish Post
      </button>
    </div>
  );
}
