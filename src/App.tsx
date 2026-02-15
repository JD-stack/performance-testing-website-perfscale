import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { NavBar } from "./components/NavBar";
import Blog from "./pages/Blog";
import { AdminDashboard } from "./pages/AdminDashboard";

/* NEW BLOG SYSTEM */
import Posts from "./pages/Posts";
import PostView from "./pages/PostView";
import PostEditor from "./pages/PostEditor";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-visible">
        <NavBar />

        <main className="flex-grow min-h-screen overflow-visible">
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />

            {/* New Blog System */}
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostView />} />

            {/* Admin Post Editor */}
            <Route
              path="/admin/posts/new"
              element={
                <AdminRoute>
                  <PostEditor />
                </AdminRoute>
              }
            />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Admin dashboard */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}
