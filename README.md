# 🍟 FryNation Pakistan - Online Food Ordering Platform
### University Academic Capstone / Web Development Project

**FryNation** is a modern, responsive, high-performance web application for online fast-food ordering inspired by the user experience and menu style of popular Pakistani quick-service brands (such as OPTP, Daily Deli, and Ranchers). 

> **Academic Project Note:** This project features an **original brand identity, original color schemes, custom UI components, and mock food data**. It contains zero copyrighted assets or proprietary code from existing commercial brands.

---

## 🌟 Key Features

1. **Brand Identity & Responsive UI:**
   - Bold fast-food visual theme with Sizzling Red (`#E52020`), Cheddar Gold (`#F59E0B`), and Deep Midnight Slate (`#0F172A`).
   - 100% responsive across mobile smartphones, tablets, and widescreen desktop monitors.
   - Smooth micro-interactions, badge pulsing, and celebratory order confetti.

2. **Menu Discovery & Filtering:**
   - 6 category tabs: Hand-Cut Loaded Fries, Smashed Gourmet Burgers, Crispy Fried Chicken, Super Saver Deals, Artisan Dips, and Chilled Drinks.
   - Instant real-time search filtering by name, ingredients, or dietary tags.
   - Product details modal with spice level selection and add-on dip customizers.

3. **Persistent Shopping Cart:**
   - `localStorage` persistence — your cart items stay safe even on page refresh.
   - Live header cart badge counter with bounce animations.
   - Slide-over drawer with item increment (`+`), decrement (`-`), and removal (`🗑️`).
   - Dynamic price calculation: Subtotal, Delivery Fee (Free over Rs. 1,500), Promo Discount, and Grand Total in PKR.
   - Coupon system: Test with `WELCOME150` (Rs. 150 off) and `CRAVEFREE` (Free delivery).

4. **Demo Checkout & Order Confirmation:**
   - Delivery modal with Pakistani phone number validation (`0300-1234567`).
   - Multi-city selector: Karachi (Clifton, DHA, Gulshan), Lahore (Gulberg, DHA), Islamabad (F-7, F-10), Rawalpindi.
   - Payment method selection (Cash on Delivery demo & JazzCash/EasyPaisa demo).
   - Generates simulated Order Reference ID (e.g., `#FN-84291`).
   - 4-step visual live order status tracker (Order Received -> In Kitchen -> With Rider -> Delivered).

5. **Live Order Lookup:**
   - Dedicated "Live Tracker" tab where customers can input their Order ID to track real-time delivery status.
   - Displays device order history.

6. **SEO & SEMrush Ready:**
   - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).
   - Schema.org JSON-LD structured data (`FastFoodRestaurant`, `Menu`, `MenuItem`).
   - Complete `sitemap.xml` and `robots.txt`.
   - Comprehensive `SEO_SEMRUSH_GUIDE.md` included for keyword research & site health auditing.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Rationale / Academic Trade-Off |
| :--- | :--- | :--- |
| **Frontend Runtime** | Modern ES Modules + Native Web Standards | **Zero-Build Portability**: Can be launched instantly in any browser with zero installation friction, while fully compatible with Vite for production bundling. |
| **UI & Styling** | Custom Fast-Food Design System (CSS Variables) | Lightweight, 0 runtime overhead, accessible contrast ratios, high-performance animations without heavyweight CSS libraries. |
| **Data Architecture** | Centralized JavaScript Store (`src/data/products.js`) | Single source of truth. Allows instant editing of prices, names, and images without touching UI components. |
| **State & Persistence** | Browser `localStorage` + Custom Event Dispatchers | Reactive multi-component synchronization without external state library bloat. |
| **Tooling / Bundler** | Vite 5.x / Static HTML5 | Fast HMR and instant static deployment to Vercel/Netlify. |

---

## 📁 Project Directory Structure

```text
frynation-food-ordering/
├── index.html                   # Main Single Page Application entrypoint
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # XML sitemap for Google & SEMrush
├── package.json                 # Node & Vite dependencies
├── vite.config.js               # Vite build configuration
├── SEO_SEMRUSH_GUIDE.md         # In-depth SEMrush & SEO audit manual
├── README.md                    # Project documentation
├── public/
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── css/
    │   └── styles.css           # Design tokens, responsive grid, drawer, animations
    ├── data/
    │   └── products.js          # Centralized product catalog & restaurant details
    └── js/
        ├── app.js               # Application coordinator, rendering & routing
        ├── cart.js              # Reactive cart manager with localStorage
        ├── checkout.js          # Form validation & demo order generator
        └── seo.js               # Schema.org JSON-LD & dynamic meta tags
```

---

## 📝 How to Update Product Names, Prices, and Images

All menu products are centralized in `src/data/products.js`. You do **not** need to touch any HTML or JS UI code to add, edit, or remove products.

### Example: Modifying or Adding a Product
Open `src/data/products.js` in your favorite editor:

```javascript
{
  id: 'fn-fries-01',                               // Unique ID
  name: 'Garlic Mayo Loaded Fries',                // Product Title
  category: 'fries',                               // 'fries', 'burgers', 'chicken', 'deals', 'dips', 'drinks'
  price: 690,                                      // Price in PKR
  originalPrice: 790,                              // Optional discount comparison
  description: 'Hand-cut crispy potatoes topped with garlic mayo sauce.',
  image: 'https://images.unsplash.com/...',        // URL or local path (/images/item.jpg)
  badge: 'Bestseller',                             // Optional badge (e.g. 'Spicy 🔥', 'New')
  spiceLevel: 'Mild',                              // 'Mild', 'Medium', 'Hot'
  portion: 'Large (350g)',                         // Portion or weight
  isAvailable: true,                               // Set to false if out of stock
  tags: ['loaded fries', 'garlic mayo']            // Keywords for search bar
}
```

---

## 🚀 Running the Project Locally

### Option 1: Direct Browser Launch (Simplest - No Node Required)
1. Navigate to the project folder:
   `frynation-food-ordering/`
2. Double-click `index.html` or right-click -> **Open with Google Chrome / Microsoft Edge**.
3. The entire application runs natively with full functionality!

### Option 2: Using Vite / Node.js
If you have Node.js installed:
```bash
# 1. Install Vite
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🌐 Free Production Deployment (Vercel / Netlify / GitHub Pages)

### Deploying to Vercel (Recommended):
1. Push the `frynation-food-ordering` folder to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com) with GitHub.
3. Click **"Add New..."** -> **"Project"** and select the repository.
4. Framework Preset: Choose **"Other"** or **"Vite"** (Root Directory: `./`).
5. Click **"Deploy"**. Your live URL (e.g. `https://frynation-pk.vercel.app`) will be live within 30 seconds!

### Deploying to Netlify (Drag and Drop):
1. Sign in to [Netlify](https://app.netlify.com).
2. Go to the **"Sites"** tab.
3. Drag and drop the `frynation-food-ordering` folder directly into the Netlify dashboard.
4. Netlify will instantly provide a public HTTPS URL!
