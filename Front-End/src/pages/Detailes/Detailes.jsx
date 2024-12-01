import React, { useState } from 'react';
import { 
  Heart, ShoppingCart, Star, ArrowLeft, Check, 
  Ruler, Palette, Clock, Truck 
} from 'lucide-react';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // البحث عن المنتج باستخدام الـ ID
    const product = productData.find(p => p.id === parseInt(id));
  
    const onBackToCatalog = () => {
      navigate('/');
    };
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  // صور إضافية للمنتج (محاكاة)
  const productImages = [
    product.image || "/api/placeholder/500/600",
    "/api/placeholder/500/600",
    "/api/placeholder/500/600",
    "/api/placeholder/500/600"
  ];

  // مواصفات المنتج
  const productSpecs = [
    {
      icon: <Ruler className="w-6 h-6 text-[#9C27B0]" />,
      label: "الأبعاد",
      value: "٣٠ × ٤٠ سم"
    },
    {
      icon: <Palette className="w-6 h-6 text-[#9C27B0]" />,
      label: "المواد المستخدمة",
      value: "قطن، خيوط تطريز حريرية"
    },
    {
      icon: <Clock className="w-6 h-6 text-[#9C27B0]" />,
      label: "وقت التصنيع",
      value: "٣-٥ أيام عمل"
    }
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#F3E5F5] via-[#E1F5FE] to-[#FFF3E0] py-12" 
      style={{ fontFamily: 'Cairo, Arial, sans-serif' }}
    >
      <div className="container mx-auto px-6">
        {/* زر العودة */}
        <button 
          onClick={onBackToCatalog}
          className="flex items-center text-[#6A1B9A] mb-6 hover:text-[#9C27B0] transition-colors"
        >
          <ArrowLeft className="ml-2" />
          العودة للكتالوج
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* قسم الصور */}
          <div>
            <div className="relative">
              <img 
                src={productImages[selectedImage]} 
                alt="صورة المنتج" 
                className="w-full rounded-2xl shadow-2xl transform transition-all hover:scale-105"
              />
              <button 
                onClick={() => setIsLiked(!isLiked)} 
                className="absolute top-4 right-4 bg-[#9C27B0]/80 text-white p-3 rounded-full"
              >
                <Heart 
                  color="white" 
                  fill={isLiked ? '#9C27B0' : 'none'}
                />
              </button>
            </div>

            {/* معاينة الصور */}
            <div className="flex justify-center space-x-4 mt-6">
              {productImages.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-[#9C27B0]' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`معاينة ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* قسم تفاصيل المنتج */}
          <div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-[#4A4A4A]">
                  {product.name}
                </h1>
                <div className="flex items-center bg-[#9C27B0]/20 text-[#9C27B0] px-3 py-1 rounded-full">
                  <Star className="w-5 h-5 ml-2" />
                  {product.rating}
                </div>
              </div>

              <p className="text-[#757575] mb-6">
                {product.description}
              </p>

              {/* المواصفات */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {productSpecs.map((spec, index) => (
                  <div 
                    key={index} 
                    className="bg-[#F3E5F5]/50 p-4 rounded-xl text-center"
                  >
                    <div className="flex justify-center mb-2">
                      {spec.icon}
                    </div>
                    <p className="text-[#4A4A4A] font-bold">{spec.label}</p>
                    <p className="text-[#757575] text-sm">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* السعر والكمية */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-[#9C27B0]/10 text-[#9C27B0] w-10 h-10 rounded-full"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-[#9C27B0]/10 text-[#9C27B0] w-10 h-10 rounded-full"
                  >
                    +
                  </button>
                </div>
                <span className="text-3xl font-bold text-[#9C27B0]">
                  {product.price * quantity} ر.س
                </span>
              </div>

              {/* زر الشراء */}
              <button 
                className="w-full bg-[#9C27B0] text-white py-4 rounded-full hover:bg-[#7B1FA2] transition-colors flex items-center justify-center space-x-4"
              >
                <ShoppingCart size={24} />
                <span>أضف إلى السلة</span>
              </button>

              {/* مميزات إضافية */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-[#4A4A4A]">
                  <Check className="w-5 h-5 ml-2 text-green-500" />
                  شحن مجاني للطلبات فوق ٢٠٠ ر.س
                </div>
                <div className="flex items-center text-[#4A4A4A]">
                  <Truck className="w-5 h-5 ml-2 text-[#9C27B0]" />
                  توصيل خلال ٣-٥ أيام عمل
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* قسم التقييمات والوصف الإضافي */}
        <div className="mt-16 bg-white/80 backdrop-blur-lg rounded-2xl p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#6A1B9A] mb-6">
                وصف المنتج
              </h2>
              <p className="text-[#757575] leading-relaxed">
                {product.description} هو قطعة فنية رائعة مصممة بعناية فائقة. يتميز بتطريز دقيق ومحبوك بخيوط حريرية عالية الجودة. كل غرزة تحكي قصة الإبداع والمهارة، مما يجعله هدية مثالية أو قطعة ديكور فريدة لمنزلك.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#6A1B9A] mb-6">
                التقييمات (٤٥ تقييم)
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((review, index) => (
                  <div 
                    key={index} 
                    className="bg-[#F3E5F5]/50 p-4 rounded-xl"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-[#4A4A4A]">
                        سارة محمد
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${
                              star <= 4 ? 'text-yellow-500' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#757575]">
                      منتج رائع بجودة عالية، التطريز دقيق جداً وألوان رائعة.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;