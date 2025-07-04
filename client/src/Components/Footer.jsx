import React from 'react';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-blue-900 text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">ZapLearn</h2>
          <p className="text-sm text-blue-100">
            Empowering learners across the globe with the skills they need for the future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              Home
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => scrollToSection('courses')}
            >
              Courses
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => scrollToSection('brand')}
            >
              Brand Partners
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm text-blue-100">Email: support@zaplearn.com</p>
          <p className="text-sm text-blue-100">Phone: +91 9745 665563</p>
          <div className="flex gap-4 mt-4">
            <span className="text-white cursor-pointer hover:text-blue-300">🔗</span>
            <span className="text-white cursor-pointer hover:text-blue-300">🐦</span>
            <span className="text-white cursor-pointer hover:text-blue-300">📘</span>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-blue-700 mt-10 pt-6 text-center text-sm text-blue-200">
        © {new Date().getFullYear()} ZapLearn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
