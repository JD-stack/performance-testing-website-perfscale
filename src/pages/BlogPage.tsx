import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/posts`)
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-10">
      <h1 className="text-4xl mb-10">Blog</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Link to={`/blog/${post._id}`} key={post._id}>
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
              <img src={post.thumbnail} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-400 mt-2">By {post.author}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

