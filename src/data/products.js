/**
 * FRYNATION PAKISTAN - CENTRALIZED PRODUCT CATALOG
 * 
 * Optimized with Izhan's SEO Keywords for OPTP-style fast food brand:
 * 1. LOADED FRIES
 * 2. BEEF SMASH
 * 3. FRIES CRAVING
 * 4. KARACHI FRIES
 * 5. FISH & SHRIMPS
 * 6. BEST GARLIC FRIES NEAR ME
 * 7. LATE NIGH CRAVING OPEN TILL 2 AM
 * 8. BUY 1 GET 1 FREE
 * 9. CRISPY FRIED BUCKET
 * 10. BEST LOADED FRIES IN KARACHI
 */

export const CATEGORIES = [
  { id: 'all', name: 'All Menu', icon: '🍽️', count: 28 },
  { id: 'fries', name: 'Loaded Fries', icon: '🍟', count: 8 },
  { id: 'burgers', name: 'Beef Smash & Burgers', icon: '🍔', count: 6 },
  { id: 'seafood', name: 'Fish & Shrimps', icon: '🍤', count: 3 },
  { id: 'chicken', name: 'Crispy Fried Chicken', icon: '🍗', count: 4 },
  { id: 'deals', name: 'Buy 1 Get 1 & Deals', icon: '🎁', count: 5 },
  { id: 'dips', name: 'Artisan Dips & Sauces', icon: '🥣', count: 4 },
  { id: 'drinks', name: 'Chilled Shakes & Drinks', icon: '🥤', count: 4 }
];

