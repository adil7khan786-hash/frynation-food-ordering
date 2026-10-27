/**
 * FRYNATION PAKISTAN - CORE APPLICATION CONTROLLER
 * High-performance, modular SPA architecture inspired by top Pakistani QSR platforms.
 */

import { PRODUCTS, CATEGORIES, RESTAURANT_INFO, PROMO_CODES } from '../data/products.js';
import { cart } from './cart.js';
import { processDemoOrder, getOrderById, getOrderHistory } from './checkout.js';
import { updatePageSEO, injectStructuredData } from './seo.js';

class FryNationApp {
  constructor() {
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.activeModalProduct = null;
    this.activeOrder = null;

    this.init();
  }

  init() {
    // Inject JSON-LD Schema for SEO Rich Results
    injectStructuredData();

    // Setup Event Listeners
    this.setupNavigation();
    this.setupCartDrawer();
    this.setupCategoryFilters();
    this.setupSearch();
    this.setupCheckoutForm();
    this.setupOrderTracking();
    this.setupGlobalShortcuts();

    // Initial render
    this.renderCategories();
    this.renderProducts();
    this.updateCartUI();

    // Subscribe cart changes to UI updates
    cart.subscribe(() => {
      this.updateCartUI();
    });

    // Handle initial route
    this.handleRouting();
    window.addEventListener('hashchange', () => this.handleRouting());
  }

