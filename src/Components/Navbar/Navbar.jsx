import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/IMG_0983.png";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { FaTwitter, FaDribbble, FaInstagram, FaPinterest, FaSearch, FaShoppingCart, FaSignInAlt, FaTh } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "News", link: "/news" },
  { id: 3, name: "Credits", link: "/credits" },
  { id: 4, name: "Showcase", link: "/showcase" },
  { id: 5, name: "Content", link: "/content" },
  { id: 6, name: "Partners", link: "/partners" },
  { id: 7, name: "Shop", link: "/shop" },
  { id: 8, name: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  // Split links for desktop view: 4 on left, 4 on right
  const leftLinks = NavLinks.slice(0, 4);
  const rightLinks = NavLinks.slice(4);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
    document.body.style.overflow = showMenu ? "auto" : "hidden";
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setShowMenu(false);
    document.body.style.overflow = "auto";
  };

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Logic to hide/show navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false); // Scrolling down & past threshold
      } else {
        setIsVisible(true); // Scrolling up
      }

      lastScrollY.current = currentScrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full z-50 text-white font-vintage transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
        {/* ⚔️ Main Navbar */}
        <div
          className={`w-full transition-all duration-300 ${isScrolled ? "bg-black/95 py-2 shadow-lg" : "bg-gradient-to-b from-black/80 to-transparent py-3 md:py-4"
            }`}
        >
          <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative">

            {/* 📱 Mobile Menu Button (Left) */}
            <div className="md:hidden flex items-center z-50">
              <button onClick={toggleMenu} aria-label="Menu Toggle" className="text-white relative z-50">
                {showMenu ? <HiMenuAlt1 size={24} /> : <HiMenuAlt3 size={24} />}
              </button>
            </div>

            {/* 🖥 Left Links */}
            <ul className={`hidden md:flex items-center gap-8 lg:gap-10 flex-1 justify-end pr-8 transition-opacity duration-300 ${isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
              {leftLinks.map(({ id, name, link }) => (
                <li key={id}>
                  <Link
                    to={link}
                    onClick={() => handleLinkClick(link)}
                    className={`uppercase tracking-wider text-xs lg:text-sm font-bold transition-all duration-300 relative group block py-2 px-1 overflow-visible ${activeLink === link ? "text-transparent" : "text-gray-200 hover:text-transparent"}`}
                  >
                    <span className="relative z-10">{name}</span>

                    {/* Split Text Top */}
                    <span
                      className={`absolute top-0 left-0 w-full h-full text-yellow-500 overflow-hidden transition-all duration-300 z-20 flex items-center justify-center ${activeLink === link ? "-translate-x-0.5 -translate-y-[1px] opacity-100" : "opacity-0 group-hover:opacity-100 group-hover:-translate-x-0.5 group-hover:-translate-y-[1px]"
                        }`}
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
                    >
                      {name}
                    </span>

                    {/* Split Text Bottom */}
                    <span
                      className={`absolute top-0 left-0 w-full h-full text-yellow-500 overflow-hidden transition-all duration-300 z-20 flex items-center justify-center ${activeLink === link ? "translate-x-0.5 translate-y-[1px] opacity-100" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:translate-y-[1px]"
                        }`}
                      style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
                    >
                      {name}
                    </span>

                    {/* Cut Line */}
                    <span
                      className={`absolute top-1/2 left-[-10%] w-[120%] h-[2px] bg-white transform -translate-y-1/2 -rotate-2 shadow-[0_0_10px_rgba(220,38,38,0.8)] transition-transform duration-200 origin-center z-30 ${activeLink === link ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    ></span>

                    {/* Sparkles/Debris (Optional subtle particle effect) */}
                    <span className={`absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_5px_#fff] opacity-0 transition-all duration-500 ${activeLink === link ? "animate-ping opacity-100" : "group-hover:animate-ping group-hover:opacity-100"}`}></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* 🔰 Center Logo */}
            <Link to="/" className="flex-shrink-0 mx-4 md:mx-0 z-10 transform hover:scale-105 transition-transform duration-500">
              <img
                src={logo}
                alt="Godlike Logo"
                className={`w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] ${isScrolled ? "h-10 md:h-14" : "h-14 md:h-20"
                  }`}
              />
            </Link>

            {/* 🖥 Right Links */}
            <div className={`hidden md:flex items-center gap-8 lg:gap-10 flex-1 justify-start pl-8 transition-opacity duration-300 ${isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
              <ul className="flex items-center gap-8 lg:gap-10">
                {rightLinks.map(({ id, name, link }) => (
                  <li key={id}>
                    <Link
                      to={link}
                      onClick={() => handleLinkClick(link)}
                      className={`uppercase tracking-wider text-xs lg:text-sm font-bold transition-all duration-300 relative group block py-2 px-1 overflow-visible ${activeLink === link ? "text-transparent" : "text-gray-200 hover:text-transparent"}`}
                    >
                      <span className="relative z-10">{name}</span>

                      {/* Split Text Top */}
                      <span
                        className={`absolute top-0 left-0 w-full h-full text-yellow-500 overflow-hidden transition-all duration-300 z-20 flex items-center justify-center ${activeLink === link ? "-translate-x-0.5 -translate-y-[1px] opacity-100" : "opacity-0 group-hover:opacity-100 group-hover:-translate-x-0.5 group-hover:-translate-y-[1px]"
                          }`}
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
                      >
                        {name}
                      </span>

                      {/* Split Text Bottom */}
                      <span
                        className={`absolute top-0 left-0 w-full h-full text-yellow-500 overflow-hidden transition-all duration-300 z-20 flex items-center justify-center ${activeLink === link ? "translate-x-0.5 translate-y-[1px] opacity-100" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:translate-y-[1px]"
                          }`}
                        style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
                      >
                        {name}
                      </span>

                      {/* Cut Line */}
                      <span
                        className={`absolute top-1/2 left-[-10%] w-[120%] h-[2px] bg-white transform -translate-y-1/2 -rotate-2 shadow-[0_0_10px_rgba(220,38,38,0.8)] transition-transform duration-200 origin-center z-30 ${activeLink === link ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                      ></span>

                      {/* Sparkles/Debris (Optional subtle particle effect) */}
                      <span className={`absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_5px_#fff] opacity-0 transition-all duration-500 ${activeLink === link ? "animate-ping opacity-100" : "group-hover:animate-ping group-hover:opacity-100"}`}></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 📱 Mobile Spacer (Right) to balance Flex logo */}
            <div className="md:hidden w-7"></div>
          </div>
        </div>
      </header>

      {/* 📱 Mobile Dropdown Menu (Overlay) - Moved outside header to avoid transform issues */}
      <div
        className={`fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center transition-all duration-500 ${showMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center gap-8">
          {NavLinks.map(({ id, name, link }) => (
            <Link
              key={id}
              to={link}
              onClick={() => handleLinkClick(link)}
              className={`text-2xl uppercase font-bold tracking-widest transition-all duration-300 hover:text-yellow-500 ${activeLink === link ? "text-yellow-500 scale-110" : "text-white/70"
                }`}
            >
              {name}
            </Link>
          ))}
          <div className="flex gap-6 mt-8 text-white/50">
            <FaTwitter size={24} />
            <FaInstagram size={24} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
