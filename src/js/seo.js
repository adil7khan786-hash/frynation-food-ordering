/**
 * FRYNATION PAKISTAN - SEO & STRUCTURED DATA CONTROLLER
 * Optimized for SEMrush Technical Audits, Google Rich Results & Local Pakistani Search
 */

import { RESTAURANT_INFO, PRODUCTS } from '../data/products.js';

export const SEO_PAGES = {
  home: {
    title: 'FryNation Pakistan | Best Loaded Fries in Karachi & Beef Smash',
    description: 'Satisfy your fries craving! Order best loaded fries in Karachi, beef smash burgers, crispy fish & shrimps, and crispy fried bucket. Late night craving open till 2 AM!',
    keywords: 'LOADED FRIES, BEEF SMASH, FRIES CRAVING, KARACHI FRIES, FISH & SHRIMPS, BEST GARLIC FRIES NEAR ME, LATE NIGH CRAVING OPEN TILL 2 AM, BUY 1 GET 1 FREE, CRISPY FRIED BUCKET, BEST LOADED FRIES IN KARACHI'
  },
  menu: {
    title: 'Explore Menu | Loaded Fries, Beef Smash, Fish & Shrimps | FryNation',
    description: 'Full menu with prices in PKR: Best garlic fries near me, authentic Karachi fries, double beef smash, crispy butterfly shrimps, and family fried chicken buckets.',
    keywords: 'LOADED FRIES, BEEF SMASH, KARACHI FRIES, FISH & SHRIMPS, BEST GARLIC FRIES NEAR ME, CRISPY FRIED BUCKET, BEST LOADED FRIES IN KARACHI'
  },
  deals: {
    title: 'Buy 1 Get 1 Free & Late Night Craving Deals Open Till 2 AM | FryNation',
    description: 'Huge fast food savings: Buy 1 Get 1 Free (BOGO), Late night craving open till 2 AM meal platters, and duo feast savings up to 28% off.',
    keywords: 'BUY 1 GET 1 FREE, LATE NIGH CRAVING OPEN TILL 2 AM, FRIES CRAVING, LOADED FRIES, BEEF SMASH, CRISPY FRIED BUCKET'
  },
  about: {
    title: 'About FryNation Pakistan | Best Loaded Fries in Karachi Story',
    description: 'Learn why FryNation is the home of authentic hand-cut potatoes, 100% Halal beef smash, fresh crispy fish & shrimps, and secret garlic mayo.',
    keywords: 'BEST LOADED FRIES IN KARACHI, KARACHI FRIES, BEEF SMASH, FRIES CRAVING'
  },
  contact: {
    title: 'Branches & Delivery Helpline | Open Till 2 AM | FryNation',
    description: 'Call our central UAN helpline +92 (021) 111-379-628. Serving Karachi, Lahore, and Islamabad late night till 2:00 AM.',
    keywords: 'LATE NIGH CRAVING OPEN TILL 2 AM, KARACHI FRIES, BEST GARLIC FRIES NEAR ME'
  },
  checkout: {
    title: 'Secure Checkout | Demo Food Ordering | FryNation Pakistan',
    description: 'Review your order summary, select delivery area, and place your fast-food order with Cash on Delivery or digital payment simulation.',
    keywords: 'food delivery checkout, cash on delivery fast food, frynation order'
  },
  orderSuccess: {
    title: 'Order Confirmed! Live Kitchen Tracker | FryNation Pakistan',
    description: 'Your FryNation order is being freshly prepared in our kitchen. Track live rider dispatch and delivery ETA.',
    keywords: 'order tracking, live food delivery status, frynation receipt'
  },
  tracking: {
    title: 'Track Your Live Order | FryNation Pakistan Delivery Status',
    description: 'Enter your FryNation order reference ID to check real-time kitchen preparation and express rider delivery updates.',
    keywords: 'track food order pakistan, live delivery status, frynation order lookup'
  }
};

export function updatePageSEO(pageKey = 'home') {
  const meta = SEO_PAGES[pageKey] || SEO_PAGES.home;
  
  // 1. Update Document Title
  document.title = meta.title;

  // 2. Update Meta Description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.name = 'description';
    document.head.appendChild(descTag);
  }
  descTag.content = meta.description;

  // 3. Update Meta Keywords (for SEO tools like SEMrush & legacy parsers)
  let kwTag = document.querySelector('meta[name="keywords"]');
  if (!kwTag) {
    kwTag = document.createElement('meta');
    kwTag.name = 'keywords';
    document.head.appendChild(kwTag);
  }
  kwTag.content = meta.keywords;

  // 4. Update OpenGraph Tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = meta.title;

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = meta.description;
}

export function injectStructuredData() {
  // Build Restaurant and Menu Schema for Google Search Rich Results
  const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': 'FastFoodRestaurant',
    'name': RESTAURANT_INFO.brandName,
    'image': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1200&q=80',
    '@id': 'https://frynation.pk',
    'url': 'https://frynation.pk',
    'telephone': RESTAURANT_INFO.helpline,
    'servesCuisine': ['Fast Food', 'Belgian Loaded Fries', 'American Smashed Burgers', 'Pakistani Street Food'],
    'priceRange': 'PKR 300 - PKR 3500',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Main Khayaban-e-Shahbaz, Phase 6, DHA',
      'addressLocality': 'Karachi',
      'addressRegion': 'Sindh',
      'postalCode': '75500',
      'addressCountry': 'PK'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 24.8142,
      'longitude': 67.0658
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '12:00',
        'closes': '02:00'
      }
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '15820',
      'bestRating': '5',
      'worstRating': '1'
    },
    'hasMenu': {
      '@type': 'Menu',
      'name': 'FryNation Official Online Menu',
      'hasMenuItem': PRODUCTS.slice(0, 10).map(product => ({
        '@type': 'MenuItem',
        'name': product.name,
        'description': product.description,
        'image': product.image,
        'offers': {
          '@type': 'Offer',
          'price': product.price,
          'priceCurrency': 'PKR',
          'availability': 'https://schema.org/InStock'
        }
      }))
    }
  };

  const scriptId = 'frynation-structured-data';
  let scriptTag = document.getElementById(scriptId);
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = scriptId;
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }
  scriptTag.textContent = JSON.stringify(restaurantSchema, null, 2);
}
