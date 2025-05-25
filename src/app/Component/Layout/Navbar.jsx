'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import logo from '../../../../images/Logo.png';

export default function Navbar({ toggleLanguage }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setDropdownOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dropdown for mobile
  const toggleDropdown = () => {
    if (isMobile) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <nav
      ref={dropdownRef}
      className="fixed w-full top-0 z-50 px-6 py-2 shadow-md bg-[#242424] text-white transition-colors duration-300"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center justify-between md:justify-start gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="z-50">
            <Image
              src={logo}
              width={40}
              height={60}
              alt="Logo"
              className="invert"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6">
          <NavLink href="/services" text={t('services')} />
          <NavLink href="/blog" text={t('blog')} />
          <NavLink href="/work" text={t('our_work')} />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-700"
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
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobile && (
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            dropdownOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
          } bg-[#2d2d2d]`}
        >
          <NavLink href="/services" text={t('services')} mobile />
          <NavLink href="/blog" text={t('blog')} mobile />
          <NavLink href="/work" text={t('our_work')} mobile />
        </div>
      )}
    </nav>
  );
}

// NavLink Component
function NavLink({ href, text, mobile = false }) {
  return (
    <Link
      href={href}
      className={`block px-4 py-3 transition-colors duration-200 ${
        mobile
          ? 'hover:bg-gray-700 text-white'
          : 'hover:text-gray-300 text-white'
      }`}
    >
      {text}
    </Link>
  );
}
