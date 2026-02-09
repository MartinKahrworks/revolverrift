// src/Pages/BlogDetail.js
import { useParams, Link } from "react-router-dom";
import { NewsData } from "../../constant/blog";

const BlogDetail = () => {
  const { link } = useParams();
  const blog = NewsData.find((b) => b.link === link);

  if (!blog) {
    return <h2 className="text-center text-red-500 mt-10">Blog not found</h2>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative w-full min-h-[60vh] sm:h-[90vh]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full sm:h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" /> {/* Overlay */}
        
        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-16">
          <div className="max-w-2xl">
            <h1
              className="text-3xl sm:text-5xl font-bold mb-4 text-[#b89a6f]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {blog.title}
            </h1>
            <p
              className="text-base sm:text-lg leading-relaxed text-[#e0c4a2]"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              {blog.description}
            </p>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
        <p
          className="text-lg leading-relaxed text-[#d1c7b7]"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          {blog.fullDescription}
        </p>

        
      </div>
    </div>
  );
};

export default BlogDetail;
