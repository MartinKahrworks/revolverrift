import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CharacterScrollTest = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 95]);

    useEffect(() => {
        const loadImages = async () => {
            const modules = import.meta.glob('../../assets/CHAR1-jpg/*.jpg', { eager: true });

            const sortedKeys = Object.keys(modules).sort((a, b) => {
                const numA = parseInt(a.match(/(\d+)\.jpg$/)[1]);
                const numB = parseInt(b.match(/(\d+)\.jpg$/)[1]);
                return numA - numB;
            });

            const loadedImages = await Promise.all(
                sortedKeys.map(key => new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = modules[key].default;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                }))
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

        const renderFrame = (index) => {
            const clampedIndex = Math.min(Math.max(Math.floor(index), 0), images.length - 1);
            const img = images[clampedIndex];
            if (img) {
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        const unsubscribe = frameIndex.on("change", latest => {
            requestAnimationFrame(() => renderFrame(latest));
        });

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(frameIndex.get());
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [images, frameIndex]);

    return (
        <section ref={containerRef} className="relative h-[500vh]">

            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center text-white z-50">
                        ACCESSING INTEL...
                    </div>
                )}

                <canvas ref={canvasRef} className="w-full h-full" />

            </div>

        </section>
    );
};

export default CharacterScrollTest;
