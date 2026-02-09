import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import poster1 from '../../assets/newassets/GUN1.png';
import poster2 from '../../assets/newassets/GUN2.png';
import poster3 from '../../assets/newassets/GUN3.png';
import poster4 from '../../assets/newassets/GUN4.png';

const items = [
    {
        id: 1,
        title: 'CHARACTERS',
        image: poster1,
        link: '/characters',
    },
    {
        id: 2,
        title: 'SHOWCASE',
        image: poster2,
        link: '#',
    },
    {
        id: 3,
        title: 'GAME DEMO',
        image: poster3,
        link: '#',
    },

    {
        id: 4,
        title: 'BLOGS',
        image: poster4,
        link: '/blogs',
    },
];

const SlantedGallery = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col md:flex-row">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={`
            relative flex-1 min-h-0 md:h-full 
            transition-[flex-grow] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
            group 
            border-b-[15px] md:border-b-0 md:border-r-[20px] border-black
            overflow-hidden
            md:skew-x-[-15deg]
            ${hoveredIndex === index ? 'flex-[10] md:flex-[4]' : 'flex-[1]'}
            ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-50' : 'opacity-100'}
          `}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
                >
                    {/* Background Image Container - Inverse Skew */}
                    <div className="absolute inset-0 w-full h-full md:skew-x-[15deg] md:scale-x-125 overflow-hidden origin-center bg-black">
                        {/* Actual Image */}
                        <div
                            className="absolute inset-0 md:inset-[-20%] w-full md:w-[140%] h-full scale-110 md:scale-125 transition-transform duration-700 ease-out group-hover:scale-110"
                            style={{
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                        </div>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none md:skew-x-[15deg] px-2">
                        <h2 className={`
                            font-black font-vintage uppercase tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] text-center text-white
                            transition-all duration-500 transform
                            ${hoveredIndex === index ? 'text-4xl md:text-7xl scale-110' : (hoveredIndex === null ? 'text-2xl md:text-4xl' : 'text-lg md:text-2xl')}
                        `}>
                            {item.title}
                        </h2>
                        {item.link !== '#' && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(item.link);
                                }}
                                className={`
                                    mt-6 px-8 py-3 bg-white text-black font-black text-sm uppercase tracking-[0.2em] 
                                    hover:bg-[#ff3333] hover:text-white transition-all duration-300 
                                    pointer-events-auto
                                    ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                `}
                            >
                                Explore
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default SlantedGallery;
