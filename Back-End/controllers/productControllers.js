const Product = require('../models/product');
const User = require('../models/user');
 
const mongoose = require('mongoose'); // استيراد mongoose
  // إنشاء منتج جديد
exports.createProduct = async (req, res) => {
  try {
    // التأكد من أن المستخدم موجود ومصرح له بإضافة المنتج
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'المستخدم غير موجود'
      });
    }

    // إنشاء المنتج
    const newProduct = new Product({
      ...req.body,
      seller: req.user._id
    });

    // حفظ المنتج
    await newProduct.save();

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// الحصول على جميع المنتجات
// exports.getAllProducts = async (req, res) => {
//   try {
//     // استخراج معايير البحث
//     const { 
//       category, 
//       minPrice, 
//       maxPrice, 
//       isHandmade, 
//       sort 
//     } = req.query;

//     // بناء الفلتر
//     const filter = { 
//       isActive: true, 
//       isDeleted: false 
//     };

//     if (category) filter.category = category;
//     if (isHandmade) filter.isHandmade = isHandmade === 'true';
    
//     // فلتر السعر
//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = parseFloat(minPrice);
//       if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
//     }

//     // الترتيب
//     const sortOptions = {};
//     switch (sort) {
//       case 'priceAsc':
//         sortOptions.price = 1;
//         break;
//       case 'priceDesc':
//         sortOptions.price = -1;
//         break;
//       case 'newest':
//         sortOptions.createdAt = -1;
//         break;
//       case 'mostPopular':
//         sortOptions.purchaseCount = -1;
//         break;
//       default:
//         sortOptions.createdAt = -1;
//     }

//     // البحث والترتيب والترقيم
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const products = await Product.find(filter)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(limit)
//       .populate('seller', 'name profileImage'); // تضمين معلومات البائع

//     // حساب العدد الإجمالي
//     const totalProducts = await Product.countDocuments(filter);

//     res.status(200).json({
//       status: 'success',
//       results: products.length,
//       totalPages: Math.ceil(totalProducts / limit),
//       currentPage: page,
//       data: {
//         products
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       message: error.message
//     });
//   }
// };
 
exports.getAllProducts = async (req, res) => {
  try {
    // جلب جميع المنتجات من قاعدة البيانات
    const products = await Product.find();

    // إرسال الاستجابة
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // التحقق من صحة ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'معرّف المنتج غير صالح',
      });
    }

    // البحث عن المنتج
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'المنتج غير موجود أو تم حذفه',
      });
    }
    

    // إرسال المنتج
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    console.error('خطأ أثناء جلب المنتج:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'حدث خطأ أثناء جلب المنتج',
      error: error.message,
    });
  }
};
// exports.getProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;

//     // البحث عن المنتج
//     const product = await Product.findOne({ _id: mongoose.Types.ObjectId(productId), isDeleted: false }).populate('seller').populate('reviews.user');

//     if (!product) {
//       console.log("لم يتم العثور على المنتج");
//       return res.status(404).json({
//         status: 'error',
//         message: 'المنتج غير موجود أو تم حذفه',
//       });
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         product,
//       },
//     });
//   } catch (error) {
//     console.error("خطأ في البحث عن المنتج:", error.message);
//     res.status(500).json({
//       status: 'error',
//       message: 'حدث خطأ أثناء جلب المنتج',
//       error: error.message,
//     });
//   }
// };