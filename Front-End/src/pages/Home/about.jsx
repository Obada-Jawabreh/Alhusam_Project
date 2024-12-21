
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ChevronLeft, ChevronRight, Star, ShoppingBasket } from 'lucide-react';
import { QuoteIcon } from 'lucide-react';
 import {
  Flower,
  PaletteIcon,
  ScissorsIcon,
  HeartHandshakeIcon,
  StarIcon,
  Target,
  BookOpen,
  Globe,
} from "lucide-react";

export const HeroSection = () => {
  const colorVariants = [
    {
      gradient: "bg-gradient-to-br from-[#1E88E5] via-[#42A5F5] to-[#64B5F6]",
      title: "منصة تسويق",
      buttons: {
        primary: "bg-[#1E88E5]",
        secondary: "border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#1E88E5]"
      }
    }
  ];

  const [currentColorScheme, setCurrentColorScheme] = useState(colorVariants[0]);

  return (
    <section className={`min-h-screen flex items-center ${currentColorScheme.gradient} py-8 relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-20"
        initial={{ rotate: 0 }}
        animate={{ 
          rotate: [0, 10, -10, 0],
          transition: { 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        }}
      >
        <svg viewBox="0 0 200 200" className="absolute top-10 left-10 w-32 h-32 text-blue-200">
          <circle cx="100" cy="100" r="50" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 200 200" className="absolute bottom-10 right-10 w-24 h-24 text-blue-100">
          <path d="M100 50 L150 150 L50 150 Z" fill="currentColor" />
        </svg>
      </motion.div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center mt-12 relative z-10">
        <motion.div 
          className="md:w-1/2 text-right mr-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            {currentColorScheme.title}
          </h1>
          <p className="text-2xl text-white mb-8 leading-relaxed">
          منصة متخصصة لدعم الإبداع النسائي، نجمع بين الموهبة والفن والأعمال
          اليدوية
          </p>
         
<div className="flex space-x-4 justify-end">
  <Link to="/products">
    <motion.button
      className={`
        text-white px-6 py-3 rounded-full hover:opacity-90 transition-colors
        ${currentColorScheme.buttons.primary}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      استكشفي المنتجات
    </motion.button>
  </Link>
  <Link to="/provider">
    <motion.button
      className={`
        hover:bg-opacity-90 px-6 py-3 rounded-full transition-colors
        ${currentColorScheme.buttons.secondary}
        hover:text-white
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      انضمي كمبدعة
    </motion.button>
  </Link>
</div>
        </motion.div>
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img 
            src="../../../public/image/Untitled (616 x 616 px) (1).svg" 
            alt="بازار المبدعات" 
            className="rounded-full shadow-2xl border-8 border-white"
            initial={{ rotate: 0 }}
            animate={{ 
              rotate: [-5, 5, -5],
              transition: { 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};


import { 

  

  ShoppingBagIcon, 
  HeartIcon, 
  BrushIcon 
} from 'lucide-react';

export const CategoriesSection = () => {
  const categories = [
    {
      name: "اكسسوارات",
      description: "تصاميم أنيقة للمرأة العصرية",
      icon: <ShoppingBagIcon className="w-16 h-16 text-[#0D47A1]" />,
      color: {
        background: "bg-gradient-to-br from-[#1565C0] to-[#42A5F5]",
        text: "text-white",
        hover: "hover:bg-gradient-to-br hover:from-[#1976D2] hover:to-[#64B5F6]"
      }
    },
    {
      name: "أطعمة شهية",
      description: "إبداعات مطبخية متميزة",
      icon: <HeartIcon className="w-16 h-16 text-[#0D47A1]" />,
      color: {
        background: "bg-gradient-to-br from-[#1E88E5] to-[#64B5F6]",
        text: "text-white",
        hover: "hover:bg-gradient-to-br hover:from-[#1565C0] hover:to-[#42A5F5]"
      }
    },
    {
      name: "مصنوعات يدوية",
      description: "حرف إبداعية متقنة",
      icon: <BrushIcon className="w-16 h-16 text-[#0D47A1]" />,
      color: {
        background: "bg-gradient-to-br from-[#0D47A1] to-[#1E88E5]",
        text: "text-white",
        hover: "hover:bg-gradient-to-br hover:from-[#1565C0] hover:to-[#42A5F5]"
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#E3F2FD] to-white">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl font-bold text-center text-[#1565C0] mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          اكتشفي مجالاتنا الإبداعية
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              className={`
                ${category.color.background} 
                ${category.color.text}
                rounded-3xl p-8 text-center shadow-2xl 
                transform transition-all hover:scale-105 
                ${category.color.hover}
                group
              `}
            >
              <div className="flex justify-center mb-6 transition-transform group-hover:rotate-12">
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {category.name}
              </h3>
              <p className="mb-6 opacity-80">{category.description}</p>
              <Link to="/products">
                <button 
                  className="
                    bg-white text-[#1E88E5] px-6 py-3 
                    rounded-full hover:bg-[#1E88E5] 
                    hover:text-white transition-colors
                  "
                >
                  تصفح المنتجات
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ... (previous sections from last artifact)

export const FeaturedProductsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all');
        const fetchedProducts = response.data.data.products;
        
        const transformedProducts = fetchedProducts.map(product => ({
          name: product.titleAr,
          price: product.price,
          image: product.mainImage,
          description: product.description,
          rating: product.averageRating || 0,
        }));

        setProducts(transformedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 3));
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(products.length / 3)) %
        Math.ceil(products.length / 3)
    );
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#E3F2FD] relative">
        <div className="container mx-auto px-6 text-center">
          <p className="text-2xl text-[#1565C0]">جاري تحميل المنتجات...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-[#E3F2FD] relative">
        <div className="container mx-auto px-6 text-center">
          <p className="text-2xl text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#E3F2FD] relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#1565C0] mb-12">
          منتجاتنا المميزة
        </h2>

        <div className="flex justify-center items-center space-x-4 mb-8">
          {[...Array(Math.ceil(products.length / 3))].map((_, index) => (
            <div
              key={index}
              className={`w-4 h-2 rounded-full transition-all 
                ${
                  currentSlide === index
                    ? "bg-[#1E88E5] w-8"
                    : "bg-[#1E88E5]/30"
                }`}
            />
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={handlePrev}
              className="bg-[#1E88E5] text-white p-3 rounded-full hover:bg-[#1565C0] transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-4xl w-full mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {products
                  .slice(currentSlide * 3, (currentSlide + 1) * 3)
                  .map((product, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-105 group"
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-72 object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-[#1E88E5]/80 text-white px-3 py-1 rounded-full flex items-center">
                          <Star className="w-4 h-4 ml-2" />
                          {product.rating}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-[#4A4A4A]">
                          {product.name}
                        </h3>
                        <p className="text-[#757575] mb-4">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-[#1E88E5]">
                            {product.price} د.أ
                          </span>
                          <Link to="/products">
                            <button className="bg-[#1E88E5] text-white px-4 py-2 rounded-full hover:bg-[#1565C0] transition-colors">
                              <ShoppingBasket className="w-5 h-5" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={handleNext}
              className="bg-[#1E88E5] text-white p-3 rounded-full hover:bg-[#1565C0] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CommunitySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1565C0] mb-6">
            مجتمع المبدعات
          </h2>
          <p className="text-xl text-[#757575] max-w-2xl mx-auto">
            نحن نؤمن بقوة الدعم المتبادل والإبداع الجماعي
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#E1F5FE] rounded-2xl p-8 flex items-center">
            <HeartHandshakeIcon className="w-16 h-16 text-[#1E88E5] ml-6" />
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#4A4A4A]">
                الدعم والتشجيع
              </h3>
              <p className="text-[#757575]">
                نساعد بعضنا البعض على النمو والتطور
              </p>
            </div>
          </div>
          <div className="bg-[#F0F4C3] rounded-2xl p-8 flex items-center">
            <Flower className="w-16 h-16 text-[#1E88E5] ml-6" />
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#4A4A4A]">
                تبادل الخبرات
              </h3>
              <p className="text-[#757575]">ورش عمل وتدريبات مستمرة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export const NewsletterSection = () => {
  return (
    <section className="py-20 bg-[#F3E5F5]">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-4xl font-bold text-[#6A1B9A] mb-6">
            انضمي إلى عائلتنا
          </h2>
          <p className="text-xl text-[#757575] mb-8">
            كل أسبوع، نرسل لك أحدث التصاميم والعروض الحصرية
          </p>
          <form className="max-w-xl mx-auto flex">
            <input
              type="email"
              placeholder="أدخلي بريدك الإلكتروني"
              className="w-full px-6 py-3 rounded-r-full border border-gray-300 focus:outline-none focus:border-[#9C27B0]"
            />
            <button
              type="submit"
              className="bg-[#9C27B0] text-white px-8 py-3 rounded-l-full hover:bg-[#7B1FA2] transition-colors"
            >
              اشتركي
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export const WorkshopsSection = () => {
  const workshops = [
    {
      title: "ورشة التطريز المتقدم",
      description: "تعلمي فنون التطريز بأحدث التقنيات",
      duration: "6 أسابيع",
      level: "متقدم",
      icon: <SparklesIcon className="w-16 h-16 text-[#9C27B0]" />,
    },
    {
      title: "أساسيات الخياطة الإبداعية",
      description: "اكتشفي عالم تصميم الأزياء والملابس",
      duration: "4 أسابيع",
      level: "مبتدئ",
      icon: <StarIcon className="w-16 h-16 text-[#9C27B0]" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#6A1B9A] mb-12">
          ورش العمل التدريبية
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {workshops.map((workshop, index) => (
            <div
              key={index}
              className="bg-[#E1F5FE] rounded-2xl p-8 shadow-lg transform transition-all hover:scale-105 group"
            >
              <div className="flex items-center mb-6">
                {workshop.icon}
                <div className="mr-6">
                  <h3 className="text-2xl font-bold text-[#4A4A4A]">
                    {workshop.title}
                  </h3>
                  <p className="text-[#757575] mt-2">{workshop.description}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="bg-[#9C27B0] text-white px-3 py-1 rounded-full text-sm ml-4">
                    {workshop.level}
                  </span>
                  <span className="text-[#757575]">{workshop.duration}</span>
                </div>
                <button className="bg-[#9C27B0] text-white px-6 py-3 rounded-full hover:bg-[#7B1FA2] transition-colors group-hover:bg-[#7B1FA2]">
                  سجلي الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/testimonials/all');
        const activeTestimonials = response.data.filter(testimonial => testimonial.isActive);
        setTestimonials(activeTestimonials);
        setIsLoading(false);
      } catch (err) {
        setError('حدث خطأ في تحميل التقييمات');
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => 
          (prev + 1) % testimonials.length
        );
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(timer);
    }
  }, [testimonials]);

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      (prev + 1) % testimonials.length
    );
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#1E88E5]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        {error}
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center p-8">
        لا توجد تقييمات حاليًا
      </div>
    );
  }

  const testimonial = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-[#E3F2FD] to-white">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.h2 
          className="text-4xl font-bold text-center text-[#1565C0] mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          أصوات تثق بها
        </motion.h2>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrevTestimonial}
            className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-[#1E88E5] text-white p-2 rounded-full hover:bg-[#1565C0] transition-colors"
          >
            ←
          </button>
          <button 
            onClick={handleNextTestimonial}
            className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 bg-[#1E88E5] text-white p-2 rounded-full hover:bg-[#1565C0] transition-colors"
          >
            →
          </button>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center p-8 md:p-16"
            >
              {/* Avatar and Illustration */}
              <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div className="relative">
                  <img 
                    src={testimonial.avatar || "/api/placeholder/200/200"}
                    alt={testimonial.author}
                    className="w-48 h-48 rounded-full object-cover border-4 border-[#1E88E5] shadow-lg"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-[#1E88E5] text-white p-2 rounded-full shadow-lg">
                    <QuoteIcon size={24} />
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="w-full md:w-2/3 text-center md:text-right md:pr-8">
                <h3 className="text-2xl font-bold text-[#1565C0] mb-4">
                  {testimonial.author}
                </h3>
                <p className="text-xl text-gray-700 italic leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                
                {/* Rating */}
                <div className="flex justify-center md:justify-end mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="text-yellow-500 w-6 h-6 mx-1"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial 
                    ? 'bg-[#1E88E5] w-8' 
                    : 'bg-[#1E88E5]/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutUsSection = () => {
  const values = [
    {
      icon: <HeartHandshakeIcon className="w-16 h-16 text-white" />,
      title: "التمكين النسائي",
      description: "نؤمن بقدرة المرأة على تحويل مواهبها إلى مشاريع ناجحة وملهمة",
      gradient: "bg-gradient-to-br from-[#1E88E5] to-[#1565C0]"
    },
    {
      icon: <Target className="w-16 h-16 text-white" />,
      title: "الجودة والإتقان",
      description: "نسعى لتقديم منتجات يدوية استثنائية تعكس براعة الحرفيات",
      gradient: "bg-gradient-to-br from-[#42A5F5] to-[#0D47A1]"
    },
    {
      icon: <BookOpen className="w-16 h-16 text-white" />,
      title: "التعلم المستمر",
      description: "منصة للتطوير والتعلم، حيث كل إبداع هو فرصة للنمو",
      gradient: "bg-gradient-to-br from-[#64B5F6] to-[#1E88E5]"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#E3F2FD] to-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-[#1565C0] mb-6">من نحن</h2>
          <p className="text-xl text-[#757575] max-w-3xl mx-auto leading-relaxed">
            بازار المبدعات هو أكثر من مجرد منصة للبيع - إنها حلم نسائي يتحول إلى 
            واقع مُلهم. نحن نخلق فضاءً إبداعيًا يحتضن المواهب النسائية ويحولها 
            إلى قوة اقتصادية وإبداعية
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              className={`
                ${value.gradient}
                text-white rounded-3xl p-8 text-center shadow-2xl 
                transform transition-all hover:scale-105 group
              `}
            >
              <div className="flex justify-center mb-6 transition-transform group-hover:rotate-12">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {value.title}
              </h3>
              <p className="mb-6 opacity-80">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 bg-gradient-to-br from-[#1E88E5] to-[#1565C0] rounded-2xl p-12 text-center shadow-2xl text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-6">رؤيتنا</h3>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed mb-8">
            أن نكون المنصة الرائدة عالميًا التي تمكن المرأة من تحويل موهبتها إلى 
            قوة اقتصادية، حيث كل منتج يحمل قصة إبداع وإصرار
          </p>
          <div className="flex justify-center space-x-4">
            <motion.div 
              className="flex items-center bg-white text-[#1565C0] px-6 py-3 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-6 h-6 ml-2" />
              رؤية عالمية
            </motion.div>
            <motion.div 
              className="flex items-center bg-white text-[#1565C0] px-6 py-3 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HeartHandshakeIcon className="w-6 h-6 ml-2" />
              تمكين مستدام
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};