/**
 * FRYNATION PAKISTAN - ORDER & CHECKOUT PROCESSOR
 * Handles validation, local order persistence, tracking simulator, and demo receipts.
 */

import { cart } from './cart.js';
import { RESTAURANT_INFO } from '../data/products.js';

const ORDERS_STORAGE_KEY = 'frynation_orders_history_v1';

export function getOrderHistory() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveOrderToHistory(order) {
  try {
    const history = getOrderHistory();
    history.unshift(order);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(history.slice(0, 20))); // Keep last 20
  } catch (e) {
    console.warn('Could not save order history', e);
  }
}

export function getOrderById(orderId) {
  const history = getOrderHistory();
  return history.find(o => o.orderId.toUpperCase() === orderId.trim().toUpperCase()) || null;
}

export function validateCheckoutForm(formData) {
  const errors = {};

  if (!formData.fullName || formData.fullName.trim().length < 3) {
    errors.fullName = 'Please enter your full name (at least 3 characters).';
  }

  // Pakistani phone number format validation (03001234567, 0300-1234567, or +923001234567)
  const phoneRegex = /^((\+92)|(0092)|(92)|(0))?3[0-9]{2}[-\s]?[0-9]{7}$/;
  const cleanPhone = (formData.phone || '').replace(/[\s-]/g, '');
  if (!phoneRegex.test(cleanPhone)) {
    errors.phone = 'Please enter a valid Pakistani mobile number (e.g., 0300-1234567 or +923001234567).';
  }

  if (!formData.city) {
    errors.city = 'Please select your delivery city.';
  }

  if (!formData.address || formData.address.trim().length < 8) {
    errors.address = 'Please provide a detailed delivery address (House/Flat #, Street, Landmark).';
  }

  const cartSummary = cart.getSummary();
  if (cartSummary.itemCount === 0) {
    errors.cart = 'Your cart is empty. Please add some food items before checking out!';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function processDemoOrder(formData) {
  const validation = validateCheckoutForm(formData);
  if (!validation.isValid) {
    return { success: false, errors: validation.errors };
  }

  const cartSummary = cart.getSummary();
  const cartItems = [...cart.items];

  // Generate unique order ID
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const orderId = `FN-${randomNum}`;
  const now = new Date();

  // Estimated delivery time: 35 to 45 mins from now
  const estDeliveryTime = new Date(now.getTime() + 35 * 60000);

  const orderRecord = {
    orderId: orderId,
    timestamp: now.toISOString(),
    formattedDate: now.toLocaleDateString('en-PK', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    estimatedDelivery: estDeliveryTime.toLocaleTimeString('en-PK', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: 'Confirmed', // Steps: 'Confirmed' -> 'Preparing' -> 'Out for Delivery' -> 'Delivered'
    statusCode: 1, // 1 to 4
    customer: {
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      city: formData.city,
      area: formData.area || 'Central Area',
      address: formData.address.trim(),
      orderNotes: formData.orderNotes ? formData.orderNotes.trim() : ''
    },
    payment: {
      method: formData.paymentMethod || 'Cash on Delivery (COD)',
      isDemo: true,
      status: 'Pending Payment at Doorstep'
    },
    items: cartItems,
    summary: {
      itemCount: cartSummary.itemCount,
      subtotal: cartSummary.subtotal,
      deliveryFee: cartSummary.deliveryFee,
      discount: cartSummary.discount,
      appliedPromo: cartSummary.appliedPromo ? cartSummary.appliedPromo.code : null,
      gstAmount: cartSummary.gstAmount,
      grandTotal: cartSummary.grandTotal,
      currency: RESTAURANT_INFO.currency
    }
  };

  // Save to persistent history
  saveOrderToHistory(orderRecord);

  // Clear shopping cart
  cart.clearCart();

  return {
    success: true,
    order: orderRecord
  };
}
