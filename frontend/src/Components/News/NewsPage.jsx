import React, { useEffect } from "react";
import NewsLanding from "./NewsLanding";
import { NewsCardGrid } from "../Features/NewsCardGrid";
import Footer from "../Footer/Footer";
import bgImage from '../../assets/Texturelabs_Grunge_353M.webp';

const NewsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-black min-h-screen">
            <NewsLanding />
            <div className="relative z-10 -mt-20">
                <NewsCardGrid />
            </div>
            <Footer />
        </div>
    );
};

export default NewsPage;
