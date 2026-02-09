import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CharacterScroll = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Track scroll progress of the container
    // Using "start start" to "end end" creates a scroll-lock effect
    // The section stays in view until the entire scroll range is complete
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Create a transformer for frame index: Single playthrough (0 to 95)
    // Create a transformer for frame index: Single playthrough (0 to 95)
    // Plays continuously throughout the entire 500vh scroll
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 95]);



    useEffect(() => {
        const loadImages = async () => {
            // Import all images from the folder
            const modules = import.meta.glob('../../assets/CHAR1-jpg/*.jpg', { eager: true });

            // Sort keys to ensure order 001 -> 096
            const sortedKeys = Object.keys(modules).sort((a, b) => {
                const numA = parseInt(a.match(/(\d+)\.jpg$/)[1]);
                const numB = parseInt(b.match(/(\d+)\.jpg$/)[1]);
                return numA - numB;
            });

            // Creates Image objects
            const loadedImages = await Promise.all(
                sortedKeys.map(key => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = modules[key].default;
                        img.onload = () => resolve(img);
                        img.onerror = reject;
                    });
                })
            );

            setImages(loadedImages);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Initial render
        const renderFrame = (index) => {
            // Clamp index to valid range
            const clampedIndex = Math.min(Math.max(Math.floor(index), 0), images.length - 1);
            const img = images[clampedIndex];
            if (img) {
                // Maintain aspect ratio and center
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        // Update on scroll changes
        const unsubscribe = frameIndex.on("change", (latest) => {
            // No need to clamp since we're using modulo in renderFrame
            requestAnimationFrame(() => renderFrame(latest));
        });

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Re-render current frame after resize
            const currentIndex = frameIndex.get();
            renderFrame(currentIndex);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Init size

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [images, frameIndex]);

    // Opacity transforms for text overlays - adjusted for 500vh height
    // Spaced out evenly across the longer scroll duration
    const textOpacity1 = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]);
    const textOpacity2 = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
    const textOpacity3 = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);

    return (
        <>
            {/* Ghost Scroll Track - Gives the page its height/scrollability */}
            <div ref={containerRef} className="absolute inset-0 h-[500vh] w-full pointer-events-none" />

            {/* Fixed Visual Content - Stays on screen 100% of the time */}
            <div className="fixed inset-0 w-full h-full overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center text-white z-50">
                        Accessing Intel...
                    </div>
                )}

                <div className="w-full h-full">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Text Overlays */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10 w-full h-full">
                    {/* Text 1: Identity & Origin */}
                    <motion.div
                        style={{ opacity: textOpacity1, textShadow: "0 0 20px rgba(0,0,0,0.8)" }}
                        className="absolute text-center px-6 w-full max-w-5xl md:top-1/2 md:-translate-y-1/2 top-1/3"
                    >
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 uppercase tracking-tighter font-vintage mb-4">
                            THOMAS
                        </h2>
                        <h3 className="text-xl md:text-3xl text-red-500 tracking-[0.5em] font-mono mb-6 uppercase">The Leader</h3>
                        <p className="text-gray-300 text-sm md:text-lg lg:text-xl font-light tracking-wide leading-relaxed max-w-3xl mx-auto">
                            Before the Rift, Thomas was a man of wealth and excess. Money insulated him from consequence. Power came easily. Meaning did not.
                        </p>
                    </motion.div>

                    {/* Text 2: The Turning Point */}
                    <motion.div
                        style={{ opacity: textOpacity2, textShadow: "0 0 20px rgba(0,0,0,0.8)" }}
                        className="absolute text-center px-6 w-full max-w-5xl md:top-1/2 md:-translate-y-1/2 top-1/3"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 uppercase tracking-tighter font-vintage mb-6 drop-shadow-2xl">
                            THE FRACTURE
                        </h2>
                        <p className="text-gray-300 text-sm md:text-lg lg:text-xl font-light tracking-wide leading-relaxed max-w-3xl mx-auto mb-4">
                            In 1942, reality fractured. Trapped on a battlefield belonging to something worse than nations, he survived only because of <span className="text-red-500 font-bold">The Nun</span>.
                        </p>
                        <p className="text-gray-400 text-xs md:text-base font-mono tracking-widest">
                            THE MAN WHO RETURNED WAS NOT THE SAME ONE WHO ENTERED.
                        </p>
                    </motion.div>

                    {/* Text 3: The Mission */}
                    <motion.div
                        style={{ opacity: textOpacity3, textShadow: "0 0 20px rgba(0,0,0,0.8)" }}
                        className="absolute text-center px-6 w-full max-w-5xl md:top-1/2 md:-translate-y-1/2 top-1/3"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 uppercase tracking-tighter font-vintage mb-6 drop-shadow-2xl">
                            ORDER IN CHAOS
                        </h2>
                        <p className="text-gray-300 text-sm md:text-lg lg:text-xl font-light tracking-wide leading-relaxed max-w-3xl mx-auto mb-6">
                            Now known simply as Leader, he builds structure in chaos. He does not seek glory. He does not claim divinity. He funds operations, moves intelligence, and unites those willing to stand against forces greater than humanity understands.
                        </p>
                        <p className="text-white text-lg md:text-2xl font-bold tracking-[0.2em] uppercase border-t border-b border-red-500/30 py-4 inline-block">
                            SURVIVAL IS NEVER LUCK
                        </p>
                    </motion.div>
                </div>

                {/* Optional: Vignette overlay */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60 pointer-events-none" />
            </div>
        </>
    );
};

export default CharacterScroll;
