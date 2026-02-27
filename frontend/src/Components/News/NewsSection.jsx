import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../../api/blogApi";

export const FALLBACK_NEWS = [
    {
        id: "the-art-of-building-immersion",
        title: "The Art of Building Immersion",
        image: null,
        description: "Creating a truly immersive experience isn’t just about visuals—it’s about the small details that pull players into another world.",
        link: "the-art-of-building-immersion",
        category: "FEATURE ANALYSIS",
    },
    {
        id: "the-power-of-uncertainty",
        title: "The Power of Uncertainty: Creating Suspense",
        image: null,
        description: "Suspense is the art of leaving players uncertain about what comes next. It’s not just the big moments that make players tense it’s the quiet ones too.",
        link: "the-power-of-uncertainty",
        category: "LORE DEEP DIVE",
    },
    {
        id: "the-invisible-work",
        title: "The Invisible Work: Making the Game Feel Real",
        image: null,
        description: "Some of the most important work in game design is invisible. It’s the subtle things.",
        link: "the-invisible-work",
        category: "DEVELOPMENT LOG",
    }
];

const NewsSection = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetching from the blog CMS for now so the UI is populated and infinite.
        // Later, this can be swapped to fetch(`${STRAPI_URL}/api/news-items`) if a separate CMS is created.
        getBlogs().then((data) => {
            if (data && data.length > 0) {
                setBlogs(data);
            } else {
                setBlogs(FALLBACK_NEWS);
            }
        }).catch(() => {
            setBlogs(FALLBACK_NEWS);
        });
    }, []);

    return (
        <div className="w-full bg-[#050505] text-[#d1c7b7] py-24 relative overflow-hidden">
            {/* Subtle background texture/gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0707] to-black opacity-80 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col items-center justify-center mb-16 text-center space-y-4">
                    <h1
                        className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-[#e4d6c3] uppercase tracking-wider font-custom"
                        style={{ textShadow: "0 4px 24px rgba(0,0,0,0.8)" }}
                    >
                        Developer Blogs
                    </h1>
                    <p className="text-red-600 font-mono tracking-[0.3em] uppercase text-sm md:text-base">
                        // Official Developer Logs
                    </p>
                </div>

                {/* Dynamic Grid Layout that accommodates infinite cards */}
                <div className={`grid gap-6 ${blogs.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : blogs.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                    {blogs.map((news) => (
                        <Link
                            to={`/blog/${news.link}`}
                            key={news.id}
                            className="group relative flex flex-col min-h-[450px] overflow-hidden rounded-sm border border-white/5 bg-[#0a0a0a] transition-all duration-500 hover:border-red-900/40"
                        >
                            {/* Image Background (Top Half) */}
                            <div className="absolute inset-0 h-[60%] w-full overflow-hidden bg-[#111]">
                                {news.image ? (
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-[#1a1111]" />
                                )}
                                {/* Gradient to smooth transition from image to solid black bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                            </div>

                            {/* Content Overlay (Bottom Half) */}
                            <div className="relative mt-auto flex flex-col p-8 pt-32">

                                {/* Category Tag */}
                                <span className="mb-4 inline-block self-start bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                                    {news.category || "DEVELOPMENT LOG"}
                                </span>

                                {/* Title */}
                                <h2
                                    className="mb-4 text-2xl md:text-3xl font-bold uppercase leading-tight text-white transition-colors duration-300 group-hover:text-red-500"
                                    style={{ fontFamily: "'Cinzel', serif" }}
                                >
                                    {news.title}
                                </h2>

                                {/* Description */}
                                <p
                                    className="font-serif text-base leading-relaxed text-gray-400 line-clamp-3"
                                    style={{ fontFamily: "'EB Garamond', serif" }}
                                >
                                    {news.description}
                                </p>

                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-16 flex justify-center">
                    <Link
                        to="/blogs"
                        className="group relative inline-flex items-center justify-center border border-white/20 bg-transparent px-8 py-4 font-mono text-sm tracking-widest text-white uppercase transition-all duration-300 hover:border-red-600 hover:bg-red-600/10"
                    >
                        <span>Explore More Blogs</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NewsSection;
