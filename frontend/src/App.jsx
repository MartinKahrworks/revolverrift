import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom"; // BrowserRouter is removed
import { AnimatePresence } from "framer-motion";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import PopupPlayer from "./Components/PopupPlayer/PopupPlayer";
import { CartProvider } from "./context/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "./Components/Loader/Loader";
import HeroCountdown from "./Components/Hero/Hero";
import Features from "./Components/Features/Features";
import AboutGame from "./Components/Showcase/AboutGame";
import Trailer from "./Components/Showcase/Trailer";

// Lazy Loaded Components
const Testimonials = React.lazy(() => import("./Components/Testimonials/Testimonials"));
const ContentPage = React.lazy(() => import("./Components/ContentPage/ContentPage"));
const NewsPage = React.lazy(() => import("./Components/News/NewsPage"));
const Showcase = React.lazy(() => import("./Components/Showcase/Showcase"));
const GunsShowcase = React.lazy(() => import("./Components/Showcase/GunsShowcase"));
const Partners = React.lazy(() => import("./Components/Partners/partners"));
const Contact = React.lazy(() => import("./Components/Contact/Contact"));
const Shop = React.lazy(() => import("./Components/Shop/Shop"));
const Cart = React.lazy(() => import("./Components/Cart/Cart"));
const CharactersPage = React.lazy(() => import("./Components/Characters/CharactersPage"));
const CharactersPageTest = React.lazy(() => import("./Components/Characters/CharactersPageTest"));
const AllBlogsPage = React.lazy(() => import("./Components/Features/NewsCardGrid").then(module => ({ default: module.AllBlogsPage })));
const BlogPostPage = React.lazy(() => import("./Components/Features/NewsCardGrid").then(module => ({ default: module.BlogPostPage })));

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
      // Initial load: minimal timer to allow UI to mount, no window.load blocking
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        isFirstLoad.current = false;
      }, 800);
      return () => clearTimeout(timer);
    } else {
      // Subsequent navigations: Use fixed timer
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

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
    <CartProvider>
      {/* <Cursor /> */}
      {/* Scroll to the top of the page whenever the route changes */}
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" isLoading={isLoading} />}
      </AnimatePresence>

      {/* Root Overlay Container */}
      <div className="relative min-h-screen">

        {/* Navbar sits above the frame completely */}
        <Navbar />

        {/* Frame Overlay Layer */}
        <ViewportFrame />

        {/* Main Scrollable Content */}
        <main className="relative z-10 overflow-x-hidden bg-black text-white duration-300">
          <React.Suspense fallback={<div className="min-h-screen bg-black" />}>
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
              <Route path="/cart" element={<Cart />} />
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
          </React.Suspense>
          <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />
        </main>

      </div>
    </CartProvider>
  );
};

export default App;
