import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // تأكد من تثبيت axios
import { Heart, ShoppingCart, Star, Flower, PaletteIcon, ScissorsIcon, EyeIcon } from 'lucide-react';
import { Home, Shirt, Coffee, Scissors, Headphones } from 'lucide-react';
import NavigationBar from '../../components/Layout/Navbar';
// مكون بطاقة المنتج
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-105 group">
      <div className="relative">
        <img 
          src={product.mainImage || "/api/placeholder/300/400"} 
          alt={product.titleAr} 
          className="w-full h-72 object-cover transition-transform group-hover:scale-110"
        />
        {/* <div className="absolute top-4 left-4 bg-[#9C27B0]/80 text-white px-3 py-1 rounded-full flex items-center">
          <Star className="w-4 h-4 ml-2" />
          {product.rating || 0}
        </div> */}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-[#4A4A4A]">
          {product.titleAr}
        </h3>
        <p className="text-[#757575] mb-4">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#9C27B0]">
            {product.price} د.أ
          </span>
          <Link 
            to={`/product/${product._id}`} 
            className="bg-[#9C27B0] text-white p-2 rounded-full hover:bg-[#7B1FA2] transition-colors"
          >
            <EyeIcon size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// الصفحة الرئيسية للكتالوج
const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
const categories = [
  { name: 'الكل', icon: <Home className="w-6 h-6 ml-2" /> },
  { name: 'ملابس', icon: <Shirt className="w-6 h-6 ml-2" /> },
  { name: 'طعام', icon: <Coffee className="w-6 h-6 ml-2" /> },
  { name: 'مصنوعات يدوية', icon: <Scissors className="w-6 h-6 ml-2" /> },
  { name: 'اكسسوارات', icon: <Flower className="w-6 h-6 ml-2" />  }
];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all');
        setProducts(response.data.data.products);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'الكل' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>جار التحميل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>حدث خطأ: {error}</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-white py-20" 
      style={{ fontFamily: 'Cairo, Arial, sans-serif' }}
    >
      <NavigationBar />
      <div className="container mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#6A1B9A] mb-4 mt-[4rem]">
            بازار المبدعات
          </h1>
          <p className="text-[#4A4A4A] text-xl">
            منصة لعرض إبداعات السيدات اليدوية
          </p>
        </header>

        {/* تصنيفات المنتجات */}
        <div className="flex justify-center mb-12 space-x-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.name 
                  ? 'bg-[#9C27B0] text-white shadow-lg' 
                  : 'bg-white text-[#9C27B0] hover:bg-[#9C27B0] hover:text-white'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* شبكة المنتجات */}
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500">
            لا توجد منتجات في هذه الفئة
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product._id} 
                product={product} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;