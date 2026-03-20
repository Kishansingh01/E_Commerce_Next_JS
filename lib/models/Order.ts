import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String },
  image: { type: String }
});

const OrderSchema = new mongoose.Schema({
  user: {
    // Optional link to a registered user id
    type: String, // Changed to String to accommodate custom 32-char hex IDs
    ref: 'User',
    required: false,
  },
  
  // Personal Info
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  
  // Shipping Address
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  
  // Payment Info - NEVER STORE RAW PANs/CVCs IN PRODUCTION
  // For this mock demo, we'll store basic masked data, but in reality this goes entirely to Stripe/Razorpay
  paymentMaskedInfo: {
    last4: { type: String },
    cardType: { type: String, default: 'card' }
  },

  // Cart & Pricing
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  total: { type: Number, required: true },

  // Order Metadata
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent Mongoose from using the cached model during Next.js hot reloads
if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
