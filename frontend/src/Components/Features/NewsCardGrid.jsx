import React, { useEffect, useState } from "react";
import { getBlogs, getBlogBySlug, getNewsPageData } from "../../api/blogApi";
import { getHomePage } from "../../api/homeApi";
import { Link, useParams } from "react-router-dom";
import { FeaturedBlogSkeleton, PageSkeleton } from "../Skeleton/Skeleton";
import bgImage from '../../assets/Texturelabs_Grunge_353M.webp';



// ===================================
// Developer Blogs (Homepage)
// ===================================
export const NewsCardGrid = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // We get the data pre-fetched by homeApi.js connected to the Blog CMS!
    getHomePage().then((data) => {
      if (data && data.latestNews) {
        setBlogs(data.latestNews);
      }
    });
  }, []);

  return (
    <div className="w-full bg-black text-[#d1c7b7] pt-4 pb-0 bg-cover bg-fixed "
      style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center mb-12 mt-0 py-20">
          <h1
            className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#e4d6c3]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Developer Blogs
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-14">
          {blogs.map((news, index) => (
            <Link
              to={`/blog/${news.link}`}
              key={news.id ?? index}
              className="group backdrop-blur-md bg-[rgba(40,30,30,0.4)] border border-[#5a3e3e40] transition-all rounded-xl overflow-hidden p-8 sm:py-12 duration-300 cursor-pointer"
            >
              {news.image ? (
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-44 object-cover rounded-md mb-5 hover:scale-105 transition-transform duration-300 shadow-md"
                />
              ) : (
                <div className="w-full h-44 bg-[#1a0a0a] rounded-md mb-5" />
              )}
              <h2
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Cinzel', serif", color: "#b89a6f" }}
              >
                {news.title}
              </h2>
              <p
                className="text-base leading-relaxed font-light line-clamp-3"
                style={{
                  fontFamily: "'EB Garamond', serif",
                  color: "#e0c4a2",
                }}
              >
                {news.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-12 py-20">
          <Link
            to="/blogs"
            className="text-[#e4d6c3] border border-[#b89a6f] px-6 py-3 rounded-md transition-all duration-300 hover:bg-[#b89a6f] hover:text-black font-custom"
          >
            Explore More Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

// ===================================
// AllBlogsPage Component — Strapi CMS
// ===================================
export const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      getBlogs(),
      getNewsPageData()
    ]).then(([blogsData, metadata]) => {
      setBlogs(blogsData);
      setPageData(metadata);
      setLoading(false);
    });
  }, []);

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (!a.publishDate && !b.publishDate) return 0;
    if (!a.publishDate) return 1;
    if (!b.publishDate) return -1;
    return new Date(b.publishDate) - new Date(a.publishDate);
  });

  const featuredBlog = sortedBlogs[0];
  const regularBlogs = sortedBlogs.slice(1);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden relative">
      {/* Background Texture — Strapi image if available, else local fallback */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage: `url(${pageData?.backgroundTexture || bgImage})`,
          backgroundSize: 'cover'
        }}
      />

      {/* Navigation / Header Area */}
      <div className="relative z-10 pt-28 px-6 md:px-12 lg:px-24 pb-12">
        {/* Title Section */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-4 font-melma">
            {pageData?.pageTitle || "ALL DEVELOPER BLOGS"}
          </h1>
          <p className="text-red-500 font-mono tracking-widest uppercase text-sm">
            {pageData?.subtitle || "// Official Developer Logs"}
          </p>
        </div>

        {loading && (
          <div className="py-8">
            <FeaturedBlogSkeleton />
          </div>
        )}

        {/* Featured Article Section */}
        {!loading && featuredBlog && (
          <Link to={`/blog/${featuredBlog.link}`} className="block group mb-24 relative aspect-video md:aspect-[21/9] w-full overflow-hidden rounded-sm border border-white/10">
            <div className="absolute inset-0 bg-gray-900 transition-transform duration-700 group-hover:scale-105">
              {featuredBlog.image ? (
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
              ) : (
                <div className="w-full h-full bg-[#1a0a0a]" />
              )}
            </div>

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3">
              <div className="inline-block px-3 py-1 bg-red-600 text-black text-xs font-bold uppercase tracking-wider mb-4">
                Featured Story
              </div>
              <h2 className="text-3xl md:text-6xl font-bold uppercase leading-none mb-6 font-custom group-hover:text-red-500 transition-colors duration-300">
                {featuredBlog.title}
              </h2>
              <p className="text-gray-300 font-serif text-lg md:text-xl line-clamp-3 mb-6">
                {featuredBlog.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-white font-mono uppercase">
                {featuredBlog.publishDate && <span>{new Date(featuredBlog.publishDate).toDateString()}</span>}
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                <span>Read Article &rarr;</span>
              </div>
            </div>
          </Link>
        )}

        {/* Grid Section */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularBlogs.map((news) => (
              <Link
                to={`/blog/${news.link}`}
                key={news.id}
                className="group relative bg-white/5 border border-white/5 hover:border-red-600/50 transition-colors duration-300 overflow-hidden"
              >
                {/* Image Area */}
                <div className="aspect-[4/3] overflow-hidden relative bg-[#1a0a0a]">
                  {news.image ? (
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1a0a0a]" />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Content Area */}
                <div className="p-8">
                  {news.publishDate && (
                    <div className="text-xs text-red-500 font-mono uppercase tracking-wider mb-3">
                      {new Date(news.publishDate).toLocaleDateString()}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold uppercase mb-4 leading-tight font-custom group-hover:text-red-500 transition-colors duration-300">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 font-serif line-clamp-3 leading-relaxed">
                    {news.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ===================================
// Rich Text Renderer (Strapi v5 Blocks)
// ===================================
const renderTextNode = (node, index) => {
  let text = node.text;
  if (!text) return null;
  if (node.bold) return <strong key={index}>{text}</strong>;
  if (node.italic) return <em key={index}>{text}</em>;
  if (node.underline) return <u key={index}>{text}</u>;
  if (node.code) return <code key={index} className="bg-white/10 px-1 rounded font-mono text-sm">{text}</code>;
  return <span key={index}>{text}</span>;
};

const renderBlock = (block, index) => {
  const children = block.children?.map((child, i) => {
    if (child.type === "link") {
      return (
        <a key={i} href={child.url} target="_blank" rel="noopener noreferrer" className="text-red-500 underline">
          {child.children?.map((c, j) => renderTextNode(c, j))}
        </a>
      );
    }
    return renderTextNode(child, i);
  });
  const sizeMap = { 1: "text-4xl", 2: "text-3xl", 3: "text-2xl", 4: "text-xl", 5: "text-lg", 6: "text-base" };
  switch (block.type) {
    case "paragraph":
      return <p key={index} className="text-lg leading-relaxed text-[#e0c4a2] mb-5" style={{ fontFamily: "'EB Garamond', serif" }}>{children}</p>;
    case "heading":
      const Tag = `h${block.level}`;
      return <Tag key={index} className={`${sizeMap[block.level] || "text-2xl"} font-bold text-white mb-4 mt-8 uppercase font-custom`}>{children}</Tag>;
    case "list":
      const ListTag = block.format === "ordered" ? "ol" : "ul";
      const listStyle = block.format === "ordered" ? "list-decimal" : "list-disc";
      return (
        <ListTag key={index} className={`${listStyle} pl-6 mb-5 text-[#e0c4a2] space-y-1`} style={{ fontFamily: "'EB Garamond', serif" }}>
          {block.children?.map((item, i) => (
            <li key={i} className="text-lg leading-relaxed">{item.children?.map((c, j) => renderTextNode(c, j))}</li>
          ))}
        </ListTag>
      );
    case "quote":
      return <blockquote key={index} className="border-l-4 border-red-600 pl-6 italic text-gray-400 my-6 text-lg" style={{ fontFamily: "'EB Garamond', serif" }}>{children}</blockquote>;
    case "code":
      return (
        <pre key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto my-6">
          <code className="font-mono text-sm text-[#e0c4a2]">{block.children?.map((c) => c.text).join("")}</code>
        </pre>
      );
    default:
      return null;
  }
};

const RichTextContent = ({ content }) => {
  if (typeof content === "string") return <p className="text-lg leading-relaxed text-[#e0c4a2]" style={{ fontFamily: "'EB Garamond', serif" }}>{content}</p>;
  if (Array.isArray(content)) return <>{content.map((block, i) => renderBlock(block, i))}</>;
  return null;
};

// ===================================
// BlogPostPage Component — Strapi CMS
// ===================================
export const BlogPostPage = () => {
  const { link } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogBySlug(link).then((data) => {
      setBlogPost(data);
      setLoading(false);
    });
  }, [link]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden px-6 md:px-12 lg:px-24 pt-28">
        <PageSkeleton rows={8} />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="w-full bg-cover bg-fixed text-[#d1c7b7] py-20 text-center"
        style={{ backgroundImage: `url(${bgImage})` }}>
        <h1 className="text-4xl font-bold text-[#b89a6f]" style={{ fontFamily: "'Cinzel', serif" }}>
          Blog Post Not Found
        </h1>
        <Link to="/blogs" className="text-red-500 mt-4 inline-block font-custom">
          Go back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-cover bg-fixed text-[#d1c7b7] py-60"
      style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-[#f4e1c1] font-melma">
          {blogPost.title}
        </h1>
        {blogPost.publishDate && (
          <div className="text-sm text-gray-500 mb-8">
            Published on: {new Date(blogPost.publishDate).toDateString()}
          </div>
        )}
        {blogPost.image && (
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-80 object-cover rounded-lg mb-8 shadow-md"
          />
        )}
        <RichTextContent content={blogPost.fullDescription} />
        <Link to="/blogs" className="mt-12 inline-block text-[#e4d6c3] hover:underline font-custom">
          ← Back to all blogs
        </Link>
      </div>
    </div>
  );
};