export const PRODUCTS = [
  // ================= 1. LOADED FRIES & KARACHI SPECIALS =================
  {
    id: 'fn-fries-01',
    name: 'Best Loaded Fries in Karachi (Signature Garlic Mayo)',
    category: 'fries',
    price: 690,
    originalPrice: 790,
    description: 'Voted the best garlic fries near me! Belgian-style fresh hand-cut crispy potatoes generously loaded with our house-blended creamy garlic mayo sauce and signature herb seasoning. Authentic Karachi fries experience.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    spiceLevel: 'Mild',
    portion: 'Large (350g)',
    isAvailable: true,
    calories: '540 kcal',
    tags: ['loaded fries', 'best loaded fries in karachi', 'best garlic fries near me', 'karachi fries', 'garlic mayo', 'fries craving']
  },
  {
    id: 'fn-fries-04',
    name: 'Karachi Fries (Street-Style Masala Crisp)',
    category: 'fries',
    price: 490,
    originalPrice: 550,
    description: 'Authentic Karachi street-style hand-cut potatoes tossed in 12 tangy secret spices and chaat masala. Served piping hot with tamarind-mint dip to satisfy your instant fries craving.',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
    badge: 'Karachi Favorite',
    spiceLevel: 'Medium',
    portion: 'Regular (280g)',
    isAvailable: true,
    calories: '390 kcal',
    tags: ['karachi fries', 'fries craving', 'masala fries', 'desi twist', 'loaded fries']
  },
  {
    id: 'fn-fries-07',
    name: 'Fries Craving Monster Platter',
    category: 'fries',
    price: 990,
    originalPrice: 1190,
    description: 'The ultimate cure for late-night fries craving! A giant platter of triple-cooked hand-cut fries, half drenched in signature garlic mayo and half in molten cheddar cheese with jalapeño coins.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    badge: 'Craving Special',
    spiceLevel: 'Medium',
    portion: 'Monster Box (500g)',
    isAvailable: true,
    calories: '750 kcal',
    tags: ['fries craving', 'loaded fries', 'karachi fries', 'late nigh craving open till 2 am']
  },
  {
    id: 'fn-fries-02',
    name: 'Fiery Jalapeño & Melted Cheddar Loaded Fries',
    category: 'fries',
    price: 790,
    originalPrice: 890,
    description: 'Triple-cooked golden fries drenched in hot liquid aged cheddar cheese sauce, topped with sliced pickled jalapeños, crushed chili flakes, and chipotle drizzle.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    badge: 'Spicy 🔥',
    spiceLevel: 'Hot',
    portion: 'Large (380g)',
    isAvailable: true,
    calories: '620 kcal',
    tags: ['cheese fries', 'cheddar', 'jalapeno', 'loaded fries', 'karachi fries']
  },
  {
    id: 'fn-fries-03',
    name: 'Smoked BBQ Beef Loaded Fries',
    category: 'fries',
    price: 890,
    originalPrice: 990,
    description: 'Hand-cut russet fries loaded with seasoned minced Angus beef smash bits, smoky hickory barbecue glaze, melted mozzarella, and caramelized onions.',
    image: 'https://images.unsplash.com/photo-1518013034458-30b0ee243591?auto=format&fit=crop&w=800&q=80',
    badge: 'Chef Special',
    spiceLevel: 'Medium',
    portion: 'Monster Box (450g)',
    isAvailable: true,
    calories: '710 kcal',
    tags: ['beef smash', 'loaded fries', 'bbq beef fries', 'karachi fries']
  },
  {
    id: 'fn-fries-05',
    name: 'Dynamite Buffalo Chicken Loaded Fries',
    category: 'fries',
    price: 850,
    originalPrice: 950,
    description: 'Crispy fried tenders bites tossed in tangy buffalo glaze, layered over golden crinkle fries with creamy ranch drizzle and spring onions.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    badge: 'Trending',
    spiceLevel: 'Hot',
    portion: 'Large (420g)',
    isAvailable: true,
    calories: '680 kcal',
    tags: ['buffalo fries', 'chicken fries', 'loaded fries', 'fries craving']
  },
  {
    id: 'fn-fries-06',
    name: 'Classic Sea Salt Belgian Hand-Cut Fries',
    category: 'fries',
    price: 420,
    originalPrice: 480,
    description: 'Pure, authentic double-fried potato perfection seasoned simply with fine Himalayan sea salt. The crisp exterior and fluffy interior you crave.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    badge: null,
    spiceLevel: 'Mild',
    portion: 'Regular (250g)',
    isAvailable: true,
    calories: '340 kcal',
    tags: ['plain fries', 'classic salted', 'crispy']
  },

  // ================= 2. BEEF SMASH BURGERS =================
  {
    id: 'fn-burger-01',
    name: 'Double Beef Smash Monarch',
    category: 'burgers',
    price: 1190,
    originalPrice: 1350,
    description: 'The definitive beef smash in Pakistan! Two 100% Halal prime Angus beef patties smashed ultra-thin on cast iron for sizzling lacy crispy crust edges, dual American cheddar, dill pickles, and secret house smash sauce in a butter-toasted brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    spiceLevel: 'Mild',
    portion: 'Double Beef Smash (300g)',
    isAvailable: true,
    calories: '780 kcal',
    tags: ['beef smash', 'smash burger', 'double cheese', 'gourmet burger']
  },
  {
    id: 'fn-burger-03',
    name: 'Spicy Chipotle Beef Smash Melt',
    category: 'burgers',
    price: 1050,
    originalPrice: 1200,
    description: 'Single Angus beef smash patty topped with smoked provolone, crispy grilled beef bacon rashers, pickled jalapeño coins, and fiery chipotle adobo sauce.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    badge: 'Spicy 🔥',
    spiceLevel: 'Hot',
    portion: 'Single Smash (280g)',
    isAvailable: true,
    calories: '720 kcal',
    tags: ['beef smash', 'chipotle', 'spicy beef', 'smash burger']
  },
  {
    id: 'fn-burger-02',
    name: 'Crunchy Zinger Royale Chicken Burger',
    category: 'burgers',
    price: 790,
    originalPrice: 890,
    description: 'Ultra-crunchy fried whole chicken breast fillet marinated in 14 secret spices, crisp iceberg lettuce, and zesty pepper-mayo nestled in a sesame seed artisan bun.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Rated',
    spiceLevel: 'Medium',
    portion: 'Single (260g)',
    isAvailable: true,
    calories: '610 kcal',
    tags: ['zinger', 'crispy chicken', 'chicken burger', 'spicy burger']
  },
  {
    id: 'fn-burger-04',
    name: 'Texas BBQ Crispy Chicken Burger',
    category: 'burgers',
    price: 890,
    originalPrice: 990,
    description: 'Golden fried chicken breast tossed in sweet Texas BBQ glaze, topped with golden onion rings, melted cheddar, and dill pickles.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    spiceLevel: 'Mild',
    portion: 'Single (290g)',
    isAvailable: true,
    calories: '650 kcal',
    tags: ['bbq chicken', 'onion rings', 'cheddar chicken burger']
  },
  {
    id: 'fn-burger-05',
    name: 'Truffle Mushroom Swiss Beef Smash',
    category: 'burgers',
    price: 1290,
    originalPrice: 1450,
    description: 'Juicy smashed beef patty covered with sautéed garlic butter cremini mushrooms, real Swiss cheese, and aromatic black truffle aioli.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    badge: 'Gourmet',
    spiceLevel: 'Mild',
    portion: 'Single Smash (300g)',
    isAvailable: true,
    calories: '740 kcal',
    tags: ['beef smash', 'truffle burger', 'mushroom swiss']
  },
  {
    id: 'fn-burger-06',
    name: 'Desi Chapli Beef Fusion Burger',
    category: 'burgers',
    price: 750,
    originalPrice: 850,
    description: 'Peshawari spiced coarse-ground beef patty infused with pomegranate seeds, coriander, and green chilies, served with mint raita mayo and sliced tomatoes.',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80',
    badge: 'Desi Special',
    spiceLevel: 'Medium',
    portion: 'Single (270g)',
    isAvailable: true,
    calories: '580 kcal',
    tags: ['chapli burger', 'beef smash', 'desi burger', 'fusion']
  },

  // ================= 3. FISH & SHRIMPS (OPTP-STYLE SEAFOOD) =================
  {
    id: 'fn-seafood-01',
    name: 'Crispy Butterfly Shrimps & Fries Bucket',
    category: 'seafood',
    price: 1250,
    originalPrice: 1450,
    description: 'OPTP-inspired specialty! 8 large golden butterfly shrimps crumb-coated to crunchy perfection, served over hand-cut loaded fries with our signature garlic mayo and zesty cocktail dip.',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
    badge: 'OPTP Favorite',
    spiceLevel: 'Mild',
    portion: '8 Shrimps + Fries',
    isAvailable: true,
    calories: '610 kcal',
    tags: ['fish & shrimps', 'crispy shrimps', 'butterfly shrimps', 'seafood', 'loaded fries', 'optp brand']
  },
  {
    id: 'fn-seafood-02',
    name: 'Batter-Fried Fish & Loaded Garlic Chips',
    category: 'seafood',
    price: 1150,
    originalPrice: 1350,
    description: 'Tender flaky white fish fillets dipped in golden seasoned batter, deep fried till ultra-crisp. Served with piping hot hand-cut garlic fries and chunky herb tartar sauce.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    badge: 'Signature Seafood',
    spiceLevel: 'Mild',
    portion: '2 Fillets + Fries',
    isAvailable: true,
    calories: '590 kcal',
    tags: ['fish & shrimps', 'fish and chips', 'fried fish', 'loaded fries', 'best garlic fries near me']
  },
  {
    id: 'fn-seafood-03',
    name: 'Crispy Fish & Shrimps Combo Platter',
    category: 'seafood',
    price: 1590,
    originalPrice: 1850,
    description: 'The ultimate seafood feast: 1 large batter-fried fish fillet + 5 crispy butterfly shrimps + large garlic mayo loaded fries + 2 dips + chilled soft drink.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
    badge: 'Seafood Feast',
    spiceLevel: 'Mild',
    portion: 'Platter for 1-2',
    isAvailable: true,
    calories: '890 kcal',
    tags: ['fish & shrimps', 'seafood platter', 'crispy shrimps', 'loaded fries']
  },

  // ================= 4. CRISPY FRIED BUCKET & CHICKEN =================
  {
    id: 'fn-chick-05',
    name: 'Crispy Fried Bucket (8 Pcs + Loaded Fries & Dips)',
    category: 'chicken',
    price: 1990,
    originalPrice: 2490,
    description: 'Giant crispy fried bucket containing 8 pieces of ultra-crunchy seasoned chicken (drumsticks & thighs), accompanied by large garlic mayo loaded fries, coleslaw, and 2 signature dips.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    badge: 'Family Bucket',
    spiceLevel: 'Medium',
    portion: '8 Pcs Bucket + Fries',
    isAvailable: true,
    calories: '1950 kcal',
    tags: ['crispy fried bucket', 'fried chicken', 'chicken bucket', 'loaded fries', 'karachi fries']
  },
  {
    id: 'fn-chick-01',
    name: 'Golden Crispy Tenders (5 Pcs)',
    category: 'chicken',
    price: 650,
    originalPrice: 750,
    description: 'Whole tenderloin chicken strips hand-breaded in our seasoned flour crumble, fried to golden perfection. Served with Garlic Mayo dip.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    badge: 'Kid Favorite',
    spiceLevel: 'Mild',
    portion: '5 Pieces (250g)',
    isAvailable: true,
    calories: '490 kcal',
    tags: ['chicken tenders', 'finger food', 'crispy chicken']
  },
  {
    id: 'fn-chick-02',
    name: 'Firecracker Hot Wings (6 Pcs)',
    category: 'chicken',
    price: 720,
    originalPrice: 820,
    description: 'Crispy bone-in chicken wings tossed in fiery peri-peri dynamite glaze. Garnished with toasted sesame seeds and served with cooling ranch.',
    image: 'https://images.unsplash.com/photo-1527477378393-27c1a851e4ca?auto=format&fit=crop&w=800&q=80',
    badge: 'Spicy 🔥',
    spiceLevel: 'Hot',
    portion: '6 Wings (300g)',
    isAvailable: true,
    calories: '560 kcal',
    tags: ['hot wings', 'spicy wings', 'peri peri', 'fried chicken']
  },
  {
    id: 'fn-chick-04',
    name: 'Chicken Popcorn Snack Bucket',
    category: 'chicken',
    price: 590,
    originalPrice: 690,
    description: 'Bite-sized crispy spiced chicken poppers dusted with our tangy masala seasoning. Comes with spicy ketchup dip.',
    image: 'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=800&q=80',
    badge: null,
    spiceLevel: 'Medium',
    portion: 'Bucket (240g)',
    isAvailable: true,
    calories: '440 kcal',
    tags: ['popcorn chicken', 'snack bucket', 'chicken bites']
  },

  // ================= 5. BUY 1 GET 1 & LATE NIGHT CRAVINGS =================
  {
    id: 'fn-deal-05',
    name: 'Buy 1 Get 1 Free BOGO Deal (Smash Burger + Free Loaded Fries)',
    category: 'deals',
    price: 1190,
    originalPrice: 1880,
    description: 'Limited Time BOGO Crave offer! Buy 1 Double Beef Smash Monarch and get 1 Large Garlic Mayo Loaded Fries absolutely FREE! The biggest fast-food value in town.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    badge: 'Buy 1 Get 1 Free',
    spiceLevel: 'Mild',
    portion: 'BOGO Feast',
    isAvailable: true,
    calories: '1320 kcal',
    tags: ['buy 1 get 1 free', 'bogo', 'beef smash', 'loaded fries', 'karachi fries', 'deals']
  },
  {
    id: 'fn-deal-04',
    name: 'Late Night Craving Platter (Open Till 2 AM)',
    category: 'deals',
    price: 1450,
    originalPrice: 1750,
    description: 'Got midnight hunger pangs? Open till 2:00 AM every night! Loaded with 1 Large Garlic Mayo Fries + 6 Hot Wings + 1 Double Beef Smash Burger + 1 Chilled Mint Lemonade.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    badge: 'Open Till 2 AM',
    spiceLevel: 'Medium',
    portion: 'Late Night Feast',
    isAvailable: true,
    calories: '1410 kcal',
    tags: ['late nigh craving open till 2 am', 'fries craving', 'loaded fries', 'beef smash', 'midnight deals']
  },
  {
    id: 'fn-deal-01',
    name: 'Duo Crave Feast (Save 22%)',
    category: 'deals',
    price: 1890,
    originalPrice: 2420,
    description: '1x Double Beef Smash Monarch + 1x Crunchy Zinger Royale + 1x Large Garlic Mayo Loaded Fries + 2x Soft Drinks (345ml). Ideal meal for two.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Value',
    spiceLevel: 'Medium',
    portion: 'Feast for 2',
    isAvailable: true,
    calories: '1850 kcal',
    tags: ['combo deal', 'deal for 2', 'burger combo', 'loaded fries', 'beef smash']
  },
  {
    id: 'fn-deal-02',
    name: 'FryNation Mega Squad Box (Save 28%)',
    category: 'deals',
    price: 3490,
    originalPrice: 4850,
    description: '2x Crunchy Zinger Burgers + 2x Beef Smash Burgers + 2x Monster Loaded Fries (1 Garlic Mayo + 1 Fiery Cheddar) + 6x Firecracker Wings + 4x Drinks. Feeds 4 to 5 people.',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80',
    badge: 'Family Saver',
    spiceLevel: 'Medium',
    portion: 'Party Box (4-5 Persons)',
    isAvailable: true,
    calories: '3600 kcal',
    tags: ['family deal', 'squad box', 'party pack', 'optp style deals', 'loaded fries']
  },
  {
    id: 'fn-deal-03',
    name: 'Solo Loaded Box Combo',
    category: 'deals',
    price: 1150,
    originalPrice: 1390,
    description: '1x Crunchy Zinger Burger + 1x Regular Masala Loaded Fries + 3x Crispy Tenders + 1x Chilled Soda. Complete solo satisfaction.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    badge: 'Value Deal',
    spiceLevel: 'Medium',
    portion: 'Solo Feast',
    isAvailable: true,
    calories: '1120 kcal',
    tags: ['solo box', 'lunch box', 'zinger combo']
  },

  // ================= 6. ARTISAN DIPS =================
  {
    id: 'fn-dip-01',
    name: 'Signature Garlic Mayo Dip (Cup)',
    category: 'dips',
    price: 90,
    originalPrice: null,
    description: 'Our proprietary whipped garlic cream sauce with parsley flakes and toasted pepper notes. The #1 companion for Karachi fries.',
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Garlic Dip',
    spiceLevel: 'Mild',
    portion: '60ml cup',
    isAvailable: true,
    calories: '120 kcal',
    tags: ['garlic mayo', 'best garlic fries near me', 'dip', 'sauce']
  },
  {
    id: 'fn-dip-02',
    name: 'Warm Liquid Cheddar Cheese Dip',
    category: 'dips',
    price: 140,
    originalPrice: null,
    description: 'Silky, rich, melted mature American cheddar cheese dip served warm.',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=800&q=80',
    badge: 'Must Try',
    spiceLevel: 'Mild',
    portion: '70ml cup',
    isAvailable: true,
    calories: '160 kcal',
    tags: ['cheese dip', 'cheddar']
  },
  {
    id: 'fn-dip-03',
    name: 'Fiery Ghost Dynamite Sauce',
    category: 'dips',
    price: 110,
    originalPrice: null,
    description: 'Creamy habanero and ghost chili infused spicy mayonnaise with sweet citrus undertones.',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    badge: 'Spicy 🔥',
    spiceLevel: 'Hot',
    portion: '60ml cup',
    isAvailable: true,
    calories: '110 kcal',
    tags: ['dynamite sauce', 'spicy dip']
  },
  {
    id: 'fn-dip-04',
    name: 'Tangy Desi Imli Mint Chutney',
    category: 'dips',
    price: 90,
    originalPrice: null,
    description: 'Sweet and sour tamarind pulp blended with fresh field mint, cumin, and rock salt.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    badge: 'Desi',
    spiceLevel: 'Medium',
    portion: '60ml cup',
    isAvailable: true,
    calories: '45 kcal',
    tags: ['imli chutney', 'mint chutney', 'desi sauce']
  },

  // ================= 7. DRINKS & SHAKES =================
  {
    id: 'fn-drink-01',
    name: 'Chilled Pakistani Mint Lemonade',
    category: 'drinks',
    price: 320,
    originalPrice: 380,
    description: 'Freshly squeezed lemons, garden-picked crushed mint leaves, black salt, and chilled soda. The ultimate Pakistani heat-buster.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    badge: 'Refresher',
    spiceLevel: 'Mild',
    portion: '500ml glass',
    isAvailable: true,
    calories: '140 kcal',
    tags: ['mint lemonade', 'lemonade', 'cooler', 'summer drink']
  },
  {
    id: 'fn-drink-02',
    name: 'Salted Caramel Belgian Shake',
    category: 'drinks',
    price: 550,
    originalPrice: 650,
    description: 'Thick handcrafted gourmet ice cream shake swirled with buttery salted caramel and crushed wafer crunch.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    badge: 'Dessert Shake',
    spiceLevel: 'Mild',
    portion: '400ml cup',
    isAvailable: true,
    calories: '480 kcal',
    tags: ['shake', 'caramel shake', 'thickshake']
  },
  {
    id: 'fn-drink-03',
    name: 'Dark Chocolate Fudge Milkshake',
    category: 'drinks',
    price: 550,
    originalPrice: 650,
    description: 'Rich dark Belgian cocoa blended with whole dairy milk, topped with chocolate sprinkles and whipped topping.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    badge: 'Indulgent',
    spiceLevel: 'Mild',
    portion: '400ml cup',
    isAvailable: true,
    calories: '510 kcal',
    tags: ['chocolate shake', 'fudge shake', 'milkshake']
  },
  {
    id: 'fn-drink-04',
    name: 'Chilled Soft Drink Can (345ml)',
    category: 'drinks',
    price: 150,
    originalPrice: null,
    description: 'Ice-cold carbonated beverage of your choice (Pepsi, 7Up, Mirinda, Mountain Dew, or Diet Pepsi).',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    badge: null,
    spiceLevel: 'Mild',
    portion: '345ml can',
    isAvailable: true,
    calories: '140 kcal',
    tags: ['soft drink', 'soda', 'pepsi', 'coke']
  }
];

