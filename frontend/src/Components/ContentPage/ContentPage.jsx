import React, { useState, useEffect } from "react";
import { getContentSectionsFromStrapi } from "../../api/contentApi";
import Banner from "../Banner/Banner";
import DynamicBanner from "../Banner/DynamicBanner";
import { NewsCardGrid } from "../Features/NewsCardGrid";
import Footer from "../Footer/Footer";

const ContentPage = () => {
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const data = await getContentSectionsFromStrapi();
                setSections(data);
            } catch (err) {
                console.error("Failed to load sections", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSections();
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">
            {/* 1. Main Hero Area */}
            <Banner />

            {/* 2. Dynamic Story/Lore Sections */}
            {!isLoading && sections.map((section, idx) => (
                <DynamicBanner key={section.id ?? idx} section={section} />
            ))}

            {/* 3. Developer Blogs (NewsCardGrid) */}
            <NewsCardGrid />

            {/* 4. Footer */}
            <Footer />
        </div>
    );
};

export default ContentPage;
