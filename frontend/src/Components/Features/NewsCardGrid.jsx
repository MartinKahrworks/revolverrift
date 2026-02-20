import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

// Your image imports
import img1 from "../../assets/newassets/colt 19111.png";

import img2 from "../../assets/newassets/trench_gun_3.webp";
import img3 from "../../assets/newassets/p08 2.png";
import img4 from "../../assets/newassets/Mosin_Nagant_3.webp";
import bgImage from '../../assets/Texturelabs_Grunge_353M.webp';

// ===================================
// News Data (Modified)
// ===================================
export const NewsData = [
  {
    id: "the-art-of-building-immersion",
    title: "The Art of Building Immersion",
    icon: <FaCameraRetro className="text-4xl text-accent duration-300" />,
    image: img1,
    description:
      "Creating a truly immersive experience isn’t just about visuals it’s about the small details that pull players into another world.",
    fullDescription:
      "Creating a truly immersive experience isn’t just about visuals it’s about the small details that pull players into another world. From ambient sounds to the way light filters through a room, these subtle touches invite players to feel like they’re not just playing a game, but living in it. We focus on atmosphere over perfection, knowing that mood and engagement are what matter most. Every corner tells a story, and even the smallest detail can change how players experience the world we create.",
    date: "2025-08-26",
    delay: "300",
  },
  {
    id: "the-power-of-uncertainty",
    title: "The Power of Uncertainty: Creating Suspense",
    icon: <GiNotebook className="text-4xl text-accent duration-300" />,
    image: img2,
    description:
      "Suspense is the art of leaving players uncertain about what comes next. It’s not just the big moments that make players tense it’s the quiet ones too.",
    fullDescription:
      "Suspense is the art of leaving players uncertain about what comes next. It’s not just the big moments that make players tense it’s the quiet ones too. The moments of silence, slow pacing, and what players don’t see, often have the greatest impact. Creating suspense means building tension without giving too much away, keeping players on edge and making every twist feel unexpected. It’s about playing with their minds as much as the gameplay itself.",
    date: "2025-08-20",
    delay: "400",
  },
  {
    id: "the-invisible-work",
    title: "The Invisible Work: Making the Game Feel Real",
    icon: <SlNote className="text-4xl text-accent duration-300" />,
    image: img3,
    description:
      "Some of the most important work in game design is invisible. It’s the subtle things.",
    fullDescription:
      "Some of the most important work in game design is invisible. It’s the subtle animations, ambient sounds, and interaction feedback that make the world feel real. Whether it’s a hand movement or the soft rustle of leaves, these small details are what create a living, breathing world. The goal is to make every interaction feel natural, and that’s the invisible work that truly brings the game to life.",
    date: "2025-08-15",
    delay: "500",
  },
  {
    id: "the-future-of-gaming",
    title: "The Future of Gaming",
    icon: <GiNotebook className="text-4xl text-accent duration-300" />,
    image: img4,
    description:
      "Exploring upcoming trends and technologies that will shape the gaming industry.",
    fullDescription:
      "The gaming industry is constantly evolving, with new technologies like cloud gaming, AI-driven NPCs, and haptic feedback revolutionizing the player experience. We're looking at how these innovations will create more personalized and dynamic worlds. The future is not just about better graphics it’s about more intelligent and responsive game worlds that adapt to every player.",
    date: "2025-08-01",
    delay: "600",
  },
];

// ===================================
// NewsCardGrid Component
// ===================================
export const NewsCardGrid = () => {
  const displayedBlogs = NewsData.slice(0, 3);

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
          {displayedBlogs.map((news) => (
            <Link
              to={`/blog/${news.id}`}
              key={news.id}
              // data-aos="fade-up"
              data-aos-delay={news.delay}
              className="group backdrop-blur-md bg-[rgba(40,30,30,0.4)] border border-[#5a3e3e40] transition-all rounded-xl overflow-hidden p-8 sm:py-12 duration-300 cursor-pointer"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-44 object-cover rounded-md mb-5 hover:scale-105 transition-transform duration-300 shadow-md"
              />
              {/* <div className="flex justify-center mb-3">{news.icon}</div> */}
              <h2
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Cinzel', serif", color: "#b89a6f" }}
              >
                {news.title}
              </h2>
              <p
                className="text-base leading-relaxed font-light"
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
            See All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

// ===================================
// AllBlogsPage Component (Enhanced)
// ===================================
export const AllBlogsPage = () => {
  const navigate = useNavigate();
  const sortedBlogs = [...NewsData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Verify we have blogs
  const featuredBlog = sortedBlogs[0];
  const regularBlogs = sortedBlogs.slice(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden relative">
      {/* Background Texture */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none z-0"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
      />

      {/* Navigation / Header Area */}
      <div className="relative z-10 pt-28 px-6 md:px-12 lg:px-24 pb-12">
        {/* Back Button - Styled */}


        {/* Title Section */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-4 font-custom">
            ALL DEVELOPER BLOGS
          </h1>
          <p className="text-red-500 font-mono tracking-widest uppercase text-sm">
               // Official Developer Logs
          </p>
        </div>

        {/* Featured Article Section */}
        {featuredBlog && (
          <Link to={`/blog/${featuredBlog.id}`} className="block group mb-24 relative aspect-video md:aspect-[21/9] w-full overflow-hidden rounded-sm border border-white/10">
            <div className="absolute inset-0 bg-gray-900 transition-transform duration-700 group-hover:scale-105">
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
              />
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
                <span>{new Date(featuredBlog.date).toDateString()}</span>
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                <span>Read Article &rarr;</span>
              </div>
            </div>
          </Link>
        )}

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularBlogs.map((news) => (
            <Link
              to={`/blog/${news.id}`}
              key={news.id}
              className="group relative bg-white/5 border border-white/5 hover:border-red-600/50 transition-colors duration-300 overflow-hidden"
            >
              {/* Image Area */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Content Area */}
              <div className="p-8">
                <div className="text-xs text-red-500 font-mono uppercase tracking-wider mb-3">
                  {new Date(news.date).toLocaleDateString()}
                </div>
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
      </div>
    </div>
  );
};

// ===================================
// BlogPostPage Component
// ===================================
export const BlogPostPage = () => {
  const { blogId } = useParams();
  const blogPost = NewsData.find((blog) => blog.id === blogId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blogPost) {
    return (
      <div className="w-full bg-cover bg-fixed text-[#d1c7b7] py-20 text-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1
          className="text-4xl font-bold text-[#b89a6f]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Blog Post Not Found
        </h1>
        <Link to="/blogs" className="text-blue-500 mt-4 inline-block font-custom">
          Go back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full  bg-cover bg-fixed text-[#d1c7b7] py-60 "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-5xl font-bold mb-6 text-[#f4e1c1]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {blogPost.title}
        </h1>
        <div className="text-sm text-gray-500 mb-8">
          Published on: {new Date(blogPost.date).toDateString()}
        </div>
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="w-full h-80 object-cover rounded-lg mb-8 shadow-md"
        />
        <p
          className="text-lg leading-relaxed font-light text-[#e0c4a2]"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          {blogPost.fullDescription}
        </p>
        <Link
          to="/blogs"
          className="mt-12 inline-block text-[#e4d6c3] hover:underline font-custom"
        >
          ← Back to all blogs
        </Link>
      </div>
    </div>
  );
};