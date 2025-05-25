'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import team1 from "../../../../images/team1.jpg";
import team2 from "../../../../images/team2.jpg";
import team3 from "../../../../images/team3.jpg";
import team4 from "../../../../images/team4 (2).jpg";
import team5 from "../../../../images/team4.jpg";
import team6 from "../../../../images/team7.jpg";
import team7 from "../../../../images/team6.jpg";


const teamMembers = [
  { name: "Emily Kim", role: "Founder", image: team1 },
  { name: "Michael Steward", role: "Creative Director", image: team2 },
  { name: "Emma Rodriguez", role: "Lead Developer", image: team3 },
  { name: "Julia Gimmel", role: "UX Designer", image: team4 },
  { name: "Lisa Anderson", role: "Marketing Manager", image: team5 },
  { name: "James Wilson", role: "Product Manager", image: team6 },


  { name: "James Wilson", role: "Product Manager", image: team7 },
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Ref to store the latest currentIndex for event listener
  const currentIndexRef = useRef(currentIndex);

  // Keep ref updated with currentIndex
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const updateCarousel = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const index = (newIndex + teamMembers.length) % teamMembers.length;
    setCurrentIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        updateCarousel(currentIndexRef.current + 1);
      } else {
        updateCarousel(currentIndexRef.current - 1);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        updateCarousel(currentIndexRef.current - 1);
      } else if (e.key === "ArrowRight") {
        updateCarousel(currentIndexRef.current + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Empty deps, so event added only once

  return (
    <div className="relative w-full max-w-5xl mt-18 mb-18 mx-auto h-[500px] overflow-hidden">
      <h1
        className="text-4xl md:text-5xl font-bold text-center mb-16  dark:text-white"
      >
        OUR TEAM
      </h1>

      {/* Carousel container */}
      <div className="relative h-64">
        {teamMembers.map((member, i) => {
          const offset = (i - currentIndex + teamMembers.length) % teamMembers.length;
           let positionClass = 'TeamCarouselhidden';

          if (offset === 0) {
            positionClass = 'TeamCarouselcenter';
          } else if (offset === 1) {
            positionClass = 'TeamCarouselright-1';
          } else if (offset === 2) {
            positionClass = 'TeamCarouselright-2';
          } else if (offset === teamMembers.length - 1) {
            positionClass = 'TeamCarouselleft-1';
          } else if (offset === teamMembers.length - 2) {
            positionClass = 'TeamCarouselleft-2';
          }


          return (
            <div
              key={i}
              className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${positionClass}`}
              onClick={() => updateCarousel(i)}
            >
              <div className="relative w-60 h-[300px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* Team member info */}
      <div className="text-center mb-17 mt-15">
        <h2
          className="text-3xl font-bold transition-opacity duration-300"
          style={{ opacity: isAnimating ? 0 : 1 }}
        >
          {teamMembers[currentIndex].name}
        </h2>
        <p
          className="text-xl  dark:text-white transition-opacity duration-300"
          style={{ opacity: isAnimating ? 0 : 1 }}
        >
          {teamMembers[currentIndex].role}
        </p>
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2  p-2 rounded-full shadow-md z-10"
        onClick={() => updateCarousel(currentIndex - 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2   p-2 rounded-full shadow-md z-10"
        onClick={() => updateCarousel(currentIndex + 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots navigation */}
      <div className="flex justify-center  space-x-2 ">
        {teamMembers.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-black' : 'bg-gray-400'}`}
            onClick={() => updateCarousel(i)}
          />
        ))}
      </div>

      {/* Touch events */}
      <div
        className="absolute inset-0"
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          setTouchEndX(e.changedTouches[0].clientX);
          handleSwipe();
        }}
      />
    </div>
  );
}
