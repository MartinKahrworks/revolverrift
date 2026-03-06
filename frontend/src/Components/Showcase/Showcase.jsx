import { useState, useEffect, useCallback } from "react";
import { getGalleryMediaFromStrapi, getShowcasePageData, FALLBACK_SHOWCASE_PAGE } from "../../api/galleryApi";
import embersBackground from "../../assets/embers_background.gif";
import { ShowcaseSkeleton } from "../Skeleton/Skeleton";

// ─── Category badge colours ────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  screenshot: { bg: "bg-red-600", text: "text-black" },
  artwork: { bg: "bg-yellow-500", text: "text-black" },
  weapon: { bg: "bg-blue-600", text: "text-white" },
  environment: { bg: "bg-emerald-700", text: "text-white" },
};

const CategoryBadge = ({ category }) => {
  const style = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.screenshot;
  return (
    <span className={`inline-block ${style.bg} ${style.text} px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-sm`}>
      {category}
    </span>
  );
};

// ─── Bento grid span classes ───────────────────────────────────────────────────
const getSpan = (orientation, index) => {
  if (orientation === "panoramic") return "col-span-2 md:col-span-3 lg:col-span-4 row-span-1";
  if (orientation === "portrait") return "col-span-1 row-span-2";
  if (orientation === "landscape" && index % 7 === 0) return "col-span-2 row-span-1";
  return "col-span-1 row-span-1";
};

