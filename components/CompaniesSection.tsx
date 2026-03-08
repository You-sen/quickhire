import Image from "next/image";

export default function CompaniesSection() {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[124px]">
        {/* Title */}
        <p className="text-base lg:text-[18px] text-[#25324B] opacity-50 mb-6 lg:mb-8">
          Companies we helped grow
        </p>

        {/* Company Logos - responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:items-center lg:justify-between gap-6 lg:gap-[37px]">
          <Image 
            src="/vodafone.svg" 
            alt="Vodafone" 
            width={154} 
            height={40} 
            className="opacity-30 hover:opacity-50 transition-opacity w-auto h-8 lg:h-10" 
          />
          <Image 
            src="/intel.svg" 
            alt="Intel" 
            width={83} 
            height={32} 
            className="opacity-30 hover:opacity-50 transition-opacity w-auto h-6 lg:h-8" 
          />
          <Image 
            src="/tesla.svg" 
            alt="Tesla" 
            width={183} 
            height={24} 
            className="opacity-30 hover:opacity-50 transition-opacity w-auto h-5 lg:h-6" 
          />
          <Image 
            src="/amd.svg" 
            alt="AMD" 
            width={117} 
            height={28} 
            className="opacity-30 hover:opacity-50 transition-opacity w-auto h-6 lg:h-7" 
          />
          <Image 
            src="/talkit.svg" 
            alt="Talkit" 
            width={109} 
            height={32} 
            className="opacity-30 hover:opacity-50 transition-opacity w-auto h-6 lg:h-8 col-span-2 md:col-span-1 mx-auto lg:mx-0" 
          />
        </div>
      </div>
    </section>
  );
}
