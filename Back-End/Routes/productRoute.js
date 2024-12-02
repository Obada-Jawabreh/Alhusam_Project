// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// const authMiddleware = require('../middlewares/authMiddleware');

// // المسارات العامة
// router.route('/')
//   .get(productController.getAllProducts) // الحصول على جميع المنتجات
//   .post(
//     authMiddleware.protect,
//     productController.createProduct // إنشاء منتج جديد (للمستخدمين المصرح لهم)
//   );

const express = require("express");
const productController = require("../controllers/productControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// إنشاء منتج جديد
// router.post("/add",  productController.createProduct);

// الحصول على جميع المنتجات
router.get("/all", productController.getAllProducts);

// // الحصول على منتج محدد
router.get("/:id", productController.getProductById ); 

// // تحديث منتج
// router.patch("/:id", protect, productController.updateProduct);

// // حذف منتج
// router.delete("/:id", protect, productController.deleteProduct);

// // إضافة تقييم للمنتج
// router.post("/:id/review", protect, productController.addReview);

module.exports = router;

