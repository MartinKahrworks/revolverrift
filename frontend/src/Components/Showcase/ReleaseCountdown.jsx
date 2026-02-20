import React, { useState, useEffect } from 'react';
import bgGrunge from '../../assets/Texturelabs_Grunge_353M.webp';

const ReleaseCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        // Target date: 30 days from now (placeholder)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 291); // Match 291 days from reference roughly

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({
                    days: String(days).padStart(2, '0'),
                    hours: String(hours).padStart(2, '0'),
                    minutes: String(minutes).padStart(2, '0'),
                    seconds: String(seconds).padStart(2, '0')
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-32 bg-[#050505] text-white overflow-hidden text-center">
            {/* Background Texture */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url(${bgGrunge})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <h4 className="text-[#ff3333] text-sm tracking-[0.3em] uppercase mb-4 font-bold animate-pulse">Coming Soon</h4>
                <h2 className="text-4xl md:text-6xl font-godlike uppercase tracking-wider mb-16 text-white">
                    GodLike II
                </h2>
                <p className="text-gray-500 font-serif italic mb-12 -mt-12 text-lg">
                    "Into the darkness we descend"
                </p>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24">
                    <TimeBlock value={timeLeft.days} label="Days" />
                    <TimeBlock value={timeLeft.hours} label="Hours" />
                    <TimeBlock value={timeLeft.minutes} label="Mins" />
                    <TimeBlock value={timeLeft.seconds} label="Secs" />
                </div>
            </div>
        </section>
    );
};

const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <div className="text-5xl md:text-7xl lg:text-8xl font-godlike text-white/90 leading-none">
            {value}
        </div>
        <span className="mt-4 text-xs md:text-sm uppercase tracking-[0.2em] text-gray-500 font-bold">
            {label}
        </span>
    </div>
);

export default ReleaseCountdown;
