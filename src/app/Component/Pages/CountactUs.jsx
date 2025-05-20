"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(formRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.5")
      .from(infoRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  const goldColor = "#F59E0B";

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900"
      id="contact"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-16" ref={headingRef}>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or want to discuss a project? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            ref={formRef}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl"
          >
            <form>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>sh
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

             <button
  type="submit"
  className="w-full bg-[#F59E0B] hover:bg-[#b3942d] text-white font-medium py-3 px-6 rounded-lg transition duration-300"
>
  Send Message
</button>

            </form>
          </div>

          {/* Contact Info */}
          <div
            ref={infoRef}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl "
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div
                  className="flex-shrink-0 p-3 rounded-full"
                  style={{ backgroundColor: "#FFF5CC" }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke={goldColor}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4
                    className="text-lg font-medium text-gray-900 dark:text-white"
                    style={{ color: goldColor }}
                  >
                    Address
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    123 Business Ave, Suite 456
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className="flex-shrink-0 p-3 rounded-full"
                  style={{ backgroundColor: "#FFF5CC" }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke={goldColor}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4
                    className="text-lg font-medium text-gray-900 dark:text-white"
                    style={{ color: goldColor }}
                  >
                    Phone
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    +20 12-808-86588
                    <br />
                    +20 12-030-32307
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className="flex-shrink-0 p-3 rounded-full"
                  style={{ backgroundColor: "#FFF5CC" }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke={goldColor}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4
                    className="text-lg font-medium text-gray-900 dark:text-white"
                    style={{ color: goldColor }}
                  >
                    Email
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    yousefabosalem15@gmail.com
                  </p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-8 flex space-x-6">
                <a href="#" aria-label="Facebook" className="hover:text-yellow-500" style={{ color: goldColor }}>
                  <FaFacebookF size={24} />
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-yellow-500" style={{ color: goldColor }}>
                  <FaTwitter size={24} />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-yellow-500" style={{ color: goldColor }}>
                  <FaInstagram size={24} />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-yellow-500" style={{ color: goldColor }}>
                  <FaLinkedinIn size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
