"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

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
    interval: 4000,
  },
  {
    title: "Find Your Dream Home with Us",
    description: "We help you locate the perfect home for your needs.",
    images: [team5, team6, team7, team8],
    interval: 4000,
  },
  {
    title: "Exclusive Properties at Best",
    description: "Get access to premium properties at competitive prices.",
    images: [team9, team10, team11, team12],
    interval: 4000,
  },
];

function ImageWithArrows({ images, title, description, interval, link }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const intervalRef = useRef(null);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);
  }, [images.length, interval]);

  const prevImage = useCallback(() => {
    startInterval();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length, startInterval]);

  const nextImage = useCallback(() => {
    startInterval();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length, startInterval]);

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
    <div className="relative">
      <div
        className="relative w-full md:my-10 mx-auto rounded-lg overflow-hidden"
        style={{ height: 400 }}
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

        {/* الرابط على النص فقط */}
        <a href={link} className="absolute inset-0">
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white px-4 py-3 cursor-pointer">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm line-clamp-3">{description}</p>
          </div>
        </a>

        {/* السهم الأيسر */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all"
          aria-label="Previous Image"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-white/80" />
        </button>

        {/* السهم الأيمن */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all"
          aria-label="Next Image"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faArrowRight} className="text-2xl text-white/80" />
        </button>
      </div>
    </div>
  );
}

export default function Slider() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 50 },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const links = ["/gallery", "/gallery", "/gallery"];

  return (
    <div className="my-18">
      <section className="py-8 px-4 md:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">OUR SERVICES</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          {sliderData.map((section, idx) => (
            <div
              key={idx}
              className="rounded-xl p-4 dark:text-white block"
              ref={(el) => (sectionsRef.current[idx] = el)}
            >
              <ImageWithArrows
                images={section.images}
                title={section.title}
                description={section.description}
                interval={section.interval}
                link={links[idx]}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
