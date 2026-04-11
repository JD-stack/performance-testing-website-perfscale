import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // IMPROVED: More robust admin check
  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${id}`)
      .then((res) => res.json())
      .then(setPost)
      .catch(() => toast.error("Failed to load post"));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        toast.success("Post deleted");
        navigate("/posts");
      } else {
        const data = await res.json();
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Server error.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!post) return <div className="bg-[#0f172a] min-h-screen" />;

  return (
    <div className="bg-[#0f172a] min-h-screen text-white flex flex-col">
      {/* HEADER: Fixed height container prevents the fullscreen image issue */}
      <div className="relative w-full h-[250px] md:h-[400px] overflow-hidden shadow-2xl">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="w-full h-full object-cover" 
        />
        {/* Dark gradient ensures title is readable and image blends into background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent" />
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-4xl mx-auto w-full px-6 py-10 flex-grow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{post.title}</h1>
            <p className="text-gray-400 mt-2 text-lg">By {post.author}</p>
          </div>

          {/* DELETE BUTTON: Visible only to admins */}
          {isAdmin && (
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 w-fit shrink-0 px-6 py-6 text-lg"
            >
              {isDeleting ? "Deleting..." : "Delete Post"}
            </Button>
          )}
        </div>

        <hr className="border-gray-800 mb-10" />

        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed mb-20"
        />
      </div>
    </div>
  );
}

