// src/Components/Skeleton/Skeleton.jsx
// Reusable skeleton loader system for Revolver Rift
// Design: dark background + sliding red/amber shimmer, matching site aesthetic

import React from "react";

// ─── Shimmer animation (injected once via a <style> tag) ─────────────────────
const SHIMMER_STYLE = `
@keyframes rr-shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.rr-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(180, 30, 30, 0.08) 40%,
    rgba(220, 80, 80, 0.13) 50%,
    rgba(180, 30, 30, 0.08) 60%,
    transparent 100%
  );
  animation: rr-shimmer 1.8s ease-in-out infinite;
}
`;

// ─── Base atom — a single shimmer rectangle ────────────────────────────────
export const SkeletonBox = ({ className = "" }) => (
    <div className={`relative overflow-hidden bg-white/5 rr-shimmer ${className}`} />
);

// ─── Showcase bento grid skeleton ─────────────────────────────────────────────
export const ShowcaseSkeleton = () => (
    <>
        <style>{SHIMMER_STYLE}</style>
        {/* Featured hero strip */}
        <SkeletonBox className="w-full h-[45vh] md:h-[55vh] mb-6 border border-white/5" />
        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[220px]">
            {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonBox
                    key={i}
                    className={`border border-white/5 ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                />
            ))}
        </div>
    </>
);

// ─── Blog / News card grid skeleton ───────────────────────────────────────────
export const BlogGridSkeleton = ({ count = 6 }) => (
    <>
        <style>{SHIMMER_STYLE}</style>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex flex-col border border-white/5 overflow-hidden">
                    {/* Image placeholder */}
                    <SkeletonBox className="aspect-[4/3] w-full" />
                    {/* Text content */}
                    <div className="p-6 flex flex-col gap-3">
                        <SkeletonBox className="h-3 w-1/3 rounded-sm" />
                        <SkeletonBox className="h-6 w-full rounded-sm" />
                        <SkeletonBox className="h-6 w-4/5 rounded-sm" />
                        <SkeletonBox className="h-4 w-full rounded-sm mt-2" />
                        <SkeletonBox className="h-4 w-3/4 rounded-sm" />
                    </div>
                </div>
            ))}
        </div>
    </>
);

// ─── Featured blog hero skeleton (AllBlogsPage) ────────────────────────────────
export const FeaturedBlogSkeleton = () => (
    <>
        <style>{SHIMMER_STYLE}</style>
        {/* Big featured card */}
        <SkeletonBox className="w-full aspect-video md:aspect-[21/9] mb-24 rounded-sm border border-white/5" />
        {/* Grid below */}
        <BlogGridSkeleton count={3} />
    </>
);

// ─── Generic full-page skeleton (fallback) ────────────────────────────────────
export const PageSkeleton = ({ rows = 6 }) => (
    <>
        <style>{SHIMMER_STYLE}</style>
        <div className="flex flex-col gap-4 py-12 px-4">
            {Array.from({ length: rows }).map((_, i) => (
                <SkeletonBox key={i} className={`h-8 rounded-sm ${i % 3 === 0 ? "w-2/3" : "w-full"}`} />
            ))}
        </div>
    </>
);
