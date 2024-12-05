import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { MapPin, CreditCard, DollarSign } from 'lucide-react';

// Stripe configuration (replace with your actual publishable key)
const stripePromise = loadStripe('pk_test_51Pq8qdRr1S70aw7OTJtAwrka7pZ46PKd5fh71Lv7SwXg6EB0hYB7Duydyj3S2Lrr0wUcai5nqSiTpBXx4LmS6NaJ00c7gAz0nh');

export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        additionalInfo: ''
    });

    // Fetch cart items
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/cart', {
                    withCredentials: true
                });

                setCartItems(response.data.items || []);
                calculateTotal(response.data.items || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching cart:', err);
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    // Calculate total price
    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) =>
            sum + (item.price * item.quantity), 0
        );
        setTotalPrice(total);
    };


    // const calculateTotal = (items) => {
    //     const total = items.reduce((sum, item) => {
    //         // Use the product's price from the database, not the cart item's price
    //         return sum + (item.product.price * item.quantity);
    //     }, 0);
    //     setTotalPrice(total);
    // };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit order
    const submitOrder = async (paymentDetails = null) => {
        try {
            // Validation
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
                alert('Please fill in all required fields');
                return;
            }
    
            const orderData = {
                items: cartItems.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                    // Note: price will be recalculated on the server
                })),
                total: totalPrice,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                deliveryAddress: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode
                },
                info: formData.additionalInfo,
                paymentMethod: paymentMethod,
                // Remove paymentDetails from client-side for security
            };

            const response = await axios.post(
                'http://localhost:5000/api/user/create',
                orderData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Clear cart after successful order
            // await axios.delete('http://localhost:5000/api/user/cart/clear', {
            //     withCredentials: true
            // });

            // Redirect or show success message
            alert('Order placed successfully!');
            // Optional: redirect to orders page or show order details
        } catch (err) {
            console.error('Error creating order:', err.response ? err.response.data : err);
            alert(`Failed to place order: ${err.response ? err.response.data.message : 'Unknown error'}`);
        }
    };
    // Stripe payment component
    const StripePaymentForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleStripeSubmit = async (event) => {
            event.preventDefault();

            if (!stripe || !elements) {
                return;
            }

            const cardElement = elements.getElement(CardElement);

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.error('[error]', error);
                alert('Payment failed: ' + error.message);
                return;
            }

            // Submit order with payment method details
            submitOrder({
                stripePaymentMethodId: paymentMethod.id
            });
        };

        return (
            <form onSubmit={handleStripeSubmit} className="space-y-4">
                <CardElement 
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button 
                    type="submit"
                    disabled={!stripe}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Pay Now
                </button>
            </form>
        );
    };

    // Render loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-2xl text-gray-600 animate-pulse">
                    جار التحميل...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">ملخص الطلب</h2>
                    
                    {cartItems.map((item) => (
                        <div 
                            key={item.product._id} 
                            className="flex justify-between items-center border-b py-4"
                        >
                            <div>
                                <h3 className="text-xl font-semibold">{item.product.titleAr}</h3>
                                <p className="text-gray-600">الكمية: {item.quantity}</p>
                            </div>
                            <div className="text-xl font-bold">
                                {item.price * item.quantity} دينار
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 flex justify-between text-2xl font-bold">
                        <span>المجموع الكلي</span>
                        <span>{totalPrice} دينار</span>
                    </div>
                </div>

                {/* Checkout Form */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">تفاصيل الدفع والشحن</h2>
                    
                    {/* Payment Method Selection */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">اختر طريقة الدفع</h3>
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => setPaymentMethod('cash')}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                                    paymentMethod === 'cash' 
                                        ? 'bg-purple-600 text-white' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                <DollarSign size={24} />
                                <span>الدفع عند الاستلام</span>
                            </button>
                            <button 
                                onClick={() => setPaymentMethod('paypal')}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                                    paymentMethod === 'paypal' 
                                        ? 'bg-purple-600 text-white' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                <CreditCard size={24} />
                                <span>الدفع الإلكتروني</span>
                            </button>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="الاسم الأول"
                                className="w-full p-3 border rounded-lg"
                                required 
                            />
                            <input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="الاسم الأخير"
                                className="w-full p-3 border rounded-lg"
                                required 
                            />
                        </div>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="البريد الإلكتروني"
                            className="w-full p-3 border rounded-lg"
                            required 
                        />
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="رقم الهاتف"
                            className="w-full p-3 border rounded-lg"
                            required 
                        />

                        {/* Delivery Address */}
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                name="street"
                                value={formData.street}
                                onChange={handleInputChange}
                                placeholder="الشارع"
                                className="w-full p-3 border rounded-lg"
                                required 
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="المدينة"
                                    className="w-full p-3 border rounded-lg"
                                    required 
                                />
                                <input 
                                    type="text" 
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    placeholder="المنطقة"
                                    className="w-full p-3 border rounded-lg"
                                    required 
                                />
                            </div>
                            <input 
                                type="text" 
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                placeholder="الرمز البريدي"
                                className="w-full p-3 border rounded-lg"
                                required 
                            />
                        </div>

                        {/* Additional Info */}
                        <textarea 
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            placeholder="معلومات إضافية (اختياري)"
                            className="w-full p-3 border rounded-lg h-24"
                        />
                    </div>

                    {/* Payment Method Specific Rendering */}
                    {paymentMethod === 'paypal' && (
                        <Elements stripe={stripePromise}>
                            <StripePaymentForm />
                        </Elements>
                    )}

                    {/* Cash Payment Submit Button */}
                    {paymentMethod === 'cash' && (
                        <button 
                            onClick={() => submitOrder()}
                            className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors mt-6"
                        >
                            تأكيد الطلب
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}