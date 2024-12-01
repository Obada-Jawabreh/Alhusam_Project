import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flower, 
  PaletteIcon, 
  ScissorsIcon, 
  HeartHandshakeIcon, 
  ShoppingBasketIcon,
  StarIcon,
  Star, ShoppingBasket, ChevronLeft, ChevronRight,Target, BookOpen, Globe
} from 'lucide-react';

// تعريف الأقسام كمكونات منفصلة
export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-[#F3E5F5] via-[#E1F5FE] to-[#FFF3E0] py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-right">
          <h1 className="text-5xl font-bold text-[#6A1B9A] mb-6">
            بازار المبدعات
          </h1>
          <p className="text-2xl text-[#4A4A4A] mb-8 leading-relaxed">
            منصة متخصصة لدعم الإبداع النسائي، نجمع بين الموهبة والفن والأعمال اليدوية
          </p>
          <div className="flex space-x-4 justify-end">
            <button className="bg-[#9C27B0] text-white px-6 py-3 rounded-full hover:bg-[#7B1FA2] transition-colors">
              استكشفي المنتجات
            </button>
            <button className="border-2 border-[#9C27B0] text-[#9C27B0] px-6 py-3 rounded-full hover:bg-[#9C27B0] hover:text-white transition-colors">
              انضمي كمنتجة
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="../../../public/image/Untitled (616 x 616 px) (1).svg" 
            alt="بازار المبدعات" 
            className="rounded-full shadow-2xl border-8 border-white"
          />
        </div>
      </div>
    </section>
  );
};

