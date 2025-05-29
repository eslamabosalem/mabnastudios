'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import team4 from '/images/2.png';
import team5 from '/images/4.png';
import team6 from '/images/5.png';
import team7 from '/images/6.png';
import Navbar from '../Component/Layout/Navbar';

const images = [
  { id: 1, src: team4, alt: 'Elegant Villa with Pool' },
  { id: 2, src: team5, alt: 'Modern Apartment in City Center' },
  { id: 3, src: team6, alt: 'Cozy Family Home' },
  { id: 4, src: team7, alt: 'Luxury Penthouse with View' },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [animating, setAnimating] = useState(false);
  const imageWrapperRef = useRef(null);
  const thumbnailsRef = useRef([]);

  const changeImage = (img) => {
    if (animating || selectedImage.id === img.id) return;

    setAnimating(true);
    const wrapper = imageWrapperRef.current;

    gsap.to(wrapper, {
      x: -50,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        setSelectedImage(img);
        gsap.set(wrapper, { x: 50 });
        gsap.to(wrapper, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => setAnimating(false),
        });
      },
    });
  };

  useEffect(() => {
    if (!thumbnailsRef.current) return;

    gsap.fromTo(
      thumbnailsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.3,
      }
    );
  }, []);

  return (
    <>
  
    <Navbar />
    <div className="w-full mt-20 bg-gradient-to-br from-white via-[#fdf6e3] to-[#fff8e1] px-6 py-6 md:py-8 lg:py-12">
      <h1 className="text-center text-4xl md:text-5xl font-bold text-[#bfa14b] mb-12 tracking-wide">
        Explore Our Premium Properties
      </h1>

      <section className="flex flex-col lg:flex-row items-start gap-10 w-full max-w-screen-xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6 md:p-8 border border-[#f0e5c2]">
        <div
          ref={imageWrapperRef}
          className="relative w-full lg:flex-grow aspect-video rounded-xl overflow-hidden shadow-lg border border-[#e0c97a] bg-[#fdf6e3] will-change-transform opacity"
          style={{ backfaceVisibility: 'hidden', perspective: '1000px' }}
        >
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 60vw"
            className="object-cover"
            priority
            loading="eager"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white text-lg px-4 py-2 font-medium">
            {selectedImage.alt}
          </div>
        </div>

        <div className="flex lg:flex-col gap-6 overflow-x-auto lg:overflow-x-visible w-full lg:w-1/5" style={{ maxHeight: 'calc(60vh)' }}>
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => changeImage(img)}
              ref={(el) => (thumbnailsRef.current[index] = el)}
              className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition duration-300 ease-in-out flex-shrink-0 ${
                selectedImage.id === img.id
                  ? 'border-[#bfa14b] ring-2 ring-[#f1e4b3]'
                  : 'border-gray-200 hover:border-[#bfa14b]'
              }`}
              aria-label={`Show ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="96px"
                className="object-cover"
                priority={selectedImage.id === img.id}
                loading="eager"
              />
            </button>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
