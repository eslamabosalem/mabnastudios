'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Switch, FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import logo from '../../../../images/Logo.png';

export default function Navbar({ toggleLanguage }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 1. Handle dark mode
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setDarkMode(true);
    document.documentElement.classList.add('dark');
  } else {
    setDarkMode(false);
    document.documentElement.classList.remove('dark');
  }
}, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  // 2. Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setDropdownOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 4. Toggle dropdown for mobile
  const toggleDropdown = () => {
    if (isMobile) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <nav
      ref={dropdownRef}
      className={`fixed w-full top-0 z-50 px-6 py-2 shadow-md transition-colors duration-300 ${
        darkMode ? 'bg-[#242424] text-white' : 'bg-white text-gray-800'
      }`}
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
              className={`${darkMode ? 'invert' : ''}`}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6">
          <NavLink href="/services" text={t('services')} darkMode={darkMode} />
          <NavLink href="/blog" text={t('blog')} darkMode={darkMode} />
          <NavLink href="/work" text={t('our_work')} darkMode={darkMode} />
        </div>

        {/* Language Toggle */}
      
        {/* Dark Mode Toggle (Desktop) */}
        <div className="hidden md:flex items-center">
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                color="primary"
              />
            }
            label={darkMode ? '🌙' : '☀️'}
            className="mx-2"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
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
            dropdownOpen
              ? 'max-h-96 opacity-100 py-2'
              : 'max-h-0 opacity-0 py-0'
          } ${
            darkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'
          }`}
        >
          <NavLink 
            href="/services" 
            text={t('services')} 
            mobile 
            darkMode={darkMode}
          />
          <NavLink 
            href="/blog" 
            text={t('blog')} 
            mobile 
            darkMode={darkMode}
          />
          <NavLink 
            href="/work" 
            text={t('our_work')} 
            mobile 
            darkMode={darkMode}
          />
          
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
         
            
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  color="primary"
                />
              }
              label={darkMode ? t('dark_mode') : t('light_mode')}
              className="ml-2"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

// NavLink Component
function NavLink({ href, text, mobile = false, darkMode }) {
  return (
    <Link
      href={href}
      className={`block px-4 py-3 transition-colors duration-200 ${
        mobile
          ? `${
              darkMode
                ? 'hover:bg-gray-700 text-white'
                : 'hover:bg-gray-100 text-gray-800'
            }`
          : `${
              darkMode
                ? 'hover:text-gray-300 text-gray-200'
                : 'hover:text-gray-600 text-gray-700'
            }`
      }`}
    >
      {text}
    </Link>
  );
}