export const CategoriesSection = () => {
  const categories = [
    {
      name: "التطريز",
      description: "إبداعات يدوية متقنة",
      icon: <Flower className="w-16 h-16 text-[#9C27B0]" />,
      color: "bg-[#F3E5F5]"
    },
    {
      name: "الفنون اليدوية",
      description: "تقنيات متنوعة",
      icon: <PaletteIcon className="w-16 h-16 text-[#9C27B0]" />,
      color: "bg-[#E1F5FE]"
    },
    {
      name: "الخياطة",
      description: "تصاميم أنيقة",
      icon: <ScissorsIcon className="w-16 h-16 text-[#9C27B0]" />,
      color: "bg-[#FFF3E0]"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#6A1B9A] mb-12">
          اكتشفي مجالاتنا الإبداعية
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`${category.color} rounded-2xl p-8 text-center shadow-lg transform transition-all hover:scale-105`}
            >
              <div className="flex justify-center mb-6">
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#4A4A4A]">
                {category.name}
              </h3>
              <p className="text-[#757575] mb-6">
                {category.description}
              </p>
              <button className="bg-[#9C27B0] text-white px-6 py-3 rounded-full hover:bg-[#7B1FA2] transition-colors">
                تصفح المنتجات
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FeaturedProductsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const products = [
        {
            name: "مفرش مطبخ مطرز",
            price: 120,
            image: "../../../public/image/7.png",
            description: "تطريز يدوي دقيق بألوان رائعة",
            rating: 4.5
        },
        {
            name: "حقيبة يدوية",
            price: 180,
            image: "../../../public/image/8.png",
            description: "حقيبة عصرية مصنوعة بعناية فائقة",
            rating: 5
        },
        {
            name: "وسادة مزخرفة",
            price: 90,
            image: "../../../public/image/9.png",
            description: "وسادة أنيقة تضيف لمسة جمالية لمنزلك",
            rating: 4
        },
        {
            name: "طاولة قهوة",
            price: 300,
            image: "../../../public/image/Untitled (616 x 616 px) (277 x 288 px).png",
            description: "طاولة قهوة أنيقة وعملية",
            rating: 4.8
        },
        {
            name: "سجاد يدوي",
            price: 450,
            image: "../../../public/image/11.png",
            description: "سجاد يدوي بتصميم جميل",
            rating: 4.2
        },
        {
            name: "كرسي هزاز",
            price: 200,
            image: "../../../public/image/10.png",
            description: "كرسي هزاز مريح وأنيق",
            rating: 4.6
        }
    ];

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 3));
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(products.length / 3)) % Math.ceil(products.length / 3));
    };

    return (
        <section className="py-20 bg-[#F3E5F5] relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-[#6A1B9A] mb-12">
                    منتجاتنا المميزة
                </h2>

                <div className="flex justify-center items-center space-x-4 mb-8">
                    {[...Array(Math.ceil(products.length / 3))].map((_, index) => (
                        <div
                            key={index}
                            className={`w-4 h-2 rounded-full transition-all 
                                ${currentSlide === index ? 'bg-[#9C27B0] w-8' : 'bg-[#9C27B0]/30'}`}
                        />
                    ))}
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                        <button
                            onClick={handlePrev}
                            className="bg-[#9C27B0] text-white p-3 rounded-full hover:bg-[#7B1FA2] transition-colors"
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
                                {products.slice(currentSlide * 3, (currentSlide + 1) * 3).map((product, index) => (
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
                                            <div className="absolute top-4 right-4 bg-[#9C27B0]/80 text-white px-3 py-1 rounded-full flex items-center">
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
                                                <span className="text-lg font-bold text-[#9C27B0]">
                                                    {product.price} ر.س
                                                </span>
                                                <button className="bg-[#9C27B0] text-white px-4 py-2 rounded-full hover:bg-[#7B1FA2] transition-colors">
                                                    <ShoppingBasket className="w-5 h-5" />
                                                </button>
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
                            className="bg-[#9C27B0] text-white p-3 rounded-full hover:bg-[#7B1FA2] transition-colors"
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
          <h2 className="text-4xl font-bold text-[#6A1B9A] mb-6">
            مجتمع المبدعات
          </h2>
          <p className="text-xl text-[#757575] max-w-2xl mx-auto">
            نحن نؤمن بقوة الدعم المتبادل والإبداع الجماعي
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#E1F5FE] rounded-2xl p-8 flex items-center">
            <HeartHandshakeIcon className="w-16 h-16 text-[#9C27B0] ml-6" />
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#4A4A4A]">
                الدعم والتشجيع
              </h3>
              <p className="text-[#757575]">
                نساعد بعضنا البعض على النمو والتطور
              </p>
            </div>
          </div>
          <div className="bg-[#FFF3E0] rounded-2xl p-8 flex items-center">
            <Flower className="w-16 h-16 text-[#9C27B0] ml-6" />
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#4A4A4A]">
                تبادل الخبرات
              </h3>
              <p className="text-[#757575]">
                ورش عمل وتدريبات مستمرة
              </p>
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
        icon: <SparklesIcon className="w-16 h-16 text-[#9C27B0]" />
      },
      {
        title: "أساسيات الخياطة الإبداعية",
        description: "اكتشفي عالم تصميم الأزياء والملابس",
        duration: "4 أسابيع",
        level: "مبتدئ",
        icon: <StarIcon className="w-16 h-16 text-[#9C27B0]" />
      }
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
                    <p className="text-[#757575] mt-2">
                      {workshop.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="bg-[#9C27B0] text-white px-3 py-1 rounded-full text-sm ml-4">
                      {workshop.level}
                    </span>
                    <span className="text-[#757575]">
                      {workshop.duration}
                    </span>
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
    const testimonials = [
      {
        name: "سارة أحمد",
        quote: "بازار المبدعات غيّر مسار مشروعي الصغير وفتح لي آفاقًا جديدة",
        avatar: "/api/placeholder/100/100"
      },
      {
        name: "لمياء محمد",
        quote: "تعلمت الكثير من الورش التدريبية وأصبحت أمتلك مهارات احترافية",
        avatar: "/api/placeholder/100/100"
      }
    ];
  
    return (
      <section className="py-20 bg-[#F3E5F5]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#6A1B9A] mb-12">
            قصص نجاح
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg transform transition-all hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-20 h-20 rounded-full ml-6 border-4 border-[#9C27B0]"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-[#4A4A4A]">
                      {testimonial.name}
                    </h3>
                    <p className="text-[#757575] mt-2">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  
export const AboutUsSection = () => {
    const values = [
      {
        icon: <HeartHandshakeIcon className="w-16 h-16 text-[#9C27B0]" />,
        title: "التمكين النسائي",
        description: "نؤمن بقدرة المرأة على تحويل مواهبها إلى مشاريع ناجحة وملهمة"
      },
      {
        icon: <Target className="w-16 h-16 text-[#9C27B0]" />,
        title: "الجودة والإتقان",
        description: "نسعى لتقديم منتجات يدوية استثنائية تعكس براعة الحرفيات"
      },
      {
        icon: <BookOpen className="w-16 h-16 text-[#9C27B0]" />,
        title: "التعلم المستمر",
        description: "منصة للتطوير والتعلم، حيث كل إبداع هو فرصة للنمو"
      }
    ];
  
    return (
      <section className="py-20 bg-white ">
        <div className="container mx-auto px-6 ">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#6A1B9A] mb-6">
              من نحن
            </h2>
            <p className="text-xl text-[#757575] max-w-3xl mx-auto leading-relaxed">
              بازار المبدعات هو أكثر من مجرد منصة للبيع - إنها حلم نسائي يتحول إلى واقع مُلهم. نحن نخلق فضاءً إبداعيًا يحتضن المواهب النسائية ويحولها إلى قوة اقتصادية وإبداعية
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-[#F3E5F5] rounded-2xl p-8 text-center shadow-lg transform transition-all hover:scale-105"
              >
                <div className="flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#4A4A4A]">
                  {value.title}
                </h3>
                <p className="text-[#757575]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
  
          <div className="mt-16 bg-[#E1F5FE] rounded-2xl p-12 text-center shadow-lg">
            <h3 className="text-3xl font-bold text-[#6A1B9A] mb-6">
              رؤيتنا
            </h3>
            <p className="text-xl text-[#4A4A4A] max-w-4xl mx-auto leading-relaxed">
              أن نكون المنصة الرائدة عالميًا التي تمكن المرأة من تحويل موهبتها إلى قوة اقتصادية، حيث كل منتج يحمل قصة إبداع وإصرار
            </p>
            <div className="flex justify-center mt-8 space-x-4 ">
              <div className="flex items-center bg-[#9C27B0] text-white px-6 py-3 rounded-full">
                <Globe className="w-6 h-6 ml-2" />
                رؤية عالمية
              </div>
              <div className="flex items-center bg-[#9C27B0] text-white px-6 py-3 rounded-full">
                <HeartHandshakeIcon className="w-6 h-6 ml-2" />
                تمكين مستدام
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };