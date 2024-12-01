const Product = require('../models/product');
const User = require('../models/user');

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
    const products = await Product.find(); // الحصول على جميع المنتجات من قاعدة البيانات
    res.status(200).json(products); // إرسال البيانات كرد
  } catch (error) {
    res.status(500).json({ message: error.message }); // إرسال خطأ في حالة حدوث مشكلة
  }
};


// الحصول على منتج محدد
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name profileImage')
      .populate('reviews.user', 'name profileImage');

    if (!product || product.isDeleted || !product.isActive) {
      return res.status(404).json({
        status: 'error',
        message: 'المنتج غير موجود'
      });
    }

    // زيادة عدد المشاهدات
    product.views += 1;
    await product.save();

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// تحديث منتج
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // التأكد من وجود المنتج
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'المنتج غير موجود'
      });
    }

    // التأكد من أن المستخدم هو مالك المنتج
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'غير مصرح لك بتعديل هذا المنتج'
      });
    }

    // تحديث المنتج
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { 
        new: true, 
        runValidators: true 
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        product: updatedProduct
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// حذف منتج
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // التأكد من وجود المنتج
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'المنتج غير موجود'
      });
    }

    // التأكد من أن المستخدم هو مالك المنتج
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'غير مصرح لك بحذف هذا المنتج'
      });
    }

    // حذف المنتج (حذف منطقي)
    product.isDeleted = true;
    product.isActive = false;
    await product.save();

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// إضافة تقييم للمنتج
exports.addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // التأكد من وجود المنتج
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'المنتج غير موجود'
      });
    }

    // إنشاء التقييم
    const newReview = {
      user: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment
    };

    // التأكد من عدم وجود تقييم مسبق للمستخدم
    const existingReviewIndex = product.reviews.findIndex(
      review => review.user.toString() === req.user._id.toString()
    );

    if (existingReviewIndex > -1) {
      // تحديث التقييم الموجود
      product.reviews[existingReviewIndex] = newReview;
    } else {
      // إضافة تقييم جديد
      product.reviews.push(newReview);
    }

    // حفظ المنتج
    await product.save();

    res.status(201).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};