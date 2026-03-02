import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { getFooterData, FALLBACK_FOOTER_DATA } from '../../api/footerApi';
import bgImage from '../../assets/shot2.webp'; // Replacing grunge with premium shot2
import { FaDiscord, FaRedditAlien, FaYoutube, FaTwitter, FaFacebookF, FaInstagram, FaEnvelope, FaFileContract } from 'react-icons/fa';

// Map labels to icons for a premium look
const getIconForLabel = (label) => {
  switch (label.toUpperCase()) {
    case 'DISCORD': return <FaDiscord />;
    case 'REDDIT': return <FaRedditAlien />;
    case 'YOUTUBE': return <FaYoutube />;
    case 'TWITTER': return <FaTwitter />;
    case 'FACEBOOK': return <FaFacebookF />;
    case 'INSTAGRAM': return <FaInstagram />;
    case 'MAIL': return <FaEnvelope />;
    case 'IMPRINT': return <FaFileContract />;
    default: return <FaDiscord />; // Fallback
  }
};

const SocialLink = ({ href, label, onClick }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(500px) rotateY(${x / 30}deg) rotateX(${-y / 30}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el)
      el.style.transform = 'perspective(500px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href}
      target={onClick ? undefined : "_blank"}
      rel={onClick ? undefined : "noopener noreferrer"}
      className="group relative flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ transition: 'transform 0.2s ease-out, background 0.3s' }}
    >
      <div className="text-3xl sm:text-4xl text-gray-500 group-hover:text-red-500 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(255,51,51,0.5)]">
        {getIconForLabel(label)}
      </div>
      <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] font-bold text-gray-400 group-hover:text-white transition-colors duration-300">
        {label === 'MAIL' ? 'CONTACT' : label}
      </span>
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 rounded-2xl pointer-events-none transition-colors duration-300" />
    </a>
  );
};

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [footerData, setFooterData] = useState(FALLBACK_FOOTER_DATA);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFooterData();
      setFooterData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="relative overflow-hidden">

      {/* Top angled divider -> Made sleeker */}
      <svg
        className="absolute top-0 left-0 w-full h-8 sm:h-12 text-[#050505] z-20"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <polygon fill="currentColor" points="0,100 100,0 100,100" />
      </svg>

      <footer className="relative z-10 bg-[#050505] text-white pt-20 sm:pt-32 pb-8">

        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src={bgImage} alt="Footer Background" className="w-full h-full object-cover opacity-[0.03] object-top grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-[#050505]" />
          <div className="absolute -bottom-[20vw] left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] bg-red-600/5 rounded-full blur-[150px] mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20">

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-8 items-center border-b border-white/10 pb-16">

            {/* Left Header */}
            <div className="xl:col-span-5 flex flex-col items-center xl:items-start text-center xl:text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-8 sm:w-12 bg-red-600" />
                <span className="font-mono text-red-500 text-[10px] sm:text-xs tracking-[0.3em] uppercase">Comms Link</span>
                <div className="h-[1px] w-8 sm:w-12 bg-red-600 xl:hidden" />
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-widest font-custom text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] whitespace-pre-wrap">
                {footerData.connectHeading}
              </h2>
              <p className="mt-6 font-mono text-gray-400 text-xs sm:text-sm tracking-[0.15em] uppercase max-w-md line-clamp-2">
                    // Join the resistance. Stay updated on the latest drops, intel, and communiques.
              </p>
            </div>

            {/* Right Icons Grid */}
            <div className="xl:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 max-w-4xl ml-auto">
                {footerData.socialLinks.map((s, i) => (
                  <SocialLink
                    key={i}
                    href={s.href}
                    label={s.label}
                    onClick={s.isImprintModal ? () => setShowModal(true) : undefined}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col items-center gap-8">

            {/* Partner Logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 opacity-40 hover:opacity-80 transition-opacity duration-500">
              {footerData.bottomLogos.map((src, i) => (
                <a key={i} href="#" className="h-8 sm:h-10 md:h-12 flex items-center justify-center filter grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300">
                  <img
                    src={src}
                    alt={`Partner Logo ${i + 1}`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center font-mono text-[9px] sm:text-[10px] text-gray-500 tracking-[0.25em] uppercase">
              <a
                href={footerData.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                {footerData.copyrightText}
              </a>
            </div>

          </div>
        </div>
      </footer>

      {/* Imprint Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4" onClick={() => setShowModal(false)}>
          <div
            className="bg-[#111111] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] p-8 sm:p-10 w-full max-w-lg mb-20 animate-fade-in relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] pointer-events-none" />

            <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-red-500 tracking-[0.2em] mb-1 block">// LEGAL</span>
                <h3 className="font-custom text-2xl sm:text-3xl tracking-widest text-white uppercase">Company Imprint</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-white hover:rotate-90 transition-all duration-300 transform"
              >
                <div className="text-3xl">&times;</div>
              </button>
            </div>
            <div className="font-mono text-xs sm:text-sm text-gray-400 space-y-4 tracking-wider">
              <div>
                <strong className="text-white tracking-[0.1em]">KahrWorks GmbH</strong>
                <p className="mt-1">Bobletten 23, 6850 Dornbirn, Austria</p>
              </div>
              <div>
                <span className="text-gray-500">Website: </span>
                <a href="https://www.kahrworks.at" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors">www.kahrworks.at</a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-2">
                <div>
                  <span className="text-gray-500 block text-[10px] mb-1">USt-IdNr.:</span>
                  <span className="text-white">AT U75459914</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] mb-1">Registernummer:</span>
                  <span className="text-white">FN531874v</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-500 block text-[10px] mb-1">Registergericht:</span>
                  <span className="text-white">Landesgericht Feldkirch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;