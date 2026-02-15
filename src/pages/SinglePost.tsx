import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${id}`)
      .then(res => res.json())
      .then(setPost);
  }, [id]);

  if (!post) return null;

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-10">
      <img src={post.thumbnail} className="w-full rounded-xl mb-6" />
      <h1 className="text-4xl mb-2">{post.title}</h1>
      <p className="text-gray-400 mb-6">By {post.author}</p>

      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="prose prose-invert max-w-none"
      />
    </div>
  );
}

