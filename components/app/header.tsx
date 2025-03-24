import React from 'react';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-3 px-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Onsurity-Demo</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1.5 rounded-md text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors">
            Help
          </button>
          <button className="px-3 py-1.5 rounded-md text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors">
            About
          </button>
          <button className="px-3 py-1.5 rounded-md text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors">
            Contact Us
          </button>
          <button className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors">
            Demo
          </button>
        </div>
      </div>
    </header>
  );
};
