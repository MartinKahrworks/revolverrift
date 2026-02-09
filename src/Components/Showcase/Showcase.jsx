import { useState } from "react";
import GunsShowcase from "./GunsShowcase";

import image6 from "../../assets/shot2.1.webp";
import image7 from "../../assets/shot2.webp";
import image8 from "../../assets/newassets/9.webp";
import image9 from "../../assets/newassets/2.webp";
import image10 from "../../assets/newassets/6.webp";
import bgImage from "../../assets/Texturelabs_Grunge_353M.webp";

const Showcase = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (img) => setSelectedImage(img);
  const closeModal = () => setSelectedImage(null);

  const imageClass =
    "w-full object-cover h-48 sm:h-64  rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer";

  return (
    <section
      className="relative w-screen min-h-screen py-40 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})`,backgroundAttachment: "fixed", }}
    >
      {/* First Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[image6, image7, image8].map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`image-${idx}`}
            onClick={() => handleImageClick(img)}
            className={imageClass}
          />
        ))}
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[image9, image10].map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`image-${idx + 3}`}
            onClick={() => handleImageClick(img)}
            className={imageClass}
          />
        ))}
      </div>

      {/* Guns showcase */}
      <GunsShowcase />

      {/* Modal */}
      {selectedImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-[95%] max-h-[90vh] rounded-lg shadow-lg transition-transform duration-300"
          />
        </div>
      )}
    </section>
  );
};

export default Showcase;
