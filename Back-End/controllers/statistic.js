const Order = require("../models/order"); // استيراد نموذج الـ Order

// الحصول على كل الطلبات

exports.getAllOrdersrr = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // يمكننا استخدام populate لملء البيانات المرتبطة
      .populate("provider", "name serviceType")
      .populate("items.product", "name price"); // Populate المنتجات في كل طلب

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};