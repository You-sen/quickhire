import Link from "next/link";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 lg:ml-[124px]">
        {/* CTA Container - responsive with desktop pixel-perfect */}
        <div 
          className="relative w-full lg:w-[1192px] lg:h-[414px] bg-[#4640DE] overflow-hidden cta-diagonal-corners"
        >
          {/* Grid layout for responsive - single column on mobile, two columns on tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:block h-full">
            {/* Text Content - responsive positioning */}
            <div className="relative lg:absolute lg:left-[70px] lg:top-[93px] p-8 lg:p-0 lg:w-[364px] flex flex-col justify-center items-center md:items-start text-center md:text-left">
              {/* Title - responsive sizing */}
              <h2 
                className="text-3xl md:text-4xl lg:text-[48px] font-semibold leading-[110%] text-white mb-4 lg:mb-6"
                style={{ 
                  fontFamily: 'Clash Display, sans-serif'
                }}
              >
                Start posting jobs today
              </h2>
              
              {/* Description - responsive sizing */}
              <p 
                className="text-sm md:text-base lg:text-[16px] leading-[160%] text-white mb-6"
                style={{ 
                  fontFamily: 'Epilogue, sans-serif'
                }}
              >
                Start posting jobs for only $10.
              </p>
              
              {/* Button - responsive sizing */}
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-6 py-3 lg:w-[179px] lg:h-[50px] bg-white text-[#4640DE] font-bold text-sm lg:text-[16px] hover:bg-gray-100 transition-colors"
                style={{ fontFamily: 'Epilogue, sans-serif' }}
              >
                Sign Up For Free
              </Link>
            </div>

            {/* Dashboard Image - visible on tablet+, positioned absolutely on desktop */}
            <div className="relative md:flex items-center justify-center p-8 lg:p-0 lg:absolute lg:left-[558px] lg:top-[68px]">
              <Image
                src="/dashboard.svg"
                alt="Dashboard preview"
                width={564}
                height={346}
                className="w-full h-auto lg:w-[564px] lg:h-[346px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
