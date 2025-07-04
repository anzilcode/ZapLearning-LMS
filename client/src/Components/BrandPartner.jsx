import React from 'react';
import Logos from '../Data/logo';

const BrandPartner = () => {
  return (
    <section id='brand' className="bg-blue-50 py-12 px-4 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-8">
          Trusted by Global Leaders in Innovation and Learning
        </h2>

        <div className="flex overflow-x-auto gap-10 items-center justify-start scrollbar-hide">
          {Logos.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[100px]  transition-transform duration-200"
            >
              <img
                src={logo.logo}
                alt={logo.text}
                className="h-10 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
              <p className="mt-2 text-sm text-gray-700 font-medium whitespace-nowrap">{logo.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPartner;
