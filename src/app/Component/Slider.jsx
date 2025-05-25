"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import team1 from "../../../images/1 (1).png";
import team2 from "../../../images/1 (6).png";
import team3 from "../../../images/1-1.png";
import team4 from "../../../images/2.png";
import team5 from "../../../images/4.png";
import team6 from "../../../images/5.png";
import team7 from "../../../images/6.png";
import team8 from "../../../images/9.png";
import team9 from "../../../images/10.png";
import team10 from "../../../images/11.png";
import team11 from "../../../images/44.png";
import team12 from "../../../images/2222.png";



const sliderData = [
  {
    title: "Estate for Sale and Purchase",
    description: "Find amazing properties to buy or sell easily.",
    images: [team1, team2, team3, team4],
    interval: 3000,
  },
  {
    title: "Find Your Dream Home with Us",
    description: "We help you locate the perfect home for your needs.",
    images: [team5, team6, team7, team8],
    interval: 4000,
  },
  {
    title: "Exclusive Properties at Best ",
    description: "Get access to premium properties at competitive prices.",
    images: [team9, team10, team11, team12],
    interval: 5000,
  },
];

function ImageWithArrows({ images, title, description, interval }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(null);
  const intervalRef = useRef(null);

  // الكشف عن الأجهزة المحمولة
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  // إدارة الفاصل الزمني
  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      setShowOverlay(false);
    }, interval);
  }, [images.length, interval]);

  // التحكم في السلايدر
  const prevImage = useCallback(() => {
    startInterval();
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    setShowOverlay(false);
  }, [images.length, startInterval]);

  const nextImage = useCallback(() => {
    startInterval();
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    setShowOverlay(false);
  }, [images.length, startInterval]);

  // إدارة اللمس
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
    
    touchStartX.current = null;
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  return (
    <div className="relative group">
      {/* عنوان القسم */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
        {title}
      </h2>

      <div
        className="relative w-full  my-10 mx-auto rounded-lg overflow-hidden cursor-pointer"
        style={{ height: 400 }}
        onMouseEnter={() => !isMobile && setShowOverlay(true)}
        onMouseLeave={() => !isMobile && setShowOverlay(false)}
        onClick={() => isMobile && setShowOverlay(prev => !prev)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Image ${index}`}
            fill
            className={`object-cover transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Overlay مع تأثيرات متقدمة */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 transition-all duration-300 ${
            showOverlay ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-white space-y-2">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm line-clamp-3">{description}</p>
          </div>
        </div>

        {/* الأزرار مع تحسينات لللمس */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 rounded-full backdrop-blur-sm hover:bg-white/50 transition-all"
        >
          <span className="text-2xl">‹</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full backdrop-blur-sm hover:bg-white/50 transition-all"
        >
          <span className="text-2xl">›</span>
        </button>
      </div>
    </div>
  );
}

export default function Slider() {
  return (
    <> <div className=" my-20">
    <section className="py-12 px-4 md:px-8 ">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        OUR SERVIES
      </h1>
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto">
        {sliderData.map((section, idx) => (
          <div key={idx} className=" dark:bg-gray-800 rounded-xl  p-4 dark:text-white ">
            <ImageWithArrows
              images={section.images}
              title={section.title}
              description={section.description}
              interval={section.interval}
            />
          </div>
        ))}
      </div>
    </section>
        </div>
    </>
  );
}