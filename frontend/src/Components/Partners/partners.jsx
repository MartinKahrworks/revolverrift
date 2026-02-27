import bgImage from '../../assets/Texturelabs_Grunge_353M.webp';

import React, { useState, useEffect } from 'react';
import { getPartnersPageData, FALLBACK_PARTNERS_DATA } from '../../api/partnersApi';

function Partners() {
    const [data, setData] = useState(FALLBACK_PARTNERS_DATA);

    useEffect(() => {
        getPartnersPageData().then((res) => {
            setData(res);
        });
    }, []);

    return (
        <section className="min-h-screen w-full bg-fixed bg-cover overflow-x-hidden  py-20"
            style={{ backgroundImage: `url(${data.backgroundImage})` }}
        >
            <div className="text-base md:text-lg pt-28  leading-relaxed text-gray-300 space-y-4 bg-left ">
                <h2 className="font-semibold font-custom text-[#e4d6c3] pb-6 flex justify-center text-3xl md:text-4xl lg:text-5xl">
                    {data.title}
                </h2>
                <div className=" text-white rounded-2xl shadow-lg p-8 text-center max-w-2xl mx-auto space-y-4">
                    {data.intro_paragraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </div>

            <div className="text-base md:text-lg pt-28  leading-relaxed text-gray-300 space-y-4 bg-left font-Inter">
                <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-24 p-10 cursor-pointer overflow-hidden">
                    {data.stages.map((card, index) => (
                        <div
                            key={index}
                            className="bg-[#1E1E1E] text-[#F5F5F5] border border-[#AA0000] bg-opacity-100 text-white rounded-2xl shadow-lg p-6 w-full md:w-1/3 hover:scale-105 transition-transform duration-300"
                        >

                            <h2 className="font-semibold font-custom text-[#e4d6c3] pb-6 flex justify-center text-3xl md:text-4xl lg:text-4xl">{card.title}</h2>

                            <p className="text-gray-300 font-Inter mb-4">{card.description}</p>
                            <ul className="list-disc list-inside text-gray-200 space-y-1">
                                {card.benefits.map((benefit, i) => (
                                    <li key={i}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Optional Logos Section if populated */}
            {data.logos.length > 0 && (
                <div className="max-w-5xl mx-auto px-6 py-12">
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        {data.logos.map((logo, i) => (
                            <img key={i} src={logo.url} alt={logo.name} loading="lazy" className="h-16 md:h-20 lg:h-24 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 drop-shadow-lg" />
                        ))}
                    </div>
                </div>
            )}

            <div className="text-base md:text-lg leading-relaxed text-gray-300 space-y-4 bg-left  text-white rounded-2xl shadow-lg p-6 text-center max-w-2xl mx-auto">
                <h2 className="font-semibold font-custom text-[#e4d6c3] pt-28 pb-4 flex justify-center text-3xl md:text-4xl lg:text-5xl">
                    Application & Process
                </h2>
                {data.outro_paragraphs.map((para, i) => (
                    <p key={i} className="text-base md:text-lg leading-relaxed text-gray-300 space-y-4 bg-left  text-white rounded-2xl shadow-lg p-2 text-center max-w-2xl mx-auto">
                        {para}
                    </p>
                ))}

                <br />
                <br />
                <h2 className="font-semibold font-custom text-[#e4d6c3] pb-20 flex justify-center text-3xl md:text-4xl lg:text-5xl">
                    Apply now and become part of the Revolver Rift Partner Community!
                </h2>
            </div>
        </section>
    )
}

export default Partners;