import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/IMG_0983.png";

const Loader = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="relative"
            >
                <img
                    src={logo}
                    alt="Loading..."
                    className="w-24 md:w-32 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                />
                {/* Spinning Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 -m-4 border-2 border-transparent border-t-yellow-600/50 border-r-yellow-600/50 rounded-full"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex flex-col items-center gap-2"
            >
                <div className="text-yellow-600 font-vintage tracking-[0.2em] text-sm animate-pulse">
                    INITIALIZING
                </div>
                <div className="w-32 h-0.5 bg-gray-800 overflow-hidden relative">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600 to-transparent w-1/2"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Loader;
