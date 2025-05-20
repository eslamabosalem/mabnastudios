"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

gsap.registerPlugin(MorphSVGPlugin, Physics2DPlugin);

export default function ScrollVideo() {
  const videoRef = useRef(null);
  const pathRef = useRef(null);
  const buttonRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const playPath =
    "M3.5 5L3.50049 3.9468C3.50049 3.177 4.33382 2.69588 5.00049 3.08078L20.0005 11.741C20.6672 12.1259 20.6672 13.0882 20.0005 13.4731L17.2388 15.1412L17.0055 15.2759M3.50049 8L3.50049 21.2673C3.50049 22.0371 4.33382 22.5182 5.00049 22.1333L14.1192 16.9423L14.4074 16.7759";

  const pausePath =
    "M15.5004 4.05859V5.0638V5.58691V8.58691V15.5869V19.5869V21.2549M8.5 3.96094V10.3721V17V19L8.5 21";

  const toggleVideo = () => {
    if (!videoRef.current) return;

    // Morph animation
    gsap.to(pathRef.current, {
      duration: 0.5,
      morphSVG: {
        shape: isPlaying ? playPath : pausePath,
        type: "rotational",
        map: "complexity",
      },
      ease: "power4.inOut",
    });

    // Play/Pause the video
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    // Trigger confetti on click
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const dotCount = gsap.utils.random(15, 30, 1);
    const colors = ["#0ae448", "#abff84", "#fffce1"];

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");

      document.body.appendChild(dot);

      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      gsap.set(dot, {
        backgroundColor: gsap.utils.random(colors),
        top: y,
        left: x,
        position: "fixed",
        width: 8,
        height: 8,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        scale: 0,
      });

      gsap
        .timeline({
          onComplete: () => dot.remove(),
        })
        .to(dot, {
          scale: gsap.utils.random(0.3, 1),
          duration: 0.3,
          ease: "power3.out",
        })
        .to(
          dot,
          {
            duration: 2,
            physics2D: {
              velocity: gsap.utils.random(500, 1000),
              angle: gsap.utils.random(0, 360),
              gravity: 1500,
            },
            autoAlpha: 0,
            ease: "none",
          },
          "<"
        );
    }
  };

  return (
    <div className="relative h-[60vh] overflow-hidden group">
      <video
        ref={videoRef}
        src="/video/Architectural 1.mp4"
        autoPlay
        muted
        loop
        className="w-full h-[500px]   object-cover rounded-5xl"
      />

      {/* زر التشغيل والإيقاف بتأثير morph و confetti */}
      <button
        ref={buttonRef}
        onClick={toggleVideo}
        className="absolute bottom-6 right-6 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
        aria-label={isPlaying ? "إيقاف الفيديو" : "تشغيل الفيديو"}
      >
        <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth="2">
          <path
            ref={pathRef}
            d={pausePath}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
