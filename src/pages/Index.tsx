import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedRecipes from "@/components/FeaturedRecipes";
import Categories from "@/components/Categories";
import PopularRecipes from "@/components/PopularRecipes";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedRecipes />
        <Categories />
        <PopularRecipes />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
