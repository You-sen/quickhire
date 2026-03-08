import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CompaniesSection from "@/components/CompaniesSection";
import CategorySection from "@/components/CategorySection";
import CTASection from "@/components/CTASection";
import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import LatestJobsSection from "@/components/LatestJobsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CompaniesSection />
      <CategorySection />
      <CTASection />
      <FeaturedJobsSection />
      <LatestJobsSection />
      <Footer />
    </div>
  );
}
