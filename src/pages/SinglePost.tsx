import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { toast } from "sonner"; // Assuming you're using sonner based on your editor code
import { Button } from "../components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Check if the user is an admin
  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${id}`)
      .then((res) => res.json())
      .then(setPost)
      .catch(() => toast.error("Failed to load post"));
  }, [id]);

  // 2. Logic to delete the post
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        toast.success("Post deleted successfully");
        navigate("/posts"); // Redirect back to the blog list
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete post");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!post) {
    return (
      <div className="bg-[#0f172a] min-h-screen text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-10">
      <div className="max-w-4xl mx-auto">
        {/* FIX 1: Restricted Thumbnail Size */}
        {/* We use h-[400px] and object-cover to ensure it never fills the screen */}
        <div className="w-full h-[300px] md:h-[450px] overflow-hidden rounded-xl mb-8 border border-gray-800">
          <img 
            src={post.thumbnail} 
            alt={post.title}
            className="w-full h-full object-cover object-center" 
          />
        </div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-400">By {post.author}</p>
          </div>

          {/* FIX 2: Admin Delete Button */}
          {isAdmin && (
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete Post"}
            </Button>
          )}
        </div>

        <hr className="border-gray-800 mb-8" />

        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
        />
      </div>
    </div>
  );
}

