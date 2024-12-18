const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController"); // استيراد المتحكم
const auth = require("../middleware/authMiddleware");
const { getAllOrdersrr } = require("../controllers/statistic");

// الحصول على كل الطلبات
router.get("/orders",auth, orderController.getAllOrders);
router.get("/order",getAllOrdersrr);

// الحصول على طلب معين باستخدام ID
router.put("/update/:orderId", orderController.updateOrderStatus);

module.exports = router;
