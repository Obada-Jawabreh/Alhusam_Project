const Product = require('../models/product');
const User = require('../models/user');
const mongoose = require('mongoose'); // استيراد mongoose
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