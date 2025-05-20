"use client";
import { useState, useEffect } from "react";
import logo from "../../../../images/Logo.png";
import Image from 'next/image';
import { Switch, FormControlLabel } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function CustomNavbar({ toggleLanguage }) {

  const { t, i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const isArabic = i18n.language === "ar";
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode === "true") {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
        document.body.style.backgroundColor = "#242424";
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());

      if (newMode) {
        document.documentElement.classList.add("dark");
        document.body.style.backgroundColor = "#242424";
      } else {
        document.documentElement.classList.remove("dark");
        document.body.style.backgroundColor = "";
      }

      return newMode;
    });
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const toggleDropdown = () => {
    if (isMobile) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-[#242424] fixed left-0 right-0 top-0 z-50 shadow-md px-6 flex flex-wrap items-center justify-between py-2">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            className="w-[50px] lg:w-[40px] lg:py-2 md:mx-8 md:w-[50px]"
            alt="Logo"
          />
        </Link>

        <button
          className="md:hidden block text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={toggleDropdown}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className={`w-full mt-3 md:mt-0 md:w-auto md:flex md:items-center ${dropdownOpen || !isMobile ? 'block' : 'hidden'}`}>
            <div className={`relative group border-b border-b-slate-100 md:border-0 dark:border-hidden lg:mx-2 text-[#666] ${isArabic ? "font-cairo lg:mr-[40px] 2xl:mr-20 mt-1 md:mr-4 mr-2 lg:mx-8" : "font-montserrat lg:ml-16 md:ml-5"}`}>
             <Link
  href="#"
  className={`dark:text-white py-6   lg:mx-8 text-[#666] cursor-pointer relative group lg:pb-10  md-h transform skew-x-12
    after:content-[""] after:absolute after:w-[80%] after:h-0 after:mx-auto after:right-0 after:left-0
    after:transition-all after:duration-300
    md:hover:after:h-2 lg:hover:after:h-2
    after:bg-[#003540] after:rounded-t-lg
    after:bottom-[30px] lg:after:bottom-[10px]
    ${isArabic ? "font-cairo text-[#666] md:text-[12px] lg:text-[14px]" : "md:text-[12px] lg:text-[14px] font-montserrat"}`}
>
  SERVIES
  <i className={`fa-solid fa-chevron-down absolute md:block ${isArabic ? "right-[45px] md:top-2" : "ml-3 md:ml-14 md:top-1"} lg:mt-0 md:mt-0 top-1 mx-3 transform transition-transform ${isMobile ? (dropdownOpen ? 'rotate-180' : '') : 'group-hover:rotate-180'} text-[#666]`}></i>
</Link>

             
            </div>
            <div className={`relative group border-b  border-b-slate-100 md:border-0 dark:border-hidden lg:mx-2 text-[#666] ${isArabic ? "font-cairo lg:mr-[40px] 2xl:mr-20 mt-1 md:mr-4 mr-2 lg:mx-8" : "font-montserrat lg:ml-16 md:ml-5"}`}>
               <Link
  href="#"
  className={`dark:text-white lg:mx-8   py-6 text-[#666] cursor-pointer relative group lg:pb-10  md-h transform skew-x-12
    after:content-[""] after:absolute after:w-[80%] after:h-0 after:mx-auto after:right-0 after:left-0
    after:transition-all after:duration-300
    md:hover:after:h-2 lg:hover:after:h-2
    after:bg-[#003540] after:rounded-t-lg
    after:bottom-[30px] lg:after:bottom-[10px]
    ${isArabic ? "font-cairo text-[#666] md:text-[12px] lg:text-[14px]" : "md:text-[12px] lg:text-[14px] font-montserrat"}`}
>
 BLOG
  <i className={`fa-solid fa-chevron-down absolute md:block ${isArabic ? "right-[45px] md:top-2" : "ml-3 md:ml-14 md:top-1"} lg:mt-0 md:mt-0 top-1 mx-3 transform transition-transform ${isMobile ? (dropdownOpen ? 'rotate-180' : '') : 'group-hover:rotate-180'} text-[#666]`}></i>
</Link>

             
            </div>
            <div className={`relative group border-b border-b-slate-100 md:border-0 dark:border-hidden lg:mx-2 text-[#666] ${isArabic ? "font-cairo lg:mr-[40px] 2xl:mr-20 mt-1 md:mr-4 mr-2 lg:mx-8" : "font-montserrat lg:ml-16 md:ml-5"}`}>
                <Link
  href="#"
  className={`dark:text-white lg:mx-8 py-6  text-[#666] cursor-pointer relative group lg:pb-10  md-h transform skew-x-12
    after:content-[""] after:absolute after:w-[80%] after:h-0 after:mx-auto after:right-0 after:left-0
    after:transition-all after:duration-300
    md:hover:after:h-2 lg:hover:after:h-2
    after:bg-[#003540] after:rounded-t-lg
    after:bottom-[30px] lg:after:bottom-[10px]
    ${isArabic ? "font-cairo text-[#666] md:text-[12px] lg:text-[14px]" : "md:text-[12px] lg:text-[14px] font-montserrat"}`}
>
OUR WORK
  <i className={`fa-solid fa-chevron-down absolute md:block ${isArabic ? "right-[45px] md:top-2" : "ml-3 md:ml-14 md:top-1"} lg:mt-0 md:mt-0 top-1 mx-3 transform transition-transform ${isMobile ? (dropdownOpen ? 'rotate-180' : '') : 'group-hover:rotate-180'} text-[#666]`}></i>
</Link>

             
            </div>

         
          
          

            <div className="block md:hidden   md:mr-3 lg:mr-16 ">
              
              <div className={`border-b  border-b-slate-100 dark:border-hidden ${isArabic ? "font-cairo" : " font-montserrat"}`}>
                <FormControlLabel
                  control={
                    <Switch
                      className=""
                      checked={darkMode}
                      onChange={toggleDarkMode}
                      name="darkMode"
                      size="lg"
                    />
                  }
                />
              </div>
     
          </div>
        </div>

        <div className="hidden md:flex items-center">
    

          <FormControlLabel
            control={
              <Switch
                className={`${isArabic ? "ml-4 md:ml" : ""}`}
                checked={darkMode}
                onChange={toggleDarkMode}
                name="darkMode"
                size="small"
                sx={{
                  transform: "scale(1.3)",
                }}
              />
            }
          />
        </div>
      </nav>
    </>
  );
}