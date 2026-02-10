import { useState, useEffect } from "react";
import { getGalleryMedia } from "../../api/galleryApi";

// Animated background
import embersBackground from "../../assets/embers_background.gif";

const Showcase = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [allImages, setAllImages] = useState([]);

  // Fetch gallery media on mount
  useEffect(() => {
    const data = getGalleryMedia();
    setAllImages(data);
  }, []);

  // Main gallery shows curated artistic selection (first 10 images)
  const mainGalleryImages = allImages.slice(0, 10);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => setSelectedImageIndex(null);

  const openExplore = () => setIsExploreOpen(true);
  const closeExplore = () => setIsExploreOpen(false);

  // Navigate to next/previous image
  const goToNext = (e) => {
    e.stopPropagation();
    if (allImages.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    if (allImages.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  // ESC key to close modals, Arrow keys for navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
        closeExplore();
      }
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowRight") goToNext(e);
        if (e.key === "ArrowLeft") goToPrevious(e);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, allImages.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImageIndex !== null || isExploreOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImageIndex, isExploreOpen]);

  // Get dynamic grid classes based on orientation
  const getGridClasses = (orientation) => {
    switch (orientation) {
      case 'panoramic':
        return 'col-span-1 md:col-span-2 lg:col-span-3 row-span-1'; // Full width
      case 'landscape':
        return 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1'; // Wide
      case 'portrait':
        return 'col-span-1 row-span-2'; // Tall
      case 'square':
      default:
        return 'col-span-1 row-span-1'; // Default
    }
  };

  return (
    <>
      {/* Scrolling Content Section with Embers Background */}
      <section
        className="relative w-full min-h-screen py-20 md:py-32 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${embersBackground})`,
        }}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

          {/* Dynamic Orientation-Aware Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 auto-rows-[minmax(200px,auto)] grid-flow-dense">
            {mainGalleryImages.map((media, idx) => (
              <div
                key={media.id}
                className={`group relative overflow-hidden rounded-xl shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-red-900/30 ${getGridClasses(media.orientation)}`}
              >
                <img
                  src={media.image}
                  alt={media.name}
                  onClick={() => handleImageClick(idx)}
                  className="w-full h-full object-cover rounded-xl hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Explore More Button */}
          <div className="flex justify-center mb-20">
            <button
              onClick={openExplore}
              className="group relative px-10 py-4 bg-gradient-to-r from-red-900/80 to-red-800/80 hover:from-red-800 hover:to-red-700 text-white font-bold text-lg rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-red-900/50 border border-red-700/50"
            >
              <span className="relative z-10 flex items-center gap-3">
                EXPLORE MORE
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Single Image Modal/Lightbox with Navigation */}
      {selectedImageIndex !== null && allImages[selectedImageIndex] && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 cursor-pointer backdrop-blur-sm animate-fadeIn"
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white text-4xl font-light transition-colors z-10"
            onClick={closeModal}
          >
            ×
          </button>

          {/* Previous Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Image */}
          <img
            src={allImages[selectedImageIndex].image}
            alt={allImages[selectedImageIndex].name}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90%] md:max-w-[85%] max-h-[85vh] rounded-lg shadow-2xl cursor-default object-contain animate-scaleIn"
          />

          {/* Next Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            {selectedImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}

      {/* Explore More Full-Screen Overlay with Glassmorphism */}
      {isExploreOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn">
          {/* Background Layer - Embers GIF */}
          <div
            className="fixed inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${embersBackground})`,
              backgroundAttachment: 'fixed',
            }}
          />

          {/* Glassmorphism Blur Layer */}
          <div className="fixed inset-0 backdrop-blur-3xl bg-gradient-to-br from-black/60 via-red-950/40 to-black/70" />

          {/* Content Layer */}
          <div className="relative z-10">
            {/* Close Button */}
            <button
              onClick={closeExplore}
              className="fixed top-6 right-6 text-white/90 hover:text-white text-5xl font-light transition-colors z-20 hover:rotate-90 duration-300 drop-shadow-2xl"
            >
              ×
            </button>

            {/* Overlay Title */}
            <div className="text-center pt-12 pb-8 sticky top-0 backdrop-blur-md bg-black/30 z-10 border-b border-white/20">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider mb-2 drop-shadow-2xl">
                MEDIA GALLERY
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-900 to-red-700 mx-auto shadow-2xl shadow-red-900/70" />
            </div>

            {/* Compact 4-Column Gallery Grid */}
            <div className="container mx-auto px-4 md:px-8 max-w-7xl pb-20 pt-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {allImages.map((media, idx) => (
                  <div
                    key={media.id}
                    className="group relative overflow-hidden rounded-xl shadow-lg border border-white/20 bg-white/5 backdrop-blur-sm hover:border-white/40 transition-all duration-300 aspect-square"
                  >
                    <img
                      src={media.image}
                      alt={media.name}
                      onClick={() => handleImageClick(idx)}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Showcase;
