import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/IMG_0983.png";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { FaTwitter, FaDribbble, FaInstagram, FaPinterest, FaSearch, FaShoppingCart, FaTh, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./cutting-animation.css";

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
  const { cartCount } = useCart();
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

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
      <header className={`fixed top-0 w-full z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"} bg-gray-950 ${isScrolled ? "shadow-lg" : ""}`}>

        {/* ─────────────────────────────────────────────────────────────
            TOP BAR (USA ... PRIVACY CONTACT | Social Icons)
        ────────────────────────────────────────────────────────────── */}
        <div className={`w-full border-b border-white/10 transition-all duration-300 ${isScrolled ? "py-0.5" : "py-1"}`}>
          <div className="container mx-auto px-4 md:px-12 flex justify-end items-center text-[9px] md:text-[10px] tracking-[0.2em] font-vintage text-white/70">
            {/* Right: Social Icons — hidden on very small screens */}
            <div className="hidden xs:flex items-center gap-3 md:gap-5">
              <a href="#" className="hover:text-white transition-colors"><FaTwitter size={10} /></a>
              <a href="#" className="hover:text-white transition-colors"><FaDribbble size={10} /></a>
              <a href="#" className="hover:text-white transition-colors"><FaInstagram size={10} /></a>
              <a href="#" className="hover:text-white transition-colors"><FaPinterest size={10} /></a>
            </div>
          </div>
        </div>


        {/* ─────────────────────────────────────────────────────────────
            MAIN NAVBAR (Logo | Links | Action Icons)
        ────────────────────────────────────────────────────────────── */}
        <div className={`w-full transition-all duration-300 ${isScrolled ? "py-2 md:py-2.5" : "py-2.5 md:py-4"}`}>
          <div className="container mx-auto px-4 md:px-12 flex justify-between items-center relative">

            {/* 1. LOGO (Left) */}
            <Link to="/" className="flex-shrink-0 z-20 group">
              <img
                src={logo}
                alt="Godlike Logo"
                className={`w-auto object-contain transition-all duration-300 ${isScrolled ? "h-6 md:h-8" : "h-7 md:h-10"} opacity-90 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]`}
              />
            </Link>


            {/* 2. NAVIGATION LINKS (Center - Standard Layout) */}
            {/* Hidden on mobile, flex on desktop */}
            <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
              <ul className="flex items-center gap-8 xl:gap-10">
                {NavLinks.map(({ id, name, link }) => (
                  <li key={id} className="relative group">
                    <Link
                      to={link}
                      onClick={() => handleLinkClick(link)}
                      className={`relative block text-[11px] font-bold tracking-[0.12em] py-1.5 transition-colors duration-300 font-vintage ${activeLink === link ? "text-[#ffb700]" : "text-white/85 hover:text-white"}`}
                    >
                      <span className={`cut-text ${activeLink === link ? "active" : ""}`} data-text={name}>
                        {name}
                        <span className="cut-line"></span>
                      </span>
                      {/* Active Dot */}
                      {activeLink === link && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ffb700] rounded-full shadow-[0_0_5px_#ffb700]"></span>
                      )}

                      {/* Hover Ellipsis or underline effect */}
                      <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-white/40 tracking-widest opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-bottom-3`}>
                        ...
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>


            {/* 3. RIGHT ICONS (Search, Cart, Login, Menu) */}
            <div className="hidden md:flex items-center gap-5 text-white/70">
              <button aria-label="Search" className="hover:text-[#ffb700] hover:scale-110 transition-all duration-300"><FaSearch size={13} /></button>
              <Link to="/cart" aria-label="Cart" className="hover:text-[#ffb700] hover:scale-110 transition-all duration-300 relative">
                <FaShoppingCart size={13} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
              {/* Login removed - no auth system implemented yet */}

              {/* Menu Grid Icon (Desktop) - can trigger sidebar or just be decorative */}
              <button onClick={toggleMenu} aria-label="More" className="hover:text-[#ffb700] hover:scale-110 transition-all duration-300">
                <FaTh size={13} />
              </button>
            </div>


            {/* 📱 Mobile Menu Toggle (Right) */}
            <div className="lg:hidden flex items-center z-50">
              <button onClick={toggleMenu} className="text-white hover:text-[#ffb700] transition-colors p-1">
                {showMenu ? <HiMenuAlt1 size={22} /> : <HiMenuAlt3 size={22} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 📱 Mobile Dropdown Menu (Overlay) */}
      <div
        className={`fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center transition-all duration-500 backdrop-blur-sm ${showMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col items-center gap-6 w-full px-8">
          {NavLinks.map(({ id, name, link }) => (
            <Link
              key={id}
              to={link}
              onClick={() => handleLinkClick(link)}
              className={`text-xl uppercase font-bold tracking-widest transition-all duration-300 font-vintage border-b border-white/5 w-full text-center pb-4 ${activeLink === link ? "text-[#ffb700]" : "text-white/70 hover:text-white"}`}
            >
              {name}
            </Link>
          ))}

          <div className="w-12 h-[1px] bg-white/20 my-2"></div>

          <div className="flex gap-8 text-white/50">
            <a href="#"><FaTwitter size={18} className="hover:text-white transition-colors" /></a>
            <a href="#"><FaInstagram size={18} className="hover:text-white transition-colors" /></a>
            <a href="#"><FaDribbble size={18} className="hover:text-white transition-colors" /></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;