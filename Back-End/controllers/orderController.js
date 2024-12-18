const Order = require("../models/order"); // استيراد نموذج الـ Order

// الحصول على كل الطلبات
exports.getAllOrders = async (req, res) => {
  try {
    const providerId = req.user.id; // Assuming the authenticated provider's ID is in req.user.id

    // Filter orders by provider ID and exclude "Waiting for admin" status
    const orders = await Order.find({
      provider: providerId,
      providerStatus: { $ne: "Waiting for admin" }
    })
    .populate("user", "name email")
    .populate("provider", "name serviceType")
    .populate("items.product", "name price");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { providerStatus } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // تحديث حالة الطلب
    order.providerStatus = providerStatus;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};