// src/Pages/BlogList.js
import { Link } from "react-router-dom";
import { NewsData } from "../../constant/blog";

const BlogList = () => {
  return (
    <div className="w-full bg-black text-[#d1c7b7] pt-4 pb-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex justify-center items-center mb-12 mt-0">
          <h1
            className="text-4xl font-bold text-[#b89a6f]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Developer Blogs
          </h1>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-14">
          {NewsData.map((news, index) => (
            <Link key={index} to={`/blog/${news.link}`}>
              <div
                data-aos="fade-up"
                data-aos-delay={news.delay}
                className="group backdrop-blur-md bg-[rgba(40,30,30,0.4)] border border-[#5a3e3e40] transition-all rounded-xl overflow-hidden p-8 sm:py-12 duration-300 cursor-pointer"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-44 object-cover rounded-md mb-5 hover:scale-105 transition-transform duration-300 shadow-md"
                />
                <div className="flex justify-center mb-3">{news.icon}</div>
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
