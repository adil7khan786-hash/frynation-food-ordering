/**
 * FRYNATION PAKISTAN - SHOPPING CART MANAGER
 * Handles localStorage persistence, quantity updates, promotional discounts,
 * provincial taxes, and reactive state updates.
 */

import { RESTAURANT_INFO, PROMO_CODES } from '../data/products.js';

const CART_STORAGE_KEY = 'frynation_cart_items_v1';
const PROMO_STORAGE_KEY = 'frynation_applied_promo_v1';

class CartManager {
  constructor() {
    this.items = this.loadFromStorage();
    this.promo = this.loadPromoFromStorage();
    this.listeners = [];
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
      return [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      if (this.promo) {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(this.promo));
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }

  loadPromoFromStorage() {
    try {
      const saved = localStorage.getItem(PROMO_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.saveToStorage();
    const summary = this.getSummary();
    this.listeners.forEach(cb => cb(this.items, summary));
    // Dispatch custom DOM event for multi-component reactivity
    window.dispatchEvent(new CustomEvent('frynation:cart-updated', {
      detail: { items: this.items, summary }
    }));
  }

  addItem(product, quantity = 1, options = {}) {
    const itemKey = `${product.id}_${options.spiceLevel || 'Standard'}_${(options.addons || []).map(a => a.name).sort().join('_')}`;
    
    // Calculate additional price for addons
    const addonsCost = (options.addons || []).reduce((sum, add) => sum + (add.price || 0), 0);
    const unitPrice = product.price + addonsCost;

    const existingIndex = this.items.findIndex(item => item.key === itemKey);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        key: itemKey,
        id: product.id,
        name: product.name,
        category: product.category,
        basePrice: product.price,
        unitPrice: unitPrice,
        image: product.image,
        portion: product.portion,
        spiceLevel: options.spiceLevel || product.spiceLevel || 'Mild',
        addons: options.addons || [],
        notes: options.notes || '',
        quantity: quantity
      });
    }

    this.notify();
    return true;
  }

  updateQuantity(itemKey, delta) {
    const index = this.items.findIndex(item => item.key === itemKey);
    if (index === -1) return;

    this.items[index].quantity += delta;
    if (this.items[index].quantity <= 0) {
      this.items.splice(index, 1);
    }

    this.notify();
  }

  removeItem(itemKey) {
    this.items = this.items.filter(item => item.key !== itemKey);
    this.notify();
  }

  clearCart() {
    this.items = [];
    this.promo = null;
    this.notify();
  }

  applyPromo(codeString) {
    const cleanCode = (codeString || '').trim().toUpperCase();
    const promoConfig = PROMO_CODES[cleanCode];

    if (!promoConfig) {
      return { success: false, message: 'Invalid promo code. Try WELCOME150 or CRAVEFREE.' };
    }

    const subtotal = this.getSubtotal();
    if (subtotal < promoConfig.minOrder) {
      return { 
        success: false, 
        message: `This coupon requires a minimum subtotal of Rs. ${promoConfig.minOrder.toLocaleString()}.` 
      };
    }

    this.promo = promoConfig;
    this.notify();
    return { success: true, message: `Coupon ${cleanCode} applied successfully!`, promo: promoConfig };
  }

  removePromo() {
    this.promo = null;
    this.notify();
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  getSummary() {
    const subtotal = this.getSubtotal();
    let deliveryFee = subtotal > 0 ? RESTAURANT_INFO.deliveryFee : 0;
    
    // Check free delivery threshold
    if (subtotal >= RESTAURANT_INFO.freeDeliveryThreshold) {
      deliveryFee = 0;
    }

    let discount = 0;
    if (this.promo) {
      if (this.promo.type === 'fixed') {
        discount = Math.min(this.promo.discount, subtotal);
      } else if (this.promo.type === 'percentage') {
        discount = Math.round((subtotal * this.promo.percentage) / 100);
      } else if (this.promo.type === 'free_delivery') {
        discount = deliveryFee;
        deliveryFee = 0;
      }
    }

    // Standard fast-food provincial sales tax (included or transparent itemized)
    const taxableAmount = Math.max(0, subtotal - discount);
    // In our pricing, fast food prices in Pakistan are typically inclusive of GST,
    // but we can itemize it transparently for academic excellence:
    const calculatedGst = Math.round(taxableAmount * RESTAURANT_INFO.gstRate);
    const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

    return {
      itemCount: this.getItemCount(),
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      isFreeDelivery: deliveryFee === 0 && subtotal > 0,
      freeDeliveryRemaining: Math.max(0, RESTAURANT_INFO.freeDeliveryThreshold - subtotal),
      discount: discount,
      appliedPromo: this.promo,
      gstAmount: calculatedGst,
      grandTotal: grandTotal,
      currency: RESTAURANT_INFO.currency
    };
  }
}

export const cart = new CartManager();