export const PROMO_CODES = {
  'BOGO2026': {
    code: 'BOGO2026',
    type: 'fixed',
    discount: 690, // Covers price of Large Garlic Mayo Loaded Fries
    minOrder: 1190,
    description: 'Buy 1 Get 1 Free: Free Garlic Mayo Loaded Fries with Beef Smash'
  },
  'CRAVEFREE': {
    code: 'CRAVEFREE',
    type: 'free_delivery',
    discount: 150,
    minOrder: 1500,
    description: 'Free Delivery on orders above Rs. 1,500'
  },
  'WELCOME150': {
    code: 'WELCOME150',
    type: 'fixed',
    discount: 150,
    minOrder: 800,
    description: 'Rs. 150 OFF on orders above Rs. 800'
  },
  'MIDNIGHT2AM': {
    code: 'MIDNIGHT2AM',
    type: 'percentage',
    percentage: 15,
    minOrder: 1200,
    description: '15% OFF for Late Night Cravings Open Till 2 AM'
  }
};

export const RESTAURANT_INFO = {
  brandName: 'FryNation Pakistan',
  legalName: 'FryNation Quick-Service Food Enterprises PK',
  tagline: 'Best Loaded Fries in Karachi & Smashed Gourmet Burgers',
  helpline: '+92 (021) 111-379-628',
  email: 'orders@frynation.pk',
  openingHours: 'Mon - Sun: 12:00 PM – 02:00 AM (Late Night Craving Open Till 2 AM)',
  deliveryFee: 150,
  freeDeliveryThreshold: 1500,
  gstRate: 0.13,
  currency: 'Rs. ',
  cities: [
    { name: 'Karachi', areas: ['Clifton', 'DHA Phases 1-8', 'Gulshan-e-Iqbal', 'North Nazimabad', 'PECHS', 'Bahria Town Karachi'] },
    { name: 'Lahore', areas: ['Gulberg II-III', 'DHA Phase 1-6', 'Model Town', 'Johar Town', 'Cantt', 'Bahria Town Lahore'] },
    { name: 'Islamabad', areas: ['F-6 / F-7 / F-8', 'F-10 / F-11', 'G-11 / G-13', 'E-7', 'Blue Area', 'Bahria Enclave'] },
    { name: 'Rawalpindi', areas: ['Saddar', 'Bahria Town Phase 1-8', 'Chaklala Scheme 3', 'Westridge'] }
  ]
};
