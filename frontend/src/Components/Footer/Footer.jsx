import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import logo1 from "../../assets/logo/Logo1.png";
import logo2 from "../../assets/logo/Logo2.png";
import logo3 from "../../assets/logo/Logo3.png";
import logo4 from "../../assets/logo/Logo4.png";
import bgImage from '../../assets/Texturelabs_Grunge_353M.webp';

const SocialLink = ({ href, imgSrc, label, onClick }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(500px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el)
      el.style.transform =
        'perspective(500px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
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
      className="flex flex-col items-center gap-3.5 p-4"
      ref={ref}
      
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ transition: 'transform 0.3s ease-out' }
      
    }
      
    >
      <img style={{ height: '50px' }} src={imgSrc} alt={label} />
      <span style={{ fontSize: '20px', color: 'white' }}>{label}</span>
    </a>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();
  const [showModal, setShowModal] = useState(false);

  const socialLinks = [
    {
      href: 'https://discord.com/invite/QP6RmdUSA8',
      label: 'DISCORD',
      img: 'https://cdn-icons-png.flaticon.com/512/5968/5968756.png',
    },
    {
      href: 'https://reddit.com/RevolverRift',
      label: 'REDDIT',
      img: 'https://cdn-icons-png.flaticon.com/512/2111/2111589.png',
    },
    {
      href: 'https://www.youtube.com/@revolverrift',
      label: 'YOUTUBE',
      img: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png',
    },
    {
      href: 'https://x.com/RevolverRift',
      label: 'TWITTER',
      img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png',
    },
    {
      href: 'https://facebook.com/revolverrift',
      label: 'FACEBOOK',
      img: 'https://cdn-icons-png.flaticon.com/512/733/733547.png',
    },
    {
      href: 'https://www.instagram.com/revolverrift/',
      label: 'INSTAGRAM',
      img: 'https://cdn-icons-png.flaticon.com/512/1384/1384063.png',
    },
    {
      href: 'mailto:info@revolver-rift.com',
      label: 'MAIL',
      img: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
    },
    {
      href: '#',
      label: 'IMPRINT',
      img: 'https://cdn-icons-png.flaticon.com/512/2965/2965358.png', // Info/document icon
      onClick: () => setShowModal(true),
    },
  ];

  return (
    <div
    // style={{ backgroundImage: `url(${bgImage})` }}
    className="relative">
      {/* Top angled divider */}
      <svg
        className="absolute top-0 left-0 w-full h-12 text-black"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        
      >
        <polygon fill="currentColor" points="0,100 100,0 100,100" />
      </svg>

      <footer className=" text-white relative z-10 bg-cover bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="container mx-auto p-8 md:p-16 lg:p-20"
        // style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-none font-custom lg:col-span-1 text-[#e4d6c3]">
                Connect
                <br />
                With Us
              </h2>
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 font-custom text-[#e4d6c3]">
                {socialLinks.map((s, i) => (
                  <SocialLink 
                    key={i} 
                    href={s.href} 
                    imgSrc={s.img} 
                    label={s.label} 
                    onClick={s.onClick}
                  />
                ))}
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
              <div className="w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="py-8 grid grid-cols-2 sm:grid-cols-4 place-items-center gap-8 sm:gap-12">
                    {[logo1, logo2, logo3, logo4].map((src, i) => (
                      <div
                        key={i}
                        className="aspect-square w-24 sm:w-20 md:w-28 flex items-center justify-center"
                      >
                        <img
                          src={src}
                          alt={`Partner Logo ${i + 1}`}
                          className={`max-h-full max-w-full object-contain opacity-95 hover:opacity-100 transition
                            ${i === 2 || i === 3 ? 'scale-90 sm:scale-95' : ''}`}
                          loading="lazy"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full text-center mt-10 text-xs text-[#725640] tracking-widest">
                  <a
                    href="https://www.kahrworks.at"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    &copy; {year} KAHRWORKS GMBH — All rights reserved.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Imprint Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#1b1b1b] text-[#bca78d] rounded-2xl shadow-xl p-6 w-full max-w-lg animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold tracking-wide text-[#e5cfac]">Company Imprint</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#c5a57c] hover:text-[#f4d8b4] text-xl"
              >
                &times;
              </button>
            </div>
            <div className="text-sm space-y-1 font-light tracking-wide text-left">
              <p><strong>KahrWorks GmbH</strong></p>
              <p>Bobletten 23, 6850 Dornbirn, Austria</p>
              {/* <p>Email: <a href="mailto:office@kahrworks.at" className="hover:text-[#e8d6bc]">office@kahrworks.at</a></p> */}
              <p>Website: <a href="https://www.kahrworks.at" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8d6bc]">www.kahrworks.at</a></p>
              <p>USt-IdNr.: AT U75459914</p>
              <p>Registernummer: FN531874v</p>
              <p>Registergericht: Landesgericht Feldkirch</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;