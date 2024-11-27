
const orderItemSchema = new mongoose.Schema({
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  });
  
  const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] },
    paymentMethod: { type: String, required: true },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    }
  }, { timestamps: true });
  
  const Order = mongoose.model('Order', orderSchema);
  
  module.exports = Order;