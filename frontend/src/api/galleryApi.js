// Gallery images - using webp versions
import image1 from "../assets/shot2.1.webp"; // Shot 2.1 (Hero)
import image2 from "../assets/shot2.webp";   // Shot 2 (Alternative)
import image3 from "../assets/newassets/9.webp"; // Weapon 9
import image4 from "../assets/newassets/6.webp"; // Weapon 6
import image5 from "../assets/newassets/7.webp"; // Weapon 7
import image6 from "../assets/content1.webp"; // Content 1
import image7 from "../assets/content2.webp"; // Content 2
import image8 from "../assets/content3.webp"; // Content 3
import image9 from "../assets/content4.webp"; // Content 4
import image10 from "../assets/newassets/Mosin_Nagant_3.webp"; // Mosin
import image11 from "../assets/newassets/WINCHESTER1.webp"; // Winchester
import image12 from "../assets/newassets/colt 19111.webp"; // Colt
import image13 from "../assets/newassets/ice pick 3.webp"; // Ice Pick
import image14 from "../assets/newassets/p08_2.webp"; // Luger
import image15 from "../assets/newassets/trench_gun_3.webp"; // Trench Gun

/**
 * Orientation types:
 * - 'panoramic': Very wide images (aspect > 2.5)
 * - 'landscape': Wide images (aspect 1.3-2.5)
 * - 'square': Roughly equal dimensions (aspect 0.8-1.2)
 * - 'portrait': Tall images (aspect < 0.8)
 */
const galleryMedia = [
    { id: "media-01", name: "Combat Scene 1", image: image1, order: 1, orientation: "landscape" },
    { id: "media-02", name: "Combat Scene 2", image: image2, order: 2, orientation: "landscape" },
    { id: "media-03", name: "Character Detail", image: image3, order: 3, orientation: "portrait" },
    { id: "media-04", name: "Character Action", image: image4, order: 4, orientation: "portrait" },
    { id: "media-05", name: "Environment 1", image: image5, order: 5, orientation: "square" },
    { id: "media-06", name: "Gameplay 1", image: image6, order: 6, orientation: "landscape" },
    { id: "media-07", name: "Gameplay 2", image: image7, order: 7, orientation: "landscape" },
    { id: "media-08", name: "Gameplay 3", image: image8, order: 8, orientation: "landscape" },
    { id: "media-09", name: "Gameplay 4", image: image9, order: 9, orientation: "panoramic" },
    { id: "media-10", name: "Mosin Nagant", image: image10, order: 10, orientation: "portrait" },
    { id: "media-11", name: "Winchester", image: image11, order: 11, orientation: "landscape" },
    { id: "media-12", name: "Colt 1911", image: image12, order: 12, orientation: "square" },
    { id: "media-13", name: "Ice Pick", image: image13, order: 13, orientation: "portrait" },
    { id: "media-14", name: "P08 Luger", image: image14, order: 14, orientation: "square" },
    { id: "media-15", name: "Trench Gun", image: image15, order: 15, orientation: "portrait" }
];

export const getGalleryMedia = () => {
    // Sort by order to ensure consistency
    return [...galleryMedia].sort((a, b) => a.order - b.order);
};
