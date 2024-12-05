
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#CB9DF0] py-4 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center text-white font-bold text-xl">
          <svg
            className="w-10 h-10 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
              fill="currentColor"
            />
            <path
              d="M12 6C10.34 6 9 7.34 9 9C9 10.66 10.34 12 12 12C13.66 12 15 10.66 15 9C15 7.34 13.66 6 12 6ZM12 10C11.45 10 11 9.55 11 9C11 8.45 11.45 8 12 8C12.55 8 13 8.45 13 9C13 9.55 12.55 10 12 10Z"
              fill="currentColor"
            />
          </svg>
          بازار المبدعات
        </Link>

        <div className="lg:flex items-center space-x-6 text-white hidden">
          <Link to="/" className="hover:text-[#F0C1E1] transition-colors duration-300">
            الرئيسية
          </Link>
          <Link to="/products" className="hover:text-[#F0C1E1] transition-colors duration-300">
            المنتجات
          </Link>
          <Link to="/providerDashboard" className="hover:text-[#F0C1E1] transition-colors duration-300">
            الملف الشخصي 
          </Link>
          <Link to="/contact" className="hover:text-[#F0C1E1] transition-colors duration-300">
            تواصل معنا وقيمنا
          </Link>

             <Link to="/driver-application" className="hover:text-[#F0C1E1] transition-colors duration-300">
            انضم كسائق
          </Link>


          <Link to="/login" className="bg-[#8B4093] px-4 py-2 rounded-md hover:bg-[#A050A8] transition-colors duration-300">
            تسجيل الدخول
          </Link>
        </div>

        <button
          className="lg:hidden block text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-[#CB9DF0] py-4 shadow-md">
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            <Link to="/" className="hover:text-[#F0C1E1] transition-colors duration-300">
              الرئيسية
            </Link>
            <Link to="/products" className="hover:text-[#F0C1E1] transition-colors duration-300">
              المنتجات
            </Link>
            <Link to="/providerDashboard" className="hover:text-[#F0C1E1] transition-colors duration-300">
              الملف الشخصي 
            </Link>
            <Link to="/about" className="hover:text-[#F0C1E1] transition-colors duration-300">
              من نحن
            </Link>
            <Link to="/newsletter" className="hover:text-[#F0C1E1] transition-colors duration-300">
              تواصل معنا وقيمنا
            </Link>
            
            <Link to="/login" className="bg-[#8B4093] px-4 py-2 rounded-md hover:bg-[#A050A8] transition-colors duration-300">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;