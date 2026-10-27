# SEMrush & Technical SEO Strategy Guide
## Project: FryNation Pakistan Online Food Ordering
### Source Keyword Map: `IZHAN EXCEL SEO - KEYWORDS FOR OPTP BRAND`

> **Note on Tooling:** This website is pre-configured with on-page SEO signals, structured schema markup, and metadata architectures designed for easy auditing and campaign tracking via **SEMrush**. In accordance with academic integrity guidelines, no live SEMrush API keys or unverified rank claims are included in frontend code.

---

### 1. Izhan's OPTP Keyword Strategy Matrix (All 10 Items Implemented)

Below is the complete implementation mapping of the 10 target keywords from your Excel research sheet into the FryNation website:

| # | Target Keyword (From Excel) | Search Intent | Website Implementation Location | Target Landing View |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **`LOADED FRIES`** | Commercial / Transactional | Main Menu Category Pill, Card Title, Meta Keywords, Schema MenuItem | `/#menu` (Fries Filter) |
| **2** | **`BEEF SMASH`** | Transactional | Product: *Double Beef Smash Monarch* (`fn-burger-01`), Category Pill | `/#menu` (Burgers Filter) |
| **3** | **`FRIES CRAVING`** | Informational / Commercial | Hero Header Subtitle, Product: *Fries Craving Monster Platter* (`fn-fries-07`) | `/#home` & `/#menu` |
| **4** | **`KARACHI FRIES`** | Local / Transactional | Product: *Karachi Fries (Street-Style Masala)* (`fn-fries-04`), Footer link | `/#menu` (Fries Filter) |
| **5** | **`FISH & SHRIMPS`** | Commercial Investigation | Dedicated Category Pill, Product: *Crispy Butterfly Shrimps & Fries* (`fn-seafood-01`) | `/#menu` (Seafood Filter) |
| **6** | **`BEST GARLIC FRIES NEAR ME`** | High Local Intent (Near-Me) | Product description & alt tag for *Signature Garlic Mayo Loaded Fries* (`fn-fries-01`) | `/#menu` (Fries Filter) |
| **7** | **`LATE NIGH CRAVING OPEN TILL 2 AM`** | Local Intent / Time-Sensitive | Top Promo Header Strip, Product: *Late Night Craving Platter* (`fn-deal-04`), Coupon `MIDNIGHT2AM` | `/#deals` & Top Banner |
| **8** | **`BUY 1 GET 1 FREE`** | Transactional / Coupon | Promo Coupon `BOGO2026`, Product: *Buy 1 Get 1 Free BOGO Deal* (`fn-deal-05`) | `/#deals` & Cart Drawer |
| **9** | **`CRISPY FRIED BUCKET`** | Transactional (Family Size) | Product: *Crispy Fried Bucket 8 Pcs with Loaded Fries & Dips* (`fn-chick-05`) | `/#menu` (Chicken Filter) |
| **10** | **`BEST LOADED FRIES IN KARACHI`** | Local Authority / High Intent | Primary H1 Title, Meta Title, OpenGraph Tag, Product Title (`fn-fries-01`) | `/#home` & `/#menu` |

---

### 2. On-Page SEO Checklist Implemented

1. **Semantic HTML5 Structure:**
   - `<header role="banner">`, `<nav role="navigation">`, `<main role="main">`, `<article itemscope itemtype="https://schema.org/MenuItem">`, `<aside role="dialog">`, `<footer role="contentinfo">`.
   - Strict `H1` -> `H2` -> `H3` heading hierarchy with zero skipped levels.

2. **Dynamic Title & Meta Descriptions:**
   - Managed centrally in `src/js/seo.js` via the `updatePageSEO(pageKey)` function.
   - All 10 keywords are baked directly into `<meta name="keywords">` and dynamic page titles.

3. **Structured Data (Schema.org JSON-LD):**
   - Implemented in `src/js/seo.js` and injected into the `<head>` at runtime:
     - `FastFoodRestaurant`: Name, Geo-coordinates, UAN telephone, price range, opening hours specification (12:00 PM – 02:00 AM), aggregate rating (4.9/5.0).
     - `Menu` & `MenuItem`: Product names, descriptions, images, PKR currencies, and `InStock` availability.
   - Ready for Google Rich Results Test (https://search.google.com/test/rich-results).

4. **Open Graph & Twitter Cards:**
   - Complete `og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`, and `og:locale` (`en_PK`) in `index.html`.

5. **Search Engine Crawler Directives:**
   - `robots.txt`: Directs all user-agents, allows indexing of assets, specifies sitemap URL.
   - `sitemap.xml`: Complete XML sitemap following `sitemaps.org` protocol with image extensions.

---

### 3. Step-by-Step SEMrush Audit Workflow

When auditing this website with SEMrush after deployment:

1. **Set Up a Project in SEMrush:**
   - Go to **Projects** -> **Create Project**.
   - Enter your deployed live domain.

2. **Run Site Audit:**
   - Target Score: **95%+ Site Health**.
   - Validates zero broken links, image alt attributes, and Core Web Vitals.

3. **Track Izhan's 10 Target Keywords:**
   - In **Position Tracking**, add your 10 keywords:
     `LOADED FRIES`, `BEEF SMASH`, `FRIES CRAVING`, `KARACHI FRIES`, `FISH & SHRIMPS`, `BEST GARLIC FRIES NEAR ME`, `LATE NIGH CRAVING OPEN TILL 2 AM`, `BUY 1 GET 1 FREE`, `CRISPY FRIED BUCKET`, `BEST LOADED FRIES IN KARACHI`.
   - Set Search Engine: **Google Pakistan (google.com.pk)**, Device: **Mobile & Desktop**.