  // ================= NAVIGATION & ROUTING =================
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetView = link.getAttribute('data-view');
        if (targetView) {
          window.location.hash = targetView;
        }
      });
    });

    // Mobile hamburger menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-nav-drawer');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
      // Close mobile menu when a link is clicked
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileMenu.classList.remove('open'));
      });
    }
  }

  handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const mainSections = ['home', 'menu', 'deals', 'about', 'contact', 'tracking', 'order-success'];

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-view') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Toggle view visibility
    mainSections.forEach(sectionId => {
      const el = document.getElementById(`view-${sectionId}`);
      if (el) {
        if (hash === 'home') {
          // Home view shows hero + menu + deals teaser + promo banner
          el.style.display = (sectionId === 'home' || sectionId === 'menu') ? 'block' : 'none';
        } else if (hash === 'menu') {
          el.style.display = (sectionId === 'menu') ? 'block' : 'none';
        } else if (hash === 'deals') {
          el.style.display = (sectionId === 'menu') ? 'block' : 'none';
          this.filterCategory('deals');
        } else {
          el.style.display = (sectionId === hash) ? 'block' : 'none';
        }
      }
    });

    // Update dynamic SEO for the active page
    updatePageSEO(hash);

    // If tracking view requested, refresh tracking order history
    if (hash === 'tracking') {
      this.renderOrderTrackingList();
    }

    // Scroll top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ================= CATEGORIES & FILTERING =================
  renderCategories() {
    const container = document.getElementById('category-pills-container');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => `
      <button 
        type="button" 
        class="category-tab-btn ${this.currentCategory === cat.id ? 'active' : ''}" 
        data-category="${cat.id}"
        aria-label="Filter by ${cat.name}"
      >
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
      </button>
    `).join('');

    container.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-category');
        this.filterCategory(catId);
      });
    });
  }

  filterCategory(catId) {
    this.currentCategory = catId;
    document.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === catId);
    });
    this.renderProducts();
  }

  setupCategoryFilters() {
    // Quick category triggers from hero or promos
    document.querySelectorAll('[data-goto-category]').forEach(el => {
      el.addEventListener('click', (e) => {
        const cat = el.getAttribute('data-goto-category');
        window.location.hash = 'menu';
        this.filterCategory(cat);
      });
    });
  }

  setupSearch() {
    const searchInput = document.getElementById('menu-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderProducts();
    });
  }

  // ================= PRODUCTS RENDERING =================
  renderProducts() {
    const grid = document.getElementById('products-grid-container');
    if (!grid) return;

    let filtered = PRODUCTS.filter(p => {
      const matchCat = this.currentCategory === 'all' || p.category === this.currentCategory;
      const matchSearch = !this.searchQuery || 
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.description.toLowerCase().includes(this.searchQuery) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(this.searchQuery)));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">No delicious items found</h3>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Try searching for "Garlic Mayo", "Smash Burger", or reset filters.</p>
          <button class="btn btn-secondary" id="reset-search-btn">Show All Products</button>
        </div>
      `;
      document.getElementById('reset-search-btn')?.addEventListener('click', () => {
        this.currentCategory = 'all';
        this.searchQuery = '';
        const searchInput = document.getElementById('menu-search-input');
        if (searchInput) searchInput.value = '';
        this.renderCategories();
        this.renderProducts();
      });
      return;
    }

    grid.innerHTML = filtered.map(product => {
      const badgeHtml = product.badge ? `
        <span class="card-badge ${product.badge.includes('Value') || product.badge.includes('Special') ? 'gold' : ''}">
          ${product.badge}
        </span>
      ` : '';

      const discountHtml = product.originalPrice ? `
        <span class="original-price">Rs. ${product.originalPrice.toLocaleString()}</span>
      ` : '';

      return `
        <article class="product-card" data-product-id="${product.id}" itemscope itemtype="https://schema.org/MenuItem">
          <div class="card-media-wrapper">
            <img 
              src="${product.image}" 
              alt="${product.name} - FryNation Pakistan" 
              class="card-img" 
              loading="lazy"
              itemprop="image"
              onerror="this.src='https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80'"
            />
            ${badgeHtml}
            <span class="portion-tag">${product.portion || 'Standard'}</span>
          </div>

          <div class="card-content">
            <div class="card-header-row">
              <h3 class="product-name" itemprop="name">${product.name}</h3>
            </div>
            
            <p class="product-desc" itemprop="description">${product.description}</p>

            <div class="card-footer" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
              <meta itemprop="priceCurrency" content="PKR" />
              <meta itemprop="price" content="${product.price}" />
              <link itemprop="availability" href="https://schema.org/InStock" />

              <div class="price-box">
                <span class="current-price">Rs. ${product.price.toLocaleString()}</span>
                ${discountHtml}
              </div>

              <button 
                type="button" 
                class="add-btn quick-add-btn" 
                data-id="${product.id}"
                aria-label="Add ${product.name} to cart"
              >
                <span>Add</span>
                <span style="font-size: 1.1rem; line-height: 1;">+</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click events
    grid.querySelectorAll('.quick-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prodId = btn.getAttribute('data-id');
        const prod = PRODUCTS.find(p => p.id === prodId);
        if (prod) {
          cart.addItem(prod, 1);
          this.showToast(`Added ${prod.name} to cart! 🍟`);
          this.bounceCartButton();
        }
      });
    });

    // Clicking card opens customizer modal
    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.quick-add-btn')) return;
        const prodId = card.getAttribute('data-product-id');
        const prod = PRODUCTS.find(p => p.id === prodId);
        if (prod) {
          this.openProductModal(prod);
        }
      });
    });
  }

  // ================= PRODUCT CUSTOMIZATION MODAL =================
  openProductModal(product) {
    this.activeModalProduct = product;
    const modal = document.getElementById('product-detail-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="checkout-modal-card" style="max-width: 540px;">
        <button type="button" class="drawer-close-btn" id="modal-close-btn" style="position: absolute; top: 1rem; right: 1rem; z-index: 10;">&times;</button>
        
        <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; max-height: 240px; background: #000;">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 240px; object-fit: cover;" />
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <h2 style="font-size: 1.4rem; font-weight: 900;">${product.name}</h2>
          <span style="font-size: 1.3rem; font-weight: 900; color: var(--secondary);">Rs. ${product.price.toLocaleString()}</span>
        </div>

        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem; line-height: 1.5;">${product.description}</p>

        <!-- Spice Preference -->
        <div class="form-group">
          <label class="form-label">Spice Level Preference</label>
          <div style="display: flex; gap: 0.5rem;">
            ${['Mild & Tangy', 'Medium Spice', 'Fiery Hot 🔥'].map((spice, idx) => `
              <label style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.35rem; background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.6rem; border-radius: var(--radius-sm); font-size: 0.82rem; cursor: pointer;">
                <input type="radio" name="modal-spice" value="${spice}" ${idx === 0 ? 'checked' : ''} />
                <span>${spice}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Add-on Extras -->
        <div class="form-group">
          <label class="form-label">Add Gourmet Dips / Extras</label>
          <div style="display: flex; flex-direction: column; gap: 0.45rem;">
            <label style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); padding: 0.6rem 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: 0.88rem; cursor: pointer;">
              <span style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" class="modal-addon-check" data-name="Signature Garlic Mayo Dip" data-price="90" />
                Extra Garlic Mayo Cup
              </span>
              <span style="color: var(--secondary); font-weight: 700;">+Rs. 90</span>
            </label>

            <label style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); padding: 0.6rem 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: 0.88rem; cursor: pointer;">
              <span style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" class="modal-addon-check" data-name="Liquid Cheddar Dip" data-price="140" />
                Warm Liquid Cheddar Cup
              </span>
              <span style="color: var(--secondary); font-weight: 700;">+Rs. 140</span>
            </label>
          </div>
        </div>

        <!-- Quantity & Add Button -->
        <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1.5rem;">
          <div class="qty-control" style="padding: 0.4rem 0.75rem;">
            <button type="button" class="qty-btn" id="modal-qty-minus">-</button>
            <span class="qty-count" id="modal-qty-display" style="font-size: 1.1rem; min-width: 28px;">1</span>
            <button type="button" class="qty-btn" id="modal-qty-plus">+</button>
          </div>

          <button type="button" class="btn btn-primary" id="modal-add-cart-btn" style="flex: 1;">
            Add to Order • <span id="modal-total-display">Rs. ${product.price.toLocaleString()}</span>
          </button>
        </div>
      </div>
    `;

    let modalQty = 1;
    const qtyDisplay = modal.querySelector('#modal-qty-display');
    const totalDisplay = modal.querySelector('#modal-total-display');

    const recalculateModalTotal = () => {
      let addonCost = 0;
      modal.querySelectorAll('.modal-addon-check:checked').forEach(c => {
        addonCost += parseInt(c.getAttribute('data-price'), 10) || 0;
      });
      const grand = (product.price + addonCost) * modalQty;
      totalDisplay.textContent = `Rs. ${grand.toLocaleString()}`;
    };

    modal.querySelector('#modal-qty-plus').addEventListener('click', () => {
      modalQty++;
      qtyDisplay.textContent = modalQty;
      recalculateModalTotal();
    });

    modal.querySelector('#modal-qty-minus').addEventListener('click', () => {
      if (modalQty > 1) {
        modalQty--;
        qtyDisplay.textContent = modalQty;
        recalculateModalTotal();
      }
    });

    modal.querySelectorAll('.modal-addon-check').forEach(chk => {
      chk.addEventListener('change', recalculateModalTotal);
    });

    modal.querySelector('#modal-close-btn').addEventListener('click', () => {
      modal.classList.remove('open');
    });

    modal.querySelector('#modal-add-cart-btn').addEventListener('click', () => {
      const selectedSpice = modal.querySelector('input[name="modal-spice"]:checked')?.value || 'Mild';
      const selectedAddons = [];
      modal.querySelectorAll('.modal-addon-check:checked').forEach(c => {
        selectedAddons.push({
          name: c.getAttribute('data-name'),
          price: parseInt(c.getAttribute('data-price'), 10)
        });
      });

      cart.addItem(product, modalQty, {
        spiceLevel: selectedSpice,
        addons: selectedAddons
      });

      modal.classList.remove('open');
      this.showToast(`Added ${modalQty}x ${product.name} to order! 🍟`);
      this.bounceCartButton();
    });

    modal.classList.add('open');
  }

  // ================= CART DRAWER & STATE =================
  setupCartDrawer() {
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const drawer = document.getElementById('cart-drawer');
    const toggleBtns = document.querySelectorAll('.cart-toggle-btn');
    const closeBtn = document.getElementById('cart-drawer-close');

    const openDrawer = () => {
      backdrop.classList.add('open');
      drawer.classList.add('open');
    };

    const closeDrawer = () => {
      backdrop.classList.remove('open');
      drawer.classList.remove('open');
    };

    toggleBtns.forEach(btn => btn.addEventListener('click', openDrawer));
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeDrawer();
    });

    // Setup Promo Code input inside drawer
    const promoBtn = document.getElementById('apply-promo-btn');
    const promoInput = document.getElementById('promo-code-input');
    if (promoBtn && promoInput) {
      promoBtn.addEventListener('click', () => {
        const res = cart.applyPromo(promoInput.value);
        if (res.success) {
          this.showToast(res.message);
          promoInput.value = '';
        } else {
          this.showToast(res.message, true);
        }
      });
    }

    // Checkout button inside cart drawer opens checkout modal
    const proceedBtn = document.getElementById('drawer-proceed-checkout-btn');
    if (proceedBtn) {
      proceedBtn.addEventListener('click', () => {
        closeDrawer();
        this.openCheckoutModal();
      });
    }
  }

  updateCartUI() {
    const summary = cart.getSummary();
    const items = cart.items;

    // Update Header Badges
    document.querySelectorAll('.cart-badge-count').forEach(badge => {
      badge.textContent = summary.itemCount;
    });

    // Update Drawer list
    const listContainer = document.getElementById('cart-items-list');
    const footer = document.getElementById('cart-drawer-footer');
    if (!listContainer) return;

    if (items.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-icon">🛒</div>
          <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">Your Cart is Empty</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
            Fresh Belgian loaded fries and smashed burgers are waiting for you!
          </p>
          <button class="btn btn-primary" id="empty-cart-browse-btn" style="padding: 0.65rem 1.25rem; font-size: 0.9rem;">
            Browse Menu Now
          </button>
        </div>
      `;
      document.getElementById('empty-cart-browse-btn')?.addEventListener('click', () => {
        document.getElementById('cart-drawer-close')?.click();
        window.location.hash = 'menu';
      });

      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = 'block';

    listContainer.innerHTML = items.map(item => {
      const addonNotes = item.addons.length > 0 
        ? item.addons.map(a => `+ ${a.name}`).join(', ') 
        : '';

      return `
        <div class="cart-item-row" data-key="${item.key}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" onerror="this.src='https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=200&q=80'" />
          
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-meta">
              <span>${item.spiceLevel}</span>
              ${addonNotes ? ` • <span>${addonNotes}</span>` : ''}
            </div>
            <div class="cart-item-price">Rs. ${(item.unitPrice * item.quantity).toLocaleString()}</div>
          </div>

          <div style="display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between;">
            <button type="button" class="remove-cart-item-btn" data-key="${item.key}" style="background: none; border: none; color: #EF4444; cursor: pointer; font-size: 1rem; padding: 2px;" title="Remove item">
              🗑️
            </button>

            <div class="qty-control">
              <button type="button" class="qty-btn cart-qty-minus" data-key="${item.key}">-</button>
              <span class="qty-count">${item.quantity}</span>
              <button type="button" class="qty-btn cart-qty-plus" data-key="${item.key}">+</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach row events
    listContainer.querySelectorAll('.cart-qty-plus').forEach(b => {
      b.addEventListener('click', () => {
        cart.updateQuantity(b.getAttribute('data-key'), 1);
      });
    });

    listContainer.querySelectorAll('.cart-qty-minus').forEach(b => {
      b.addEventListener('click', () => {
        cart.updateQuantity(b.getAttribute('data-key'), -1);
      });
    });

    listContainer.querySelectorAll('.remove-cart-item-btn').forEach(b => {
      b.addEventListener('click', () => {
        cart.removeItem(b.getAttribute('data-key'));
      });
    });

    // Update Drawer Price Rows
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const deliveryEl = document.getElementById('cart-delivery-val');
    const discountRow = document.getElementById('cart-discount-row');
    const discountEl = document.getElementById('cart-discount-val');
    const totalEl = document.getElementById('cart-total-val');
    const freeDeliveryNotice = document.getElementById('free-delivery-notice');

    if (subtotalEl) subtotalEl.textContent = `Rs. ${summary.subtotal.toLocaleString()}`;
    
    if (deliveryEl) {
      if (summary.deliveryFee === 0) {
        deliveryEl.innerHTML = '<span style="color: var(--accent-green); font-weight: 800;">FREE</span>';
      } else {
        deliveryEl.textContent = `Rs. ${summary.deliveryFee.toLocaleString()}`;
      }
    }

    if (discountRow && discountEl) {
      if (summary.discount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `- Rs. ${summary.discount.toLocaleString()} (${summary.appliedPromo.code})`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (totalEl) totalEl.textContent = `Rs. ${summary.grandTotal.toLocaleString()}`;

    if (freeDeliveryNotice) {
      if (summary.isFreeDelivery) {
        freeDeliveryNotice.innerHTML = '🎉 You unlocked <strong>FREE EXPRESS DELIVERY!</strong>';
        freeDeliveryNotice.style.color = 'var(--accent-green)';
      } else if (summary.freeDeliveryRemaining > 0) {
        freeDeliveryNotice.innerHTML = `Add <strong>Rs. ${summary.freeDeliveryRemaining.toLocaleString()}</strong> more to get FREE Delivery!`;
        freeDeliveryNotice.style.color = 'var(--secondary)';
      }
    }
  }

  // ================= CHECKOUT MODAL & ORDER PROCESS =================
  openCheckoutModal() {
    const summary = cart.getSummary();
    if (summary.itemCount === 0) {
      this.showToast('Please add items to your cart first!', true);
      return;
    }

    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    // Populate order items preview in checkout
    const checkoutItemsSummary = document.getElementById('checkout-items-summary');
    if (checkoutItemsSummary) {
      checkoutItemsSummary.innerHTML = cart.items.map(i => `
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #CBD5E1; margin-bottom: 0.35rem;">
          <span>${i.quantity}x ${i.name}</span>
          <span style="font-weight: 700;">Rs. ${(i.unitPrice * i.quantity).toLocaleString()}</span>
        </div>
      `).join('');
    }

    // Update grand total in checkout button
    const checkoutBtnTotal = document.getElementById('checkout-submit-total');
    if (checkoutBtnTotal) {
      checkoutBtnTotal.textContent = `Rs. ${summary.grandTotal.toLocaleString()}`;
    }

    modal.classList.add('open');
  }

  setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    const modal = document.getElementById('checkout-modal');
    const closeBtn = document.getElementById('checkout-close-btn');

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    }

    // City Area sync
    const citySelect = document.getElementById('checkout-city');
    const areaSelect = document.getElementById('checkout-area');
    if (citySelect && areaSelect) {
      citySelect.addEventListener('change', (e) => {
        const selectedCity = RESTAURANT_INFO.cities.find(c => c.name === e.target.value);
        if (selectedCity) {
          areaSelect.innerHTML = selectedCity.areas.map(a => `<option value="${a}">${a}</option>`).join('');
        }
      });
      // Initial trigger
      if (citySelect.value) {
        citySelect.dispatchEvent(new Event('change'));
      }
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous error messages
        form.querySelectorAll('.error-text').forEach(el => el.textContent = '');
        form.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

        const formData = {
          fullName: document.getElementById('checkout-name')?.value,
          phone: document.getElementById('checkout-phone')?.value,
          city: document.getElementById('checkout-city')?.value,
          area: document.getElementById('checkout-area')?.value,
          address: document.getElementById('checkout-address')?.value,
          orderNotes: document.getElementById('checkout-notes')?.value,
          paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Cash on Delivery (COD)'
        };

        const result = processDemoOrder(formData);

        if (!result.success) {
          // Display validation errors
          for (const [field, msg] of Object.entries(result.errors)) {
            const errEl = document.getElementById(`error-${field}`);
            const inputEl = document.getElementById(`checkout-${field}`);
            if (errEl) errEl.textContent = msg;
            if (inputEl) inputEl.classList.add('error');
          }
          this.showToast('Please fix the highlighted errors before submitting.', true);
          return;
        }

        // Success! Close checkout modal
        modal.classList.remove('open');
        this.activeOrder = result.order;

        // Render confirmation view
        this.renderOrderConfirmation(result.order);
        window.location.hash = 'order-success';
        this.showToast('🎉 Demo Order placed successfully!');
      });
    }
  }

  // ================= ORDER CONFIRMATION & LIVE TRACKER =================
  renderOrderConfirmation(order) {
    const container = document.getElementById('order-success-details');
    if (!container) return;

    container.innerHTML = `
      <div class="order-success-card">
        <div class="success-icon-badge">✓</div>
        <h2 style="font-size: 2rem; font-weight: 900; margin-bottom: 0.25rem;">Order Confirmed!</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Thank you, <strong>${order.customer.fullName}</strong>. The FryNation kitchen is firing up your order!
        </p>

        <div class="order-id-badge">Order Reference: ${order.orderId}</div>

        <!-- 4-Step Visual Tracker -->
        <div class="timeline-tracker">
          <div class="timeline-step completed">
            <div class="step-node">✓</div>
            <span class="step-label">Order Received</span>
          </div>
          <div class="timeline-step active">
            <div class="step-node">🍳</div>
            <span class="step-label">In Kitchen</span>
          </div>
          <div class="timeline-step">
            <div class="step-node">🛵</div>
            <span class="step-label">With Rider</span>
          </div>
          <div class="timeline-step">
            <div class="step-node">📦</div>
            <span class="step-label">Delivered</span>
          </div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; text-align: left; margin: 2rem 0;">
          <h4 style="font-weight: 800; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.5rem;">
            Order Receipt & Delivery Details
          </h4>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem; font-size: 0.88rem;">
            <div>
              <span style="color: var(--text-muted); display: block;">Delivery Address:</span>
              <strong>${order.customer.address}, ${order.customer.area}, ${order.customer.city}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block;">Contact Number:</span>
              <strong>${order.customer.phone}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block;">Payment Mode:</span>
              <strong style="color: var(--secondary);">${order.payment.method}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block;">Estimated Delivery:</span>
              <strong style="color: var(--accent-green);">${order.estimatedDelivery} (35-40 mins)</strong>
            </div>
          </div>

          <!-- Items Breakdown -->
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 1rem;">
            ${order.items.map(it => `
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.4rem;">
                <span>${it.quantity}x ${it.name} (${it.spiceLevel})</span>
                <span style="font-weight: 700;">Rs. ${(it.unitPrice * it.quantity).toLocaleString()}</span>
              </div>
            `).join('')}

            <div style="display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 900; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px dashed var(--border-color); color: var(--secondary);">
              <span>Grand Total</span>
              <span>Rs. ${order.summary.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-secondary" onclick="window.print()">
            🖨️ Print Receipt
          </button>
          <a href="#menu" class="btn btn-primary">
            Order More Food
          </a>
        </div>
      </div>
    `;
  }

  setupOrderTracking() {
    const trackForm = document.getElementById('order-lookup-form');
    if (trackForm) {
      trackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('tracking-order-id');
        const id = (input?.value || '').trim();
        if (!id) return;

        const order = getOrderById(id);
        const resultContainer = document.getElementById('tracking-result-box');

        if (!order) {
          resultContainer.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #EF4444; color: #FCA5A5; padding: 1.25rem; border-radius: var(--radius-md); text-align: center;">
              ❌ No order found with reference <strong>${id}</strong>. Please check your order ID (e.g. FN-12345) or place a new order.
            </div>
          `;
          return;
        }

        resultContainer.innerHTML = `
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; margin-top: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="font-size: 1.2rem; font-weight: 800;">Order #${order.orderId}</h3>
              <span style="background: var(--secondary); color: black; font-weight: 800; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.8rem;">
                Status: In Kitchen 🍳
              </span>
            </div>
            
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
              Estimated Delivery: <strong style="color: var(--accent-green);">${order.estimatedDelivery}</strong> to <strong>${order.customer.address}, ${order.customer.city}</strong>
            </p>

            <div class="timeline-tracker">
              <div class="timeline-step completed">
                <div class="step-node">✓</div>
                <span class="step-label">Received</span>
              </div>
              <div class="timeline-step active">
                <div class="step-node">🍳</div>
                <span class="step-label">Kitchen</span>
              </div>
              <div class="timeline-step">
                <div class="step-node">🛵</div>
                <span class="step-label">Rider Out</span>
              </div>
              <div class="timeline-step">
                <div class="step-node">📦</div>
                <span class="step-label">Delivered</span>
              </div>
            </div>
          </div>
        `;
      });
    }
  }

  renderOrderTrackingList() {
    const historyContainer = document.getElementById('recent-orders-list');
    if (!historyContainer) return;

    const history = getOrderHistory();
    if (history.length === 0) {
      historyContainer.innerHTML = `
        <p style="color: var(--text-muted); font-size: 0.9rem;">
          No previous demo orders found on this device. Place an order to see it live!
        </p>
      `;
      return;
    }

    historyContainer.innerHTML = history.slice(0, 5).map(o => `
      <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.85rem 1rem; border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
        <div>
          <strong style="color: var(--secondary); font-family: monospace;">${o.orderId}</strong>
          <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem;">${o.formattedDate}</span>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${o.items.length} items • Rs. ${o.summary.grandTotal.toLocaleString()}</div>
        </div>

        <button 
          type="button" 
          class="btn btn-secondary" 
          style="padding: 0.35rem 0.85rem; font-size: 0.8rem;"
          onclick="document.getElementById('tracking-order-id').value='${o.orderId}'; document.getElementById('order-lookup-form').dispatchEvent(new Event('submit'));"
        >
          Track Live
        </button>
      </div>
    `).join('');
  }

  // ================= UTILITIES & SHORTCUTS =================
  setupGlobalShortcuts() {
    // Clickable promo codes
    document.querySelectorAll('.coupon-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const code = pill.textContent.trim();
        navigator.clipboard?.writeText(code);
        const res = cart.applyPromo(code);
        if (res.success) {
          this.showToast(`Coupon ${code} copied & applied! 🎉`);
        } else {
          this.showToast(`Coupon ${code} copied!`, false);
        }
      });
    });
  }

  bounceCartButton() {
    const btns = document.querySelectorAll('.cart-toggle-btn');
    btns.forEach(btn => {
      btn.style.transform = 'scale(1.15)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });
  }

  showToast(message, isError = false) {
    let container = document.getElementById('toast-notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-notification-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'error' : ''}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.fryNation = new FryNationApp();
});
