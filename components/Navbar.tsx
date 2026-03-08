'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[124px]">
        <div className="flex items-center justify-between h-16 lg:h-[78px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 lg:gap-3">
            <Image src="/logo.svg" alt="QuickHire" width={32} height={32} className="w-6 h-6 lg:w-8 lg:h-8" />
            <span className="text-lg lg:text-[25px] font-bold text-[#25324B]">QuickHire</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <Link href="/jobs" className="text-[#515B6F] hover:text-[#25324B] transition-colors text-[16px] font-medium">
              Find Jobs
            </Link>
            <Link href="/companies" className="text-[#515B6F] hover:text-[#25324B] transition-colors text-[16px] font-medium">
              Browse Companies
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Link
              href="/login"
              className="text-[#4640DE] hover:text-[#3730a3] font-bold transition-colors px-3 lg:px-6 py-2 text-sm lg:text-[16px]"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-3 lg:px-6 py-2 lg:py-3 bg-[#4640DE] text-white rounded-[4px] hover:bg-[#3730a3] transition-colors font-bold text-sm lg:text-[16px]"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#25324B]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/jobs" 
                className="text-[#515B6F] hover:text-[#25324B] transition-colors text-base font-medium px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link 
                href="/companies" 
                className="text-[#515B6F] hover:text-[#25324B] transition-colors text-base font-medium px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Companies
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link
                  href="/login"
                  className="text-[#4640DE] hover:text-[#3730a3] font-bold transition-colors px-2 py-2 text-base text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-3 bg-[#4640DE] text-white rounded-[4px] hover:bg-[#3730a3] transition-colors font-bold text-base text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
