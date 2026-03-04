import React, { useState, useEffect } from 'react';
import { getPartnersPageData, FALLBACK_PARTNERS_DATA } from '../../api/partnersApi';

import HeroSection from './HeroSection';
import TierProgression from './TierProgression';
import ApplicationTimeline from './ApplicationTimeline';
import FeaturedPartners from './FeaturedPartners';
import CTASection from './CTASection';
import Footer from '../Footer/Footer';

/**
 * Partners — Elite Access Recruitment page.
 *
 * Architecture:
 * - Single data fetch here; all sections receive props (no repeated fetches)
 * - Graceful fallback if Strapi is unavailable
 * - Modular: each section is its own component
 */
function Partners() {
    const [data, setData] = useState(FALLBACK_PARTNERS_DATA);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPartnersPageData().then((res) => {
            setData(res);
            setLoading(false);
        });
    }, []);

    return (
        <div className="bg-[#060606] min-h-screen overflow-x-hidden">
            {/* 1 ── Cinematic Hero */}
            <HeroSection
                heroTitle={data.heroTitle}
                heroSubtitle={data.heroSubtitle}
                primaryButtonText={data.primaryButtonText}
                secondaryButtonText={data.secondaryButtonText}
            />

            {/* 2 ── Editorial Tier Progression */}
            <TierProgression
                tiersHeading={data.tiersHeading}
                tiers={data.tiers}
            />

            {/* 3 ── Application Timeline */}
            <ApplicationTimeline
                applicationHeading={data.applicationHeading}
                applicationSteps={data.applicationSteps}
                applicationNote={data.applicationNote}
            />

            {/* 4 ── Featured Partners (renders only if data exists) */}
            <FeaturedPartners featuredPartners={data.featuredPartners} />

            {/* 5 ── CTA */}
            <CTASection
                ctaTitle={data.ctaTitle}
                ctaButtonText={data.ctaButtonText}
                ctaLink={data.ctaLink}
            />

            <Footer />
        </div>
    );
}

export default Partners;