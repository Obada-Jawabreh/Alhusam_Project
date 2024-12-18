import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, MapPin, Mail, Phone, User, AlertCircle, DollarSign } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/cart', {
        withCredentials: true
      });
      setCartItems(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      setError('Failed to fetch cart items');
      console.error('Error fetching cart:', error);
    }
  };

  const handleDeliveryInfoChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const orderData = {
      items: cartItems,
      total,
      paymentMethod,
      ...deliveryInfo
    };

    try {
      await axios.post('http://localhost:5000/api/user/create', orderData, {
        withCredentials: true
      });
      navigate("/"); // Handle successful order (e.g., redirect)
    } catch (error) {
      setError('Order creation failed');
      console.error('Order creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <h1 className="text-3xl font-bold flex items-center">
            <ShoppingCart className="mr-3" /> Checkout
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
            <AlertCircle className="inline-block mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal and Delivery Information Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-600 flex items-center">
                <User className="mr-2" /> Personal Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={deliveryInfo.firstName}
                  onChange={handleDeliveryInfoChange}
                  placeholder="الاسم الأول"
                  required
                  className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="lastName"
                  value={deliveryInfo.lastName}
                  onChange={handleDeliveryInfoChange}
                  placeholder="الاسم الأخير"
                  required
                  className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg"
                />
              </div>
              <input
                type="email"
                name="email"
                value={deliveryInfo.email}
                onChange={handleDeliveryInfoChange}
                placeholder="البريد الالكتروني"
                required
                className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg"
              />
              <input
                type="tel"
                name="phone"
                value={deliveryInfo.phone}
                onChange={handleDeliveryInfoChange}
                placeholder="رقم الهاتف"
                required
                className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg"
              />
            </div>

            {/* Delivery Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-600 flex items-center">
                <MapPin className="mr-2" /> Delivery Address
              </h2>
              <input
                type="text"
                name="street"
                value={deliveryInfo.street}
                onChange={handleDeliveryInfoChange}
                placeholder="عنوان الشارع"
                required
                className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  value={deliveryInfo.city}
                  onChange={handleDeliveryInfoChange}
                  placeholder="المدينة"
                  required
                  className="w-full pl-3 pr-3 py-2 border-2 border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="state"
                  value={deliveryInfo.state}
                  onChange={handleDeliveryInfoChange}
                  placeholder="المحافظة"
                  required
                  className="w-full pl-3 pr-3 py-2 border-2 border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="zipCode"
                  value={deliveryInfo.zipCode}
                  onChange={handleDeliveryInfoChange}
                  placeholder="الرمز البريدي"
                  required
                  className="w-full pl-3 pr-3 py-2 border-2 border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-600 flex items-center">
              <DollarSign className="mr-2" /> Payment Method
            </h2>
            <div className="flex space-x-6 mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="mr-2 hidden peer"
                />
                <div className="p-3 border-2 rounded-lg peer-checked:border-purple-500 peer-checked:text-purple-600 transition">
                  الدفع كاش
                </div>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="cliq"
                  checked={paymentMethod === 'cliq'}
                  onChange={() => setPaymentMethod('cliq')}
                  className="mr-2 hidden peer"
                />
                <div className="p-3 border-2 rounded-lg peer-checked:border-purple-500 peer-checked:text-purple-600 transition">
                  الدفع باستخدام CliQ
                </div>
              </label>
            </div>

            {paymentMethod === 'cliq' && (
              <div className="bg-gray-100 p-4 rounded-lg">
                {/* Add CliQ payment integration details here */}
                IBAN: JO71CBJO001000000000123456789
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-600 flex items-center">
              <ShoppingCart className="mr-2" /> Order Summary
            </h2>
            {cartItems.map(item => (
              <div key={item.product._id} className="flex justify-between mb-2">
                <span>{item.product.titleAr}</span>
                <span>{item.price * item.quantity} دينار</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 text-xl font-bold text-purple-700">
              Total: {total} دينار
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-bold transition duration-300 flex items-center justify-center ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
            }`}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
