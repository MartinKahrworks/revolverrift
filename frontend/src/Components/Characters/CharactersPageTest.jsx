import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import CharacterScrollTest from './CharacterScrollTest';
import DossierHeroTest from '../Dossier/DossierHeroTest';

const CharactersPageTest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const currentCharacterId = id ? id.toLowerCase() : 'leader';
    const getDisplayName = id => id.charAt(0).toUpperCase() + id.slice(1);
    const [selectedCharacter, setSelectedCharacter] = useState(getDisplayName(currentCharacterId));

    useEffect(() => {
        setSelectedCharacter(getDisplayName(currentCharacterId));
    }, [currentCharacterId]);

    const characters = ['Leader', 'Vanguard', 'Classified'];
    const { scrollYProgress } = useScroll();

    return (
        <div className="bg-black text-white">

            <DossierHeroTest />

            <motion.div
                className="fixed top-0 left-0 h-1 bg-red-600 origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            <CharacterScrollTest />

            {/* Operational Profile */}
            <section className="bg-black py-32 px-6 md:px-20 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-black uppercase mb-10">Operational Profile</h2>
                    <p className="text-gray-400 max-w-3xl">
                        Thomas operates as the central architect of the Rift Order.
                        Tactical oversight, strategic deployment and intelligence funding
                        remain under his direct authority.
                    </p>
                </div>
            </section>

            {/* Timeline */}
            <section className="bg-black py-32 px-6 border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-5xl font-black uppercase mb-16">Timeline</h2>
                    <div className="space-y-12 border-l border-white/20 pl-8">
                        <div>
                            <span className="text-red-500 text-sm">1942</span>
                            <p className="text-gray-300 mt-2">
                                The fracture. Battlefield anomaly recorded.
                            </p>
                        </div>
                        <div>
                            <span className="text-red-500 text-sm">Present</span>
                            <p className="text-gray-300 mt-2">
                                Architect of the Rift Order.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default CharactersPageTest;
