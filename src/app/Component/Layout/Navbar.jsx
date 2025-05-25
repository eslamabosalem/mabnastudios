"use client";
import { useState, useEffect, useRef } from "react";
import logo from "../../../../images/Logo.png";
import Image from "next/image";
import { Switch, FormControlLabel } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function CustomNavbar({ toggleLanguage }) {
  const { t, i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const isArabic = i18n.language === "ar";
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 1. إدارة حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setDropdownOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. إدارة النقر خارج القائمة
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. إدارة الوضع الداكن
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
      document.documentElement.classList.toggle("dark", savedMode === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  // 4. تحسين القائمة المنسدلة
  const toggleDropdown = () => {
    if (isMobile) setDropdownOpen((prev) => !prev);
  };

  return (
    <nav
      className=" bg-white dark:bg-[#242424] shadow-md fixed w-full top-0 z-50 px-6 py-2"
      ref={dropdownRef}
    >
      <div className="flex items-center justify-between md:justify-start gap-4">
        {/* اللوجو على الشمال */}
        <div className="flex-shrink-0">
          <Link href="/" className="z-50">
            <Image
              src={logo}
              width={40}
              height={60}
              alt="Logo"
              className="dark:invert"
            />
          </Link>
        </div>

        {/* المحتوى في الوسط للشاشات الكبيرة */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6">
          <NavLink href="#" text="Services" isMobile={false} />
          <NavLink href="#" text="Blog" isMobile={false} />
          <NavLink href="#" text="Our Work" isMobile={false} />
        </div>

        {/* زر القائمة للجوال */}
        <button
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          onClick={toggleDropdown}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* مفتاح الوضع الداكن على اليمين في الشاشات الكبيرة */}
        <div className="hidden md:flex flex-shrink-0">
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                color="primary"
                sx={{ m: 1 }}
              />
            }
            label={darkMode ? "🌙" : "☀️"}
            className="dark:text-white"
          />
        </div>
      </div>

      {/* القائمة المنسدلة للجوال مع روابط ومفتاح الوضع الداكن */}
      {isMobile && (
        <div
          className={`absolute top-full left-0 right-0 bg-white dark:bg-[#242424] shadow-lg transition-all duration-300 ${
            dropdownOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <NavLink href="#" text="Services" isMobile={true} />
          <NavLink href="#" text="Blog" isMobile={true} />
          <NavLink href="#" text="Our Work" isMobile={true} />

          {/* مفتاح الوضع الداكن داخل القائمة */}
          <div className="px-4 py-3 border-t border-gray-300 dark:border-gray-700 flex items-center justify-start">
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  color="primary"
                  sx={{ m: 1 }}
                />
              }
              label={darkMode ? "🌙" : "☀️"}
              className="dark:text-white"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

// مكون مساعد لعناصر التنقل
const NavLink = ({ href, text, isMobile }) => (
  <Link
    href={href}
    className={`px-4 py-3 block md:inline-block ${
      isMobile
        ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
    } transition-colors`}
  >
    {text}
  </Link>
);
