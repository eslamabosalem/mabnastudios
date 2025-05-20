"use client";

import { useState } from "react";
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

const data = [
  {
    title: "Section 1",
    images: [team1, team2, team3, team4],
    overlayText: " Estate for Sale and Purchase",
  },
  {
    title: "Section 2",
    images: [team5, team6, team7, team8],
    overlayText: "Find Your Dream Home with Us",
  },
  {
    title: "Section 3",
    images: [team9, team10, team11, team12],
    overlayText: "Exclusive Properties at Best Prices",
  },
];

function ImageWithArrows({ images, overlayText }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
 return (
  <>
    
    <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden group cursor-pointer">
         
      {/* الصورة */}
      <Image
        src={images[currentIndex]}
        alt={`Image ${currentIndex}`}
        width={500}
        height={250}
        className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-110"
      />

      {/* Layer الشفافة */}
      <div
        className="
          absolute inset-0
         hover:bg-opacity-10 hover:bg-[#3333]
          transition-all duration-500 ease-in-out
          group-hover:bg-opacity-20
          z-10
          flex items-center justify-center
          px-4
        "
      >
        {/* النص */}
        <span className="
          text-white font-semibold text-center text-[16px]
          opacity-0 transform translate-y-4
          transition-all duration-500 ease-in-out
          group-hover:opacity-100 group-hover:translate-y-0
        ">
          {overlayText}
        </span>
      </div>

      {/* الأسهم */}
      <button
        onClick={prevImage}
        aria-label="Previous Image"
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#333] bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 z-30"
      >
        &#8592;
      </button>

      <button
        onClick={nextImage}
        aria-label="Next Image"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#333] bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 z-30"
      >
        &#8594;
      </button>
    </div>
        </>
  );
}

export default function Slider() {
  return (
    <>
     <h1
        className="text-4xl md:text-5xl font-bold text-center mb-18 md:mt-18 text-gray-900 dark:text-white"
      >
        OUR Work
      </h1>
    <div className="flex flex-col md:flex-row justify-center gap-6 max-w-7xl mx-auto p-6 mb-22">
     
      {data.map((section, idx) => (
        <div key={idx} className="flex-1">
          <h2 className="mb-4 text-[9px] font-bold text-center z-50 text-white">{section.title}</h2>
          <ImageWithArrows images={section.images} overlayText={section.overlayText} />
        </div>
      ))}
    </div>
  </>
  );

}