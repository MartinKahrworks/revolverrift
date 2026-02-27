import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom"; // BrowserRouter is removed
import { AnimatePresence } from "framer-motion";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import GodLikeHero from "./Components/Hero/GodLikeHero";
import Quotes from "./Components/Quotes/Quotes";
import Banner from "./Components/Banner/Banner";
import Banner2 from "./Components/Banner/Banner2";
// import Banner3 from "./Components/Banner/Banner3"; // Removed

import AppStore from "./Components/AppStore/AppStore";
import Footer from "./Components/Footer/Footer";
import PopupPlayer from "./Components/PopupPlayer/PopupPlayer";
import Testimonials from "./Components/Testimonials/Testimonials";
import Banner5 from "./Components/Banner/Banner5";
import AOS from "aos";
import "aos/dist/aos.css";
import Banner6 from "./Components/Banner/Banner6";
import Banner7 from "./Components/Banner/Banner7";
import Banner8 from "./Components/Banner/Banner8";
import Banner9 from "./Components/Banner/Banner9";
import Banner10 from "./Components/Banner/Banner10";
import ContentPage from "./Components/ContentPage/ContentPage";
import { NewsCardGrid, AllBlogsPage, BlogPostPage } from "./Components/Features/NewsCardGrid";
import NewsPage from "./Components/News/NewsPage";
import Showcase from "./Components/Showcase/Showcase";
import GunsShowcase from "./Components/Showcase/GunsShowcase";
import Partners from "./Components/Partners/partners";
import Contact from "./Components/Contact/Contact";
import Shop from "./Components/Shop/Shop";
import Loader from "./Components/Loader/Loader";
import HeroCountdown from "./Components/Hero/Hero";
import Features from "./Components/Features/Features";
import AboutGame from "./Components/Showcase/AboutGame";
import Trailer from "./Components/Showcase/Trailer";
import ReleaseCountdown from "./Components/Showcase/ReleaseCountdown";
import CharactersPage from "./Components/Characters/CharactersPage";
import CharactersPageTest from "./Components/Characters/CharactersPageTest";

// This component handles scrolling to the top of the page on route changes.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

import Cursor from "./Components/Cursor/Cursor";
import ViewportFrame from "./Components/Frame/ViewportFrame";

const App = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isFirstLoad = useRef(true);

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };

  useLayoutEffect(() => {
    if (isFirstLoad.current) {
      // Initial load: Wait for BOTH minimum time AND window.load
      setIsLoading(true);

      const handleLoadCompletion = () => {
        setIsLoading(false);
        isFirstLoad.current = false;
      };

      const minTime = 2000;
      const startTime = Date.now();

      const onWindowLoad = () => {
        const elapsed = Date.now() - startTime;
        const remaining = minTime - elapsed;

        if (remaining > 0) {
          setTimeout(handleLoadCompletion, remaining);
        } else {
          handleLoadCompletion();
        }
      };

      if (document.readyState === "complete") {
        onWindowLoad();
      } else {
        window.addEventListener("load", onWindowLoad);
      }

      return () => window.removeEventListener("load", onWindowLoad);
    } else {
      // Subsequent navigations: Use fixed timer
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    // BrowserRouter is removed from here
    <>
      {/* <Cursor /> */}
      {/* Scroll to the top of the page whenever the route changes */}
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" isLoading={isLoading} />}
      </AnimatePresence>

      {/* Root Overlay Container */}
      <div className="relative min-h-screen">

        {/* Frame Overlay Layer */}
        <ViewportFrame />

        {/* Main Scrollable Content */}
        <main className="relative z-10 overflow-x-hidden bg-white dark:bg-black text-black dark:text-white duration-300">
          <Navbar />
          <Routes>
            {/* Home Page Route */}
            <Route
              path="/"
              element={
                <>
                  <HeroCountdown />
                  <Features />
                  <AboutGame />
                  <Trailer />

                  <Footer />
                </>
              }
            />
            {/* Blog Routes */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="/credits" element={
              <>
                <Testimonials />
                {/* <Banner7 /> */}
              </>
            } />
            <Route path="/showcase" element={
              <>
                <Showcase />
                <GunsShowcase />
                <Footer />
              </>
            } />
            <Route path="/shop" element={<Shop />} />
            {/* Character Routes */}
            <Route path="/characters" element={<Navigate to="/characters/leader" replace />} />
            <Route path="/characters/:id" element={<CharactersPage />} />

            {/* Character Test Routes */}
            <Route path="/characterstest" element={<Navigate to="/characterstest/leader" replace />} />
            <Route path="/characterstest/:id" element={<CharactersPageTest />} />


            <Route path="/partners" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/content" element={<ContentPage />} />

            {/* Blog Routes — powered by Strapi CMS */}
            <Route path="/blogs" element={<AllBlogsPage />} />
            <Route path="/blog/:link" element={<BlogPostPage />} />
          </Routes>
          <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />
        </main>

      </div>
    </>
  );
};

export default App;
