// src/Components/Blog/index.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getBlogBySlug } from "../../api/blogApi";
import { PageSkeleton } from "../Skeleton/Skeleton";

// ─── Strapi Rich Text (Blocks) Renderer ───────────────────────────────────────
// Strapi's "Rich Text (Blocks)" field returns a JSON array of block objects,
// NOT a plain string. This renderer converts that structure into React elements.

const renderTextNode = (node, index) => {
  let text = node.text;
  if (!text) return null;

  if (node.bold) text = <strong key={index}>{text}</strong>;
  else if (node.italic) text = <em key={index}>{text}</em>;
  else if (node.underline) text = <u key={index}>{text}</u>;
  else if (node.code) text = <code key={index} className="bg-white/10 px-1 rounded font-mono text-sm">{text}</code>;
  else text = <span key={index}>{text}</span>;

  return text;
};

const renderBlock = (block, index) => {
  const children = block.children?.map((child, i) => {
    if (child.type === "link") {
      return (
        <a key={i} href={child.url} target="_blank" rel="noopener noreferrer" className="text-[#b89a6f] underline">
          {child.children?.map((c, j) => renderTextNode(c, j))}
        </a>
      );
    }
    return renderTextNode(child, i);
  });

  switch (block.type) {
    case "paragraph":
      return (
        <p key={index} className="text-lg leading-relaxed text-[#d1c7b7] mb-5"
          style={{ fontFamily: "'EB Garamond', serif" }}>
          {children}
        </p>
      );
    case "heading":
      const Tag = `h${block.level}`;
      const sizeMap = { 1: "text-4xl", 2: "text-3xl", 3: "text-2xl", 4: "text-xl", 5: "text-lg", 6: "text-base" };
      return (
        <Tag key={index} className={`${sizeMap[block.level] || "text-2xl"} font-bold text-[#b89a6f] mb-4 mt-8`}
          style={{ fontFamily: "'Cinzel', serif" }}>
          {children}
        </Tag>
      );
    case "list":
      const ListTag = block.format === "ordered" ? "ol" : "ul";
      const listStyle = block.format === "ordered" ? "list-decimal" : "list-disc";
      return (
        <ListTag key={index} className={`${listStyle} pl-6 mb-5 text-[#d1c7b7] space-y-1`}
          style={{ fontFamily: "'EB Garamond', serif" }}>
          {block.children?.map((item, i) => (
            <li key={i} className="text-lg leading-relaxed">
              {item.children?.map((c, j) => renderTextNode(c, j))}
            </li>
          ))}
        </ListTag>
      );
    case "quote":
      return (
        <blockquote key={index} className="border-l-4 border-[#b89a6f] pl-6 italic text-[#e0c4a2] my-6 text-lg"
          style={{ fontFamily: "'EB Garamond', serif" }}>
          {children}
        </blockquote>
      );
    case "code":
      return (
        <pre key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto my-6">
          <code className="font-mono text-sm text-[#e0c4a2]">
            {block.children?.map((c) => c.text).join("")}
          </code>
        </pre>
      );
    case "image":
      return (
        <img key={index} src={block.image?.url} alt={block.image?.alternativeText || ""}
          className="w-full rounded-lg my-6 shadow-lg" />
      );
    default:
      return null;
  }
};

const RichTextRenderer = ({ content }) => {
  // If content is a plain string (fallback), just render it as a paragraph
  if (typeof content === "string") {
    return (
      <p className="text-lg leading-relaxed text-[#d1c7b7]"
        style={{ fontFamily: "'EB Garamond', serif" }}>
        {content}
      </p>
    );
  }
  // If it's the Strapi blocks array, render each block
  if (Array.isArray(content)) {
    return <>{content.map((block, i) => renderBlock(block, i))}</>;
  }
  return null;
};

// ─── BlogDetail Component ──────────────────────────────────────────────────────
const BlogDetail = () => {
  const { link } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogBySlug(link).then((data) => {
      setBlog(data);
      setLoading(false);
    });
  }, [link]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] px-6 sm:px-16 pt-28">
        <PageSkeleton rows={10} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <h2 className="text-[#b89a6f] text-3xl" style={{ fontFamily: "'Cinzel', serif" }}>
          Blog not found
        </h2>
        <Link to="/blogs" className="text-[#e0c4a2] underline">← Back to all blogs</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative w-full min-h-[50vh] sm:h-[80vh]">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-[#1a1010]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-end justify-start px-6 sm:px-16 pb-12">
          <div className="max-w-3xl">
            <Link to="/blogs" className="text-[#b89a6f] text-sm mb-4 inline-block hover:underline"
              style={{ fontFamily: "'EB Garamond', serif" }}>
              ← Back to blogs
            </Link>
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
        <RichTextRenderer content={blog.fullDescription} />
      </div>
    </div>
  );
};

export default BlogDetail;
