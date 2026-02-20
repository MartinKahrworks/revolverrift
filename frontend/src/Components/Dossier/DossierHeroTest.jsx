import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dossierBg from './painted-solid-concrete-wall-textured-background.png';

const DossierHeroTest = () => {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[150vh] w-full bg-neutral-950"
        >
            <motion.div
                style={{ y: translateY }}
                className="sticky top-0 h-screen w-full overflow-hidden"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${dossierBg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.35)]" />
                </div>

                <div className="relative z-10 h-full w-full flex flex-col justify-between p-10 md:p-16">
                    <div className="flex justify-between border-b-2 border-neutral-900 pb-6">
                        <div>
                            <h3 className="font-melma text-sm tracking-widest uppercase text-neutral-900">
                                NAME: THOMAS
                            </h3>
                            <p className="font-melma text-xs tracking-widest uppercase text-neutral-600">
                                ORIGIN: PRE-FRACTURE ELITE
                            </p>
                        </div>
                        <div className="text-right">
                            <h3 className="font-melma text-sm tracking-widest uppercase text-neutral-900">
                                FILE NO: RR-1942-X
                            </h3>
                            <p className="font-melma text-xs font-bold tracking-widest uppercase text-red-800">
                                CLEARANCE: LEVEL 7
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <h1 className="font-melma text-8xl md:text-[10rem] font-black uppercase text-neutral-900 tracking-tight leading-[0.8]">
                            THOMAS
                        </h1>
                        <p className="mt-8 max-w-3xl text-xl italic text-neutral-800">
                            "Before the Rift, Thomas was a man of wealth and excess.
                            Now, he creates order from chaos."
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <div className="rotate-[-12deg] border-[6px] border-red-800 px-8 py-4">
                            <p className="font-melma text-red-800 font-black text-5xl tracking-[0.2em] uppercase">
                                CONFIDENTIAL
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default DossierHeroTest;
