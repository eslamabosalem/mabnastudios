
"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import logo from "../../../../images/2222.png";
import logo1 from "../../../../images/1 (5).png";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          duration: 0.8,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

const blogPosts = [
  {
    title: "Innovative Residential Designs for Modern Living",
    excerpt: "Discover how our cutting-edge architectural solutions create comfortable and sustainable living spaces tailored for today’s homeowners.",
    image: logo
  },
  {
    title: "Revolutionizing Shared Amenities in Real Estate",
    excerpt: "Our latest developments focus on creating vibrant community spaces that enhance lifestyle and foster social connections among residents.",
    image: logo1
  }
];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-center mb-18 text-gray-900 dark:text-white"
        >
          Real Estate Designs
        </h2>

        <div className="space-y-16">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className={`group duration-300 flex flex-col md:flex-row ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              } items-center gap-8`}
            >
              <div className="w-full md:w-1/2 overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt="Blog Image"
                  width={700}
                  height={300}
                  className="w-[700px] h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-[#C6530C]">
                  {post.title}
                </h3>
                <p className="text-[#290000] mb-6 dark:text-white ">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
