import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import CharacterScroll from './CharacterScroll';

const CharactersPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Normalize ID or default to 'leader'
    const currentCharacterId = id ? id.toLowerCase() : 'leader';

    // Convert ID to display name (e.g., 'leader' -> 'Leader')
    const getDisplayName = (id) => id.charAt(0).toUpperCase() + id.slice(1);

    const [selectedCharacter, setSelectedCharacter] = useState(getDisplayName(currentCharacterId));

    // Update local state when URL changes
    useEffect(() => {
        setSelectedCharacter(getDisplayName(currentCharacterId));
    }, [currentCharacterId]);

    const characters = ['Leader', 'Vanguard', 'Classified'];

    return (
        <div className="relative min-h-[500vh] bg-black">
            {/* Header / Selector - Fixed to stay on top */}
            <div className="fixed top-0 left-0 w-full z-50 px-6 pt-12 md:pt-20 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end pointer-events-none">

                {/* Title Section */}
                <div className="pointer-events-auto mb-6 md:mb-0">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-2xl font-vintage">
                        CHARACTERS
                    </h1>
                    <p className="text-sm md:text-lg text-gray-400 mt-2 tracking-[0.3em] font-mono ml-1"></p>
                </div>

                {/* Animated Dropdown Selector */}
                <div className="relative pointer-events-auto">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest text-sm rounded-none hover:bg-white/20 transition-all min-w-[200px] justify-between"
                    >
                        <span>{selectedCharacter}</span>
                        <motion.span animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.span>
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-white/10 backdrop-blur-xl overflow-hidden"
                            >
                                {characters.map((char, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (char !== 'Classified') {
                                                navigate(`/characters/${char.toLowerCase()}`);
                                                setIsDropdownOpen(false);
                                            }
                                        }}
                                        className={`w-full text-left px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors flex justify-between items-center
                                            ${selectedCharacter === char ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                                            ${char === 'Classified' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                                        `}
                                    >
                                        {char}
                                        {char === 'Classified' && (
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Character Content */}
            <div className="relative">
                {/* Reusing the scroll component for the Leader */}
                <CharacterScroll />

                {/* Overlay Title for "LEADER" specifically if needed, 
                    though CharacterScroll has its own overlays. 
                    We can add a specific "LEADER" label here if desired above the scroll area 
                */}
            </div>
        </div>
    );
};

export default CharactersPage;
