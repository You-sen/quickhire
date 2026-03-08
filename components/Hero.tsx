import Image from "next/image";

export default function Hero() {
  return (
    <section 
      className="relative bg-[#F8F9FE] overflow-hidden w-full lg:w-[1440px] lg:mx-auto py-12 md:py-16 lg:py-0 lg:h-[794px] hero-section"
    >
      {/* Decorative Pattern - hidden on mobile, visible on desktop */}
      <div className="hidden lg:block absolute pointer-events-none overflow-visible" style={{ left: '580px', top: '0', width: '860px', height: '794px' }}>
        <svg width="860" height="794" viewBox="0 0 860 794" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
          {/* Rectangle 2734 - smallest, top */}
          <g transform="translate(480.752, 51.754)">
            <rect x="-96.1" y="-208.233" width="192.2" height="416.466" rx="8" stroke="#CCCBF5" strokeWidth="4" fill="none" transform="rotate(-64)"/>
          </g>
          
          {/* Rectangle 2729 - largest, top-middle */}
          <g transform="translate(861.925, 21.561)">
            <rect x="-164.162" y="-398.101" width="328.324" height="796.202" rx="8" stroke="#CCCBF5" strokeWidth="4" fill="none" transform="rotate(-64)"/>
          </g>
          
          {/* Rectangle 2730 - large, middle */}
          <g transform="translate(681.767, 240)">
            <rect x="-159.888" y="-389.253" width="319.777" height="778.506" rx="8" stroke="#CCCBF5" strokeWidth="4" fill="none" transform="rotate(-64)"/>
          </g>
          
          {/* Rectangle 2733 - medium, bottom */}
          <g transform="translate(382.767, 617)">
            <rect x="-141.692" y="-358.126" width="283.384" height="716.252" rx="8" stroke="#CCCBF5" strokeWidth="4" fill="none" transform="rotate(-64)"/>
          </g>
        </svg>
      </div>

      {/* Pic Group with design element - hidden on mobile, visible on desktop */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: '812px', top: '87px', width: '838px', height: '1037px' }}>
        {/* Design element background with man image already included */}
        <div className="absolute" style={{ left: '0', top: '0', width: '501px', height: '707px' }}>
          <Image
            src="/hero-design-element.png"
            alt=""
            width={501}
            height={707}
            priority
          />
        </div>
        {/* Rectangle 2732 - white cutout rectangle */}
        <div className="absolute bg-[#F8F9FE]" style={{ 
          left: '713.76px', 
          top: '468px', 
          width: '283.38px', 
          height: '716.25px',
          transform: 'rotate(-64deg)',
          transformOrigin: 'top left'
        }}></div>
      </div>

      {/* Title Frame - responsive positioning */}
      <div className="relative lg:absolute px-4 sm:px-6 lg:px-0 lg:left-[125px] lg:top-[160px] w-full lg:w-[629px] max-w-3xl mx-auto lg:mx-0">
        {/* Title Group */}
        <div className="relative mb-8 lg:mb-0 lg:w-[533px] lg:h-[290px]">
          <h1 className="text-4xl md:text-5xl lg:text-[72px] font-semibold text-[#25324B] leading-[1.2] tracking-tight mb-4 lg:mb-0" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            Discover more than <span className="text-[#26A4FF]">5000+ Jobs</span>
          </h1>
          {/* Blue underline - responsive sizing, always visible */}
          <div className="relative lg:absolute w-full max-w-[455px] h-8 lg:h-10 lg:left-0 lg:top-[250px]">
            <Image
              src="/underline.svg"
              alt=""
              width={455}
              height={40}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Description - responsive */}
        <p className="text-base md:text-lg lg:text-[20px] text-[#515B6F] leading-[160%] mb-8 lg:absolute lg:top-[312.58px] lg:w-[521px]">
          Great platform for the job seeker that searching for new career heights and passionate about startups.
        </p>

        {/* Search Frame - responsive */}
        <div className="lg:absolute lg:top-[399.58px] w-full lg:w-[852px]">
          {/* Search Bar - responsive layout */}
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg lg:shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-4 lg:p-0 gap-4 md:gap-0 lg:h-[89px]">
            {/* Job Title Input */}
            <div className="flex items-center md:border-r border-[#D6DDEB] lg:ml-4 lg:mt-4 w-full md:w-auto md:flex-1 lg:w-[305.5px] lg:h-[57px] px-4 lg:px-4">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#7C8493] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full outline-none text-[#25324B] placeholder-[#A8ADB7] text-sm lg:text-[16px]"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center w-full md:w-auto md:flex-1 lg:w-[305.5px] lg:mt-4 lg:h-[57px] px-4 lg:px-4">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#7C8493] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                placeholder="Florence, Italy"
                className="w-full outline-none text-[#25324B] placeholder-[#A8ADB7] text-sm lg:text-[16px]"
              />
              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-[#7C8493] ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Search Button */}
            <button className="bg-[#4640DE] text-white rounded hover:bg-[#3730a3] transition-colors font-bold text-sm lg:text-[16px] py-3 md:py-4 lg:py-0 lg:mt-4 lg:mr-4 w-full md:w-auto md:min-w-[160px] lg:w-[209px] lg:h-[57px]">
              Search my job
            </button>
          </div>

          {/* Popular Keywords */}
          <p className="text-xs md:text-sm lg:text-[14px] text-[#7C8493] mt-4">
            Popular : UI Designer, UX Researcher, Android, Admin
          </p>
        </div>
      </div>
    </section>
  );
}
