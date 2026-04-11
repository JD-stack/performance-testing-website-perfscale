import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then(setPost)
      .catch(() => toast.error("Failed to load post"));
  }, [id]);

  if (!post) {
    return (
      <div className="bg-[#0f172a] min-h-screen text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white flex flex-col">
      {/* 1. Controlled Thumbnail Header */}
      <div className="relative w-full h-[250px] md:h-[400px] overflow-hidden shadow-2xl">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent" />
      </div>

      {/* 2. Blog Content Area */}
      <div className="max-w-4xl mx-auto w-full px-6 py-10 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-400 mt-3 text-lg font-medium">
            By {post.author}
          </p>
        </div>

        <hr className="border-gray-800 mb-10" />

        {/* 3. Rendered Content */}
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed mb-20"
        />
      </div>
    </div>
  );
}
