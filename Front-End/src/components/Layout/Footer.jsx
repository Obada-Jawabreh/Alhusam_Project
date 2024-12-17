import React from 'react';
import { Link } from 'react-router-dom';
import customLogo from "../../../public/image/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-700 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="text-right">
            <div className="flex items-center mb-4">
              <img src={customLogo} alt="منصة تسويق" className="w-12 h-12 ml-3" />
              <h3 className="text-xl font-bold">منصة تسويق</h3>
            </div>
            <p className="text-sm leading-relaxed">
              منصة متخصصة لدعم الإبداع النسائي، نجمع بين الموهبة والفن والأعمال اليدوية
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-200 transition-colors">الرئيسية</Link></li>
              <li><Link to="/products" className="hover:text-blue-200 transition-colors">المنتجات</Link></li>
              <li><Link to="/cart" className="hover:text-blue-200 transition-colors">سلة المنتجات</Link></li>
              <li><Link to="/driver-application" className="hover:text-blue-200 transition-colors">انضم كسائق</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-right">
            <h4 className="font-bold mb-4">خدمة العملاء</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-blue-200 transition-colors">تواصل معنا</Link></li>
              <li><Link to="/about" className="hover:text-blue-200 transition-colors">من نحن</Link></li>
              <li><Link to="/terms" className="hover:text-blue-200 transition-colors">الشروط والأحكام</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-200 transition-colors">سياسة الخصوصية</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-right">
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">البريد الإلكتروني:</span>{' '}
                <a href="mailto:info@marketing-platform.com" className="hover:text-blue-200">
                  info@marketing-platform.com
                </a>
              </p>
              <p>
                <span className="font-semibold">رقم الهاتف:</span>{' '}
                +966 55 123 4567
              </p>
              <div className="flex space-x-4 mt-4 justify-end">
                <a href="#" className="hover:text-blue-200 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Twitter/X Icon */}
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406L10.254 14.66l-7.579 8.186H-0.024l9.317-10.623L0 1.154h7.594l4.712 6.953z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-200 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Instagram Icon */}
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-200 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Facebook Icon */}
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-600 mt-8 pt-6 text-center">
          <p className="text-sm">
            © {currentYear} منصة تسويق. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;