// ─── Single Lightbox Modal ─────────────────────────────────────────────────────
const Lightbox = ({ images, index, onClose, onNav }) => {
  if (index === null || !images[index]) return null;
  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')" }}
      />

      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 md:top-5 md:right-6 text-white hover:text-red-500 font-mono text-xs md:text-sm tracking-widest uppercase transition-colors z-20 bg-black/50 md:bg-transparent px-3 py-2 md:p-0 rounded-sm shadow-xl md:shadow-none">
        ✕ ESC
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 border border-white/20 hover:border-[#ff3333] bg-black/60 text-white p-3 transition-all duration-300 hover:bg-[#ff3333] hover:shadow-[0_0_15px_rgba(255,51,51,0.5)]"
        aria-label="Previous"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
      <div className="flex flex-col items-center gap-4 max-w-[88vw]" onClick={(e) => e.stopPropagation()}>
        <img
          src={img.image}
          alt={img.title}
          className="max-h-[78vh] max-w-full object-contain shadow-2xl"
        />
        {/* Caption bar */}
        <div className="flex items-center gap-4 text-sm font-mono">
          <CategoryBadge category={img.category} />
          {img.title && <span className="text-white/70 uppercase tracking-widest text-xs">{img.title}</span>}
          <span className="text-white/30 ml-auto">{index + 1} / {images.length}</span>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 border border-white/20 hover:border-[#ff3333] bg-black/60 text-white p-3 transition-all duration-300 hover:bg-[#ff3333] hover:shadow-[0_0_15px_rgba(255,51,51,0.5)]"
        aria-label="Next"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

// ─── Explore Drawer ────────────────────────────────────────────────────────────
const ExploreDrawer = ({ images, onClose, onImageClick, activeFilter, setActiveFilter }) => {
  const categories = ["all", ...new Set(images.map((i) => i.category))];
  const filtered = activeFilter === "all" ? images : images.filter((i) => i.category === activeFilter);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* BG */}
      <div className="fixed inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${embersBackground})` }} />
      <div className="fixed inset-0 backdrop-blur-2xl bg-black/70" />

      <div className="relative z-10 min-h-screen">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-black/60 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-custom uppercase tracking-widest text-white">Media Gallery</h2>
              <p className="text-red-500 font-mono text-xs tracking-[0.3em] uppercase mt-1">// Visual Field Reports</p>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-red-500 font-mono text-sm uppercase tracking-widest transition-colors">
              ✕ Close
            </button>
          </div>
          {/* Filter tabs */}
          <div className="max-w-7xl mx-auto px-6 pb-4 flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest border transition-all duration-200 ${activeFilter === cat
                  ? "border-red-600 bg-red-600/10 text-white shadow-[0_0_15px_rgba(255,51,51,0.4)]"
                  : "border-white/20 text-white/50 hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_15px_rgba(255,51,51,0.3)]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((media, idx) => (
              <div
                key={media.id}
                onClick={() => onImageClick(images.indexOf(media))}
                className="group relative aspect-square overflow-hidden border border-white/10 hover:border-red-600/50 transition-all duration-300 cursor-pointer bg-[#0a0a0a]"
              >
                <img
                  src={media.image}
                  alt={media.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
                  <CategoryBadge category={media.category} />
                  {media.title && (
                    <p className="text-white text-xs font-mono uppercase tracking-wider mt-1 line-clamp-1">{media.title}</p>
                  )}
                </div>
                {/* Bottom red bar on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
          <p className="text-center text-white/20 font-mono text-xs uppercase tracking-widest mt-8">{filtered.length} items</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Showcase = () => {
  const [allImages, setAllImages] = useState([]);
  const [pageData, setPageData] = useState(FALLBACK_SHOWCASE_PAGE);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getGalleryMediaFromStrapi(), getShowcasePageData()]).then(
      ([media, page]) => {
        setAllImages(media);
        setPageData(page);
        setLoading(false);
      }
    );
  }, []);

  // Keyboard navigation
  const handleNav = useCallback((dir) => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev + dir + allImages.length) % allImages.length;
    });
  }, [allImages.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setSelectedIndex(null); setIsExploreOpen(false); }
      if (selectedIndex !== null) {
        if (e.key === "ArrowRight") handleNav(1);
        if (e.key === "ArrowLeft") handleNav(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, handleNav]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null || isExploreOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex, isExploreOpen]);

  // First 12 for main bento grid, rest in drawer
  const mainImages = allImages.slice(0, 12);
  const featuredImage = allImages.find((img) => img.featured) ?? allImages[0];

  return (
    <>
      <section
        className="relative w-full min-h-screen bg-[#050505] overflow-hidden"
      >
        {/* Embers ambient BG */}
        <img
          src={embersBackground}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

        <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-16 md:pb-24">

          {/* ── Page Header ── */}
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-red-500 font-mono tracking-[0.3em] uppercase text-xs mb-3">
                {pageData.subtitle}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-custom uppercase tracking-tight text-white leading-none">
                {pageData.page_title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-white/20" />
              <span className="text-white/30 font-mono text-xs uppercase tracking-widest">{allImages.length} assets</span>
            </div>
          </div>

          {/* ── Featured Hero Strip ── */}
          {featuredImage && (
            <div
              className="group relative w-full h-[45vh] md:h-[55vh] overflow-hidden mb-6 border border-white/10 cursor-pointer"
              onClick={() => setSelectedIndex(allImages.indexOf(featuredImage))}
            >
              <img
                src={featuredImage.image}
                alt={featuredImage.title}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Corner decor */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/30" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/30" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/30" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/30" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 flex items-end justify-between">
                <div>
                  <div className="inline-block bg-red-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-black mb-2 md:mb-3">
                    Featured
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-custom uppercase text-white leading-none group-hover:text-red-400 transition-colors duration-300">
                    {featuredImage.title || "Featured Shot"}
                  </h2>
                </div>
                <div className="hidden md:flex items-center gap-3 text-white/50 font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span>View Full</span>
                  <span className="w-8 h-[1px] bg-white/40" />
                </div>
              </div>
            </div>
          )}

          {/* ── Bento Grid (or skeleton while loading) ── */}
          {loading ? (
            <ShowcaseSkeleton />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[220px] grid-flow-dense mb-8">
              {mainImages.map((media, idx) => {
                if (media.id === featuredImage?.id) return null; // skip featured (shown above)
                return (
                  <div
                    key={media.id}
                    className={`group relative overflow-hidden border border-white/5 hover:border-red-600/40 transition-all duration-300 cursor-pointer bg-[#0a0a0a] ${getSpan(media.orientation, idx)}`}
                    onClick={() => setSelectedIndex(allImages.indexOf(media))}
                  >
                    <img
                      src={media.image}
                      alt={media.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />

                    {/* Category + title */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                      <CategoryBadge category={media.category} />
                      {media.title && (
                        <p className="text-white text-xs font-mono uppercase tracking-wider mt-1.5 line-clamp-1">{media.title}</p>
                      )}
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-500 group-hover:w-full" />
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Explore More Button ── */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsExploreOpen(true)}
              className="group relative inline-flex items-center gap-3 border border-white/20 hover:border-[#ff3333] bg-transparent px-8 py-4 font-mono text-sm tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#ff3333] hover:shadow-[0_0_15px_rgba(255,51,51,0.5)]"
            >
              <span>Explore Full Gallery</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* ── Lightbox ── */}
      <Lightbox
        images={allImages}
        index={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNav={handleNav}
      />

      {/* ── Explore Drawer ── */}
      {isExploreOpen && (
        <ExploreDrawer
          images={allImages}
          onClose={() => setIsExploreOpen(false)}
          onImageClick={(idx) => { setSelectedIndex(idx); setIsExploreOpen(false); }}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      )}
    </>
  );
};

export default Showcase;
