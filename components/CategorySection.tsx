import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  jobCount: string;
  iconPath: string;
}

function CategoryCard({ title, jobCount, iconPath }: CategoryCardProps) {
  return (
    <Link
      href={`/jobs?category=${title.toLowerCase()}`}
      className="category-card group relative w-full lg:w-[274px] h-[180px] lg:h-[214px] p-6 lg:p-8 flex flex-col justify-between bg-white border border-[#D6DDEB] hover:bg-[#4640DE] hover:border-[#4640DE] transition-all duration-300"
    >
      {/* Icon - 48x48px with purple stroke */}
      <div className="w-10 h-10 lg:w-12 lg:h-12 text-[#4640DE] group-hover:text-white transition-colors duration-300">
        <Image 
          src={iconPath} 
          alt={`${title} icon`} 
          width={48} 
          height={48}
          className="w-10 h-10 lg:w-12 lg:h-12"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 lg:gap-2">
        <h3 
          className="text-xl lg:text-2xl font-semibold leading-[120%] tracking-[0] text-[#25324B] group-hover:text-white transition-colors duration-300"
          style={{ fontFamily: 'Clash Display, sans-serif' }}
        >
          {title}
        </h3>
        <p 
          className="text-base lg:text-lg font-normal leading-[160%] tracking-[0] text-[#7C8493] group-hover:text-white transition-colors duration-300"
          style={{ fontFamily: 'Epilogue, sans-serif' }}
        >
          {jobCount}
        </p>
      </div>
    </Link>
  );
}

export default function CategorySection() {
  const categories = [
    { title: "Design", jobCount: "235 jobs available", iconPath: "/icons/design.svg" },
    { title: "Sales", jobCount: "756 jobs available", iconPath: "/icons/sales.svg" },
    { title: "Marketing", jobCount: "140 jobs available", iconPath: "/icons/marketing.svg" },
    { title: "Finance", jobCount: "325 jobs available", iconPath: "/icons/finance.svg" },
    { title: "Technology", jobCount: "436 jobs available", iconPath: "/icons/technology.svg" },
    { title: "Engineering", jobCount: "542 jobs available", iconPath: "/icons/engineering.svg" },
    { title: "Business", jobCount: "211 jobs available", iconPath: "/icons/business.svg" },
    { title: "Human Resource", jobCount: "346 jobs available", iconPath: "/icons/human-resource.svg" },
  ];

  return (
    <section className="bg-white py-12 md:py-16 lg:py-[72px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[124px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-8 lg:mb-12 gap-4">
          <h2 
            className="text-3xl md:text-4xl lg:text-[48px] font-semibold leading-[110%]" 
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            <span className="text-[#25324B]">Explore by </span>
            <span className="text-[#26A4FF]">category</span>
          </h2>
          {/* Show all jobs button - desktop only */}
          <div className="hidden lg:flex items-center gap-3 lg:gap-4">
            <Link 
              href="/jobs" 
              className="text-[#4640DE] font-semibold text-sm lg:text-base leading-[160%] hover:underline transition-all duration-300"
              style={{ fontFamily: 'Epilogue, sans-serif' }}
            >
              Show all jobs
            </Link>
            <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-[#4640DE]" />
          </div>
        </div>

        {/* Category Grid - responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              jobCount={category.jobCount}
              iconPath={category.iconPath}
            />
          ))}
        </div>

        {/* Show all jobs button - mobile only, appears after categories */}
        <div className="flex lg:hidden justify-center mt-8">
          <Link 
            href="/jobs" 
            className="flex items-center gap-3 text-[#4640DE] font-semibold text-sm leading-[160%] hover:gap-4 transition-all duration-300"
            style={{ fontFamily: 'Epilogue, sans-serif' }}
          >
            Show all jobs
            <ArrowRight className="w-5 h-5 text-[#4640DE]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
