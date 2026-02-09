import React from "react";
import Slider from "react-slick";
import Banner1 from "../../assets/shot1.mp4";
import Banner2Img from "../../assets/newassets/WINCHESTER1.png";
import Banner3 from "../../assets/newassets/GUN5.png";
import Banner4 from "../../assets/newassets/7.png";
import Banner5 from "../../assets/newassets/2.mp4";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const banners = [
  { type: "video", src: Banner1 },
  { type: "image", src: Banner2Img },
  { type: "image", src: Banner3 },
  { type: "image", src: Banner4 },
  { type: "video", src: Banner5 }
];

const Banner2 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: false,
    cssEase: "ease-in-out",
  };

  return (
    <div className="w-full bg-black py-10">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <Slider {...settings}>
          {banners.map((item, i) => (
            <div key={i} className="px-1 sm:px-2">
              <div className="overflow-hidden rounded-2xl shadow-2xl relative group">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full object-cover 
                      h-[200px] sm:h-[300px] md:h-[450px] lg:h-[600px] 
                      transition-all duration-1000 ease-in-out"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={`Slide ${i + 1}`}
                    className="w-full object-cover 
                      h-[200px] sm:h-[300px] md:h-[450px] lg:h-[600px] 
                      transform scale-110 group-hover:scale-105 
                      transition-transform duration-[5000ms] ease-in-out"
                  />
                )}

                {/* Optional overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner2;
