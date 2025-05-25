"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

import arrow from "../../../../images/btn-arrow.svg";
import whiteArrow from "../../../../images/whiteArrow.svg";

import { useTranslation } from "react-i18next";
import CustomNavbar from "../Layout/Navbar";

export default function HomeHero() {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0); // شغل الفيديو أولاً بدون تأخير
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isRTL, setIsRTL] = useState(i18n.language === "ar");
  const [isMobilePlaying, setIsMobilePlaying] = useState(true); // خلي الموبايل يبدأ التشغيل تلقائياً
  const videoRef = useRef(null);

  const sections = [
    {
      video: "/video/Architectural 2.mp4",
      title: "Discover Your Dream Property",
      description:
        "Explore a wide range of properties for sale and rent with the best deals and competitive prices.",
      btn: "Browse Properties",
      to: "services",
    },
    {
      video: "/video/Architectural 1.mp4",
      title: "Find Your Perfect Home Easily",
      description:
        "Find the ideal home for you and your family in various neighborhoods with options to fit every budget.",
      btn: "Search Now",
      to: "services/3",
    },
  ];

  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  // GSAP animation
  useEffect(() => {
    if (activeIndex !== null) {
      gsap.fromTo(
        ".text-animate",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [activeIndex]);

  // تشغيل الفيديو فوراً وبدون تأخير
  useEffect(() => {
    if (videoRef.current && activeIndex !== null) {
      const video = videoRef.current;
      const newSrc = sections[activeIndex].video;
      const currentSrc = video.currentSrc || video.src;

      if (!currentSrc.includes(newSrc)) {
        video.pause();
        video.src = newSrc;
        video.load();
        video.oncanplay = () => {
          video.play().catch(() => {
            // بعض المتصفحات تحجب التشغيل التلقائي بدون تفاعل، خاصة iOS
          });
          setIsMobilePlaying(true);
        };
      } else {
        video.play().catch(() => {});
        setIsMobilePlaying(true);
      }
    }
  }, [activeIndex]);

  // handlers
  const handleMouseEnter = (index) => {
    if (window.innerWidth >= 1024) {
      // فقط على الديسكتوب
      setActiveIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setActiveIndex(0);
    }
  };

  // تشغيل/إيقاف الفيديو في الموبايل عند الضغط
  const toggleMobilePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsMobilePlaying(true);
    } else {
      videoRef.current.pause();
      setIsMobilePlaying(false);
    }
  };

  // تغيير الفيديو في الموبايل بسهم
  const nextVideo = () => {
    setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % sections.length));
    setIsMobilePlaying(false);
  };
  const prevVideo = () => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev - 1 + sections.length) % sections.length
    );
    setIsMobilePlaying(false);
  };

  // progress bar style (الديسكتوب)
  const calculateProgressPosition = () => {
    const width = `${100 / sections.length}%`;
    const position = `${(100 / sections.length) * (activeIndex ?? 0)}%`;

    return isRTL
      ? { width, right: position, left: "auto" }
      : { width, left: position, right: "auto" };
  };

  return (
    <>
      {/* Desktop Hero */}
      <CustomNavbar />
      <div className="relative w-full h-[700px] hidden lg:flex items-center justify-center overflow-hidden">
        {/* الفيديو */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          key={sections[activeIndex]?.video || "empty"}
        >
          {activeIndex !== null && (
            <source src={sections[activeIndex].video} type="video/mp4" />
          )}
          المتصفح لا يدعم تشغيل الفيديو.
        </video>

        {/* طبقة التعتيم السوداء الشفافة */}
        <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>

        {/* المحتوى النصي مع الأزرار تحت النص وعلى الشمال */}
        <div
          className={`absolute inset-0 flex ps-20 pe-36 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {sections.map((section, index) => (
            <div
              key={index}
              className="flex-1 h-full cursor-pointer relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {activeIndex === index && (
                <div className="absolute inset-0 flex flex-col items-start top-36 text-white lg:w-[400px] transition-opacity duration-500 opacity-100 font-cairo text-animate">
                  <h1 className="leading-[70px] text-[38px] font-[900]">
                    {section.title}
                  </h1>
                  <p className="text-[16px] font-[500] mt-[20px] mb-6">
                    {section.description}
                  </p>

                  {/* زرار في صف جديد تحت النص وعلى الشمال */}
                  <div className="w-full flex justify-start">
                    <Link href={`/${section.to}`}>
                      <button
                        className="font-cairo flex items-center px-4 py-4 rounded-[10px] bg-[#1E3A8A] text-white hover:bg-[#F59E0B] hover:text-[#1E3A8A] transition-all duration-300 max-w-[220px]"
                        onMouseEnter={() => setHoveredButton(index)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        {section.btn}
                        <span className="ms-3">
                          <Image
                            src={hoveredButton === index ? whiteArrow : arrow}
                            alt="arrow"
                            width={20}
                            height={20}
                          />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-10 w-full flex justify-center">
          <div className="w-11/12 h-3 bg-white rounded-full relative overflow-hidden">
            <div
              className="absolute h-3 bg-[#333] rounded-full transition-all duration-500"
              style={calculateProgressPosition()}
            ></div>
          </div>
        </div>
      </div>

      {/* Mobile Hero */}
      <div className="block lg:hidden relative w-full h-[300px] bg-black">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          key={sections[activeIndex ?? 0].video}
          onClick={toggleMobilePlay}
          autoPlay
          controls={false} // إخفاء تحكم الفيديو الافتراضي على الموبايل
          preload="auto"
          webkit-playsinline="true"
          playsInline
          // هذه الخصائص تساعد على تشغيل الفيديو تلقائيًا على iOS
        >
          <source src={sections[activeIndex ?? 0].video} type="video/mp4" />
          المتصفح لا يدعم تشغيل الفيديو.
        </video>

        {/* أزرار السهم للتنقل */}
        <button
          onClick={prevVideo}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-[#333] bg-opacity-50 rounded-full p-2 text-white"
          aria-label="Previous Video"
        >
          &#9664;
        </button>
        <button
          onClick={nextVideo}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#333] bg-opacity-50 rounded-full p-2 text-white"
          aria-label="Next Video"
        >
          &#9654;
        </button>

        {/* النقاط */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {sections.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === (activeIndex ?? 0) ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => {
                setActiveIndex(idx);
                setIsMobilePlaying(true);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between text-[11px] lg:text-lg bg-[#333] py-7 text-white text-base px-6">
        <span className="flex-1 text-center  ">Trending Topics</span>
        <span>|</span>
        <span className="flex-1 text-center">2025 Workplace Trends</span>
        <span>|</span>
        <span className="flex-1 text-center">Design for Preparedness</span>
        <span>|</span>
        <span className="flex-1 text-center">Ask the Experts</span>
      </div>
    </>
  );
}
