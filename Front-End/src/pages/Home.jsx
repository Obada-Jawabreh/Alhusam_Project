import {
  HeroSection,
  CategoriesSection,
  FeaturedProductsSection,
  CommunitySection,
  NewsletterSection,
  TestimonialsSection,
  AboutUsSection,
} from "../pages/Home/about";
import VisitorCounter from "../components/VisitorCount";
import Footer from "../components/Layout/Footer";
import NavigationBar from "../components/Layout/Navbar";
const HomePage = () => {
  return (
    <div className="font-cairo">
      <NavigationBar />
      <HeroSection />
       <VisitorCounter />
      <CategoriesSection />
        
      <FeaturedProductsSection />
      <AboutUsSection />
      <CommunitySection />
      {/* <NewsletterSection /> */}
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default HomePage;