import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner"; // Using the same toast library for consistency

const API_URL = import.meta.env.VITE_API_URL;

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/posts`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Could not load blog posts");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0f172a] min-h-screen text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Performance Testing Blog</h1>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No posts found. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link 
                to={`/posts/${post._id}`} 
                key={post._id}
                className="group transition-transform hover:-translate-y-2"
              >
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 hover:border-blue-500/50 transition-colors">
                  {/* Thumbnail Container */}
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-5">
                    <h2 className="text-xl font-bold line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-gray-400 text-sm">By {post.author}</p>
                      <span className="text-blue-500 text-sm font-medium">Read More →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

