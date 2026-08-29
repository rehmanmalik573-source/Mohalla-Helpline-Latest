import { Category, Provider, MainCategory, Subcategory, ServiceItem, Language } from '../types';
import { serviceHierarchy } from '../data/serviceHierarchy';

export interface CategoryDomainRule {
  categoryId: number;
  subcategoryIds: string[];
  keywords: string[];
}

/**
 * Domain rules mapping canonical services/categories to comprehensive user keywords, synonyms, translations, and common variations.
 */
export const DOMAIN_RULES: CategoryDomainRule[] = [
  // 1. Plumber
  {
    categoryId: 1,
    subcategoryIds: ['plumbing'],
    keywords: [
      'plumber', 'plumbing', 'plumb', 'plumer', 'plumber service', 'प्लंबर', 'प्लम्बर', 
      'नल', 'टोटी', 'पाइप', 'pipe', 'tap', 'leak', 'leakage', 'water motor', 
      'motor repair', 'drain', 'sanitary', 'कमोड', 'शावर', 'टोंटी', 'लीकेज', 
      'टंकी', 'tank cleaning', 'submersible', 'water pipe'
    ]
  },

  // 2. Electrician
  {
    categoryId: 2,
    subcategoryIds: ['electrical'],
    keywords: [
      'electrician', 'electrical', 'electric', 'electritian', 'इलेक्ट्रीशियन', 
      'इलेक्ट्रिशियन', 'bijli', 'बिजली', 'wiring', 'वायरिंग', 'fan', 'पंखा', 
      'ceiling fan', 'light', 'लाइट', 'switch', 'स्विच', 'socket', 'सॉकेट', 
      'inverter', 'इनवर्टर', 'इन्वर्टर', 'ups', 'mcb', 'fuse', 'short circuit', 'शॉर्ट सर्किट'
    ]
  },

  // 3. Painter
  {
    categoryId: 3,
    subcategoryIds: ['painting'],
    keywords: [
      'painter', 'paint', 'painting', 'paintar', 'पेंटर', 'पेंटिंग', 'putai', 
      'पुताई', 'rang', 'रंग', 'wall paint', 'house paint', 'wall painting', 
      'putty', 'पुट्टी', 'texture', 'टेक्सचर', 'distemper', 'weather coat', 
      'सफेदी', 'asian paints', 'whitewash'
    ]
  },

  // 4. Carpenter
  {
    categoryId: 5,
    subcategoryIds: ['carpenter'],
    keywords: [
      'carpenter', 'carpentry', 'carpentar', 'carpanter', 'कारपेंटर', 'बढ़ई', 
      'wood', 'woodwork', 'लकड़ी', 'furniture', 'फर्नीचर', 
      'door repair', 'window repair', 'khidki', 'खिड़की', 'bed repair', 
      'sofa repair', 'almirah', 'अलमारी', 'wardrobe', 'drawer', 'lock fitting', 
      'hinges', 'कब्जा', 'लकड़ी का काम'
    ]
  },

  // 5. AC & Air Conditioner
  {
    categoryId: 7,
    subcategoryIds: ['ac', 'ac-repair'],
    keywords: [
      'ac', 'a/c', 'a.c', 'a.c.', 'air conditioner', 'ac repair', 'एसी', 'split ac', 
      'window ac', 'ac service', 'ac installation', 'gas refill', 
      'cooling', 'कूलिंग', 'compressor', 'jet service', 'ac uninstallation'
    ]
  },

  // 6. Salon (Men & Women)
  {
    categoryId: 201,
    subcategoryIds: ['salon'],
    keywords: [
      'salon', 'saloon', 'सलून', 'सैलून', 'haircut', 'हेयरकट', 'hair cut', 
      'barber', 'नाई', 'hair style', 'hair styling', 'hair color', 
      'hair colour', 'shave', 'shaving', 'शेविंग', 'beard', 'दाढ़ी', 
      'men salon', 'women salon', 'बाल काटना', 'बाल'
    ]
  },

  // 7. Beauty & Makeup
  {
    categoryId: 202,
    subcategoryIds: ['beauty'],
    keywords: [
      'beauty', 'ब्यूटी', 'makeup', 'मेकअप', 'facial', 'फेशियल', 'cleanup', 
      'क्लीनअप', 'manicure', 'मैनिक्योर', 'pedicure', 'पेडिक्योर', 'bridal', 
      'ब्राइडल', 'bridal makeup', 'waxing', 'वैक्सिंग', 'bleach', 'ब्लीच', 
      'mehendi', 'mehndi', 'मेहंदी', 'beautician'
    ]
  },

  // 8. Spa & Wellness
  {
    categoryId: 203,
    subcategoryIds: ['spa-wellness'],
    keywords: [
      'spa', 'स्पा', 'massage', 'मसाज', 'body spa', 'बॉडी स्पा', 'body massage', 
      'full body massage', 'head massage', 'champi', 'चंपी', 'मालिश', 
      'wellness', 'reflexology', 'foot massage', 'relaxation', 'तनाव मुक्ति', 
      'hair spa'
    ]
  },

  // 9. Accountant, CA & Business (High Priority Exact Mapping)
  {
    categoryId: 4,
    subcategoryIds: ['accounting', 'tax-gst', 'business'],
    keywords: [
      'accountant', 'accountants', 'accounting', 'account', 'accounts', 'अकाउंटेंट', 'अकाउंट', 
      'ca', 'c.a.', 'सीए', 'chartered accountant', 'gst', 'जीएसटी', 'gst return', 
      'itr', 'आईटीआर', 'itr return', 'tax', 'टैक्स', 'income tax', 'इनकम टैक्स', 
      'tally', 'टैली', 'tally prime', 'bookkeeping', 'बहीखाता', 'munim', 'मुनीम', 
      'audit', 'auditor', 'billing', 'बिलिंग', 'invoice', 'खाता', 'हिसाब'
    ]
  },

  // 10. Raj Mistri / Mason
  {
    categoryId: 301,
    subcategoryIds: ['raj-mistri'],
    keywords: [
      'mason', 'raj mistri', 'mistri', 'राज मिस्त्री', 'मिस्त्री', 'brickwork', 
      'चिनाई', 'brick', 'ईंट', 'cement', 'सीमेंट', 'plaster', 'प्लास्टर', 
      'slab', 'लेंटर', 'lanter', 'thekedar', 'ठेकेदार'
    ]
  },

  // 11. Tile & Flooring
  {
    categoryId: 302,
    subcategoryIds: ['tile-flooring'],
    keywords: [
      'tile', 'tiles', 'टाइल', 'टाइल्स', 'flooring', 'फ्लोरिंग', 'marble', 
      'मार्बल', 'granite', 'ग्रेनाइट', 'floor work', 'tile fitting'
    ]
  },

  // 12. Welder & Fabrication
  {
    categoryId: 303,
    subcategoryIds: ['welding-fabrication'],
    keywords: [
      'welder', 'weld', 'welding', 'वेल्डर', 'वेल्डिंग', 'fabrication', 
      'फैब्रिकेशन', 'iron', 'लोहा', 'gate', 'गेट', 'iron gate', 'grill', 
      'ग्रिल', 'shutter', 'शटर', 'railing', 'रेलिंग', 'लोहार'
    ]
  },

  // 13. Contractor & Renovation
  {
    categoryId: 304,
    subcategoryIds: ['contractor'],
    keywords: [
      'contractor', 'ठेकेदार', 'renovation', 'नवीनीकरण', 'civil work', 'सिविल कार्य',
      'building contractor', 'मकान निर्माण'
    ]
  },

  // 14. Locksmith & Other Repair
  {
    categoryId: 15,
    subcategoryIds: ['other-home-repair'],
    keywords: [
      'locksmith', 'ताला', 'चाबी', 'लॉकस्मिथ', 'lock', 'key', 'chabi', 'tala', 
      'ताला चाबी', 'जाम ताला', 'waterproofing', 'वाटरप्रूफिंग', 'gardener', 'माली'
    ]
  },

  // 15. Cleaning
  {
    categoryId: 6,
    subcategoryIds: ['cleaning'],
    keywords: [
      'cleaning', 'cleaner', 'clean', 'क्लीनिंग', 'सफाई', 'झाड़ू', 'पोछा', 'deep clean', 
      'डीप क्लीनिंग', 'sofa cleaning', 'maid', 'बाई', 'घर सफाई', 'sanitization'
    ]
  },

  // 16. Pest Control
  {
    categoryId: 8,
    subcategoryIds: ['pest-control'],
    keywords: [
      'pest control', 'पेस्ट कंट्रोल', 'दीमक', 'termite', 'cockroach', 'कॉकरोच', 
      'mosquito', 'मच्छर', 'bed bug', 'खटमल', 'pest spray'
    ]
  },

  // 17. Appliances Repair
  {
    categoryId: 14,
    subcategoryIds: ['home-appliances', 'appliances'],
    keywords: [
      'washing machine', 'वाशिंग मशीन', 'fridge', 'refrigerator', 'फ्रिज', 
      'रेफ्रिजरेटर', 'geyser', 'गीजर', 'water heater', 'microwave', 'माइक्रोवेव',
      'appliance', 'उपकरण'
    ]
  },

  // 18. RO Purifier
  {
    categoryId: 13,
    subcategoryIds: ['water-appliances', 'ro-water-purifier'],
    keywords: [
      'ro', 'water purifier', 'आरओ', 'वाटर प्यूरीफायर', 'filter', 'पानी फिल्टर', 
      'kent ro', 'aquaguard'
    ]
  },

  // 19. Car Services & Mechanic
  {
    categoryId: 501,
    subcategoryIds: ['car', 'car-service'],
    keywords: [
      'car', 'कार', 'car mechanic', 'कार मैकेनिक', 'car repair', 'car wash', 'कार वाश',
      'automobile', 'motor mechanic'
    ]
  },

  // 20. Bike & Scooter Repair
  {
    categoryId: 502,
    subcategoryIds: ['bike-scooter', 'bike-repair'],
    keywords: [
      'bike', 'बाइक', 'scooter', 'स्कूटर', 'motorcycle', 'मोटरसाइकिल', 'activa', 'एक्टिवा',
      'puncture', 'पंचर', 'two wheeler'
    ]
  },

  // 21. Roadside & Towing
  {
    categoryId: 503,
    subcategoryIds: ['roadside-services'],
    keywords: [
      'towing', 'टोइंग', 'battery jump', 'jump start', 'जंप स्टार्ट', 'roadside'
    ]
  },

  // 22. Mobile & Computer Repair
  {
    categoryId: 601,
    subcategoryIds: ['computer', 'mobile-repair'],
    keywords: [
      'mobile', 'मोबाइल', 'phone', 'फोन', 'laptop', 'लैपटॉप', 'computer', 'कंप्यूटर',
      'screen repair', 'display', 'screen replacement', 'pc repair'
    ]
  },

  // 23. Security & CCTV
  {
    categoryId: 602,
    subcategoryIds: ['security-connectivity'],
    keywords: [
      'cctv', 'cctv camera', 'सीसीटीवी', 'security guard', 'सुरक्षा गार्ड', 'guard', 'wifi', 'solar'
    ]
  },

  // 24. Ride, Taxi & Driver
  {
    categoryId: 701,
    subcategoryIds: ['local-rides', 'taxi-cab'],
    keywords: [
      'taxi', 'टैक्सी', 'cab', 'कैब', 'driver', 'ड्राइवर', 'auto', 'ऑटो',
      'ride', 'राइड', 'car rental'
    ]
  },

  // 25. Delivery & Movers
  {
    categoryId: 16,
    subcategoryIds: ['moving', 'packers-movers'],
    keywords: [
      'delivery', 'डिलीवरी', 'courier', 'कूरियर', 'parcel', 'पार्सल',
      'packers', 'movers', 'पैकर्स', 'मूवर्स', 'shifting', 'शिफ्टिंग', 'tempo', 'टेम्पो'
    ]
  },

  // 26. Education & Tuition
  {
    categoryId: 1001,
    subcategoryIds: ['tuition', 'subject-tutor'],
    keywords: [
      'tuition', 'ट्यूशन', 'tutor', 'ट्यूटर', 'home tutor', 'होम ट्यूटर',
      'maths', 'science', 'english', 'गणित', 'साइंस', 'इंग्लिश', 'teacher', 'शिक्षक'
    ]
  },

  // 27. Professional Services
  {
    categoryId: 1101,
    subcategoryIds: ['legal'],
    keywords: [
      'lawyer', 'वकील', 'advocate', 'एडवोकेट', 'architect', 'आर्किटेक्ट',
      'interior designer', 'property consultant', 'insurance'
    ]
  }
];

export interface UnifiedSearchResult {
  categories: Category[];
  providers: Provider[];
  serviceItems: {
    main: MainCategory;
    sub: Subcategory;
    service: ServiceItem;
  }[];
  hasResults: boolean;
}

/**
 * Normalizes text for reliable matching: converts to lowercase, collapses spaces, strips punctuation.
 */
export function normalizeSearchString(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'।]/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Checks if target text contains search query as an exact word or phrase.
 */
function containsExactWordOrPhrase(target: string, query: string): boolean {
  if (!target || !query) return false;
  const t = normalizeSearchString(target);
  const q = normalizeSearchString(query);
  
  if (t === q) return true;
  if (t.startsWith(q + ' ') || t.endsWith(' ' + q) || t.includes(' ' + q + ' ')) return true;
  return false;
}

/**
 * Searches across categories, service items, and providers with strict priority ranking:
 * 1. Exact full-name match (Highest Priority)
 * 2. Exact phrase match
 * 3. Relevant word match
 * 4. STRICTLY NO UNRELATED NOISE or random categories
 */
export function performUnifiedSearch(
  rawQuery: string,
  categories: Category[],
  providers: Provider[],
  language: Language = 'hi'
): UnifiedSearchResult {
  const query = normalizeSearchString(rawQuery);
  
  if (!query) {
    return {
      categories: [],
      providers: [],
      serviceItems: [],
      hasResults: false
    };
  }

  const queryTokens = query.split(' ').filter(t => t.length > 0);

  // 1. Identify matched domain rules strictly
  const matchedRules: CategoryDomainRule[] = [];
  const matchedCategoryIdsFromRules = new Set<number>();
  const matchedSubcategoryIdsFromRules = new Set<string>();

  for (const rule of DOMAIN_RULES) {
    let hasExactRuleMatch = false;

    for (const kw of rule.keywords) {
      const normKw = normalizeSearchString(kw);
      if (normKw === query || containsExactWordOrPhrase(normKw, query) || containsExactWordOrPhrase(query, normKw)) {
        hasExactRuleMatch = true;
        break;
      }
      // If query is a single token of 3+ chars matching keyword start/exact
      if (queryTokens.length === 1 && normKw.split(' ').some(w => w === query || (query.length >= 4 && w.startsWith(query)))) {
        hasExactRuleMatch = true;
        break;
      }
    }

    if (hasExactRuleMatch) {
      matchedRules.push(rule);
      matchedCategoryIdsFromRules.add(rule.categoryId);
      rule.subcategoryIds.forEach(sub => matchedSubcategoryIdsFromRules.add(sub.toLowerCase()));
    }
  }

  // 2. Score Categories strictly
  const scoredCategories: { category: Category; score: number }[] = [];

  for (const cat of categories) {
    let score = 0;
    const nameEn = normalizeSearchString(cat.name);
    const nameHi = normalizeSearchString(cat.nameHi);
    const subId = (cat.subcategoryId || '').toLowerCase();
    const commonServices = (cat.commonServices || []).map(s => normalizeSearchString(s));
    const commonServicesHi = (cat.commonServicesHi || []).map(s => normalizeSearchString(s));
    const taglineEn = normalizeSearchString(cat.tagline || '');
    const taglineHi = normalizeSearchString(cat.taglineHi || '');

    // TIER 1: Exact Category Name Match (+3000 pts)
    if (nameEn === query || nameHi === query) {
      score += 3000;
    } else if (nameEn.startsWith(query) || nameHi.startsWith(query)) {
      score += 2200;
    } else if (containsExactWordOrPhrase(nameEn, query) || containsExactWordOrPhrase(nameHi, query)) {
      score += 1800;
    }

    // TIER 2: Common Service Names (+2500 pts for exact, +1500 for phrase)
    for (const s of commonServices) {
      if (s === query) {
        score = Math.max(score, 2500);
      } else if (s.startsWith(query) || containsExactWordOrPhrase(s, query)) {
        score = Math.max(score, 1600);
      }
    }
    for (const s of commonServicesHi) {
      if (s === query) {
        score = Math.max(score, 2500);
      } else if (s.startsWith(query) || containsExactWordOrPhrase(s, query)) {
        score = Math.max(score, 1600);
      }
    }

    // TIER 3: Domain Rules Match (+1500 pts)
    if (matchedCategoryIdsFromRules.has(cat.id) || (subId && matchedSubcategoryIdsFromRules.has(subId))) {
      score = Math.max(score, 1500);
    }

    // TIER 4: Tagline Whole Word / Phrase Match (+400 pts)
    if (containsExactWordOrPhrase(taglineEn, query) || containsExactWordOrPhrase(taglineHi, query)) {
      score += 400;
    } else if (queryTokens.length > 1 && queryTokens.every(tok => taglineEn.includes(tok) || taglineHi.includes(tok))) {
      score += 300;
    }

    // If query has 3+ characters and name contains query as substring
    if (query.length >= 3 && (nameEn.includes(query) || nameHi.includes(query))) {
      score = Math.max(score, 800);
    }

    if (score > 0) {
      scoredCategories.push({ category: cat, score });
    }
  }

  // Sort matched categories by score descending
  scoredCategories.sort((a, b) => b.score - a.score);

  // If we have a very strong match (score >= 1500, e.g. "Accountant" or "Plumber"),
  // strictly filter out any low-scoring unrelated noise (score < 400)
  const topCatScore = scoredCategories[0]?.score || 0;
  const filteredScoredCategories = topCatScore >= 1500
    ? scoredCategories.filter(sc => sc.score >= 1000)
    : scoredCategories.filter(sc => sc.score >= 300);

  const matchedCategories = filteredScoredCategories.map(sc => sc.category);
  const matchedCategoryIds = new Set(matchedCategories.map(c => c.id));
  const matchedSubcategoryIds = new Set(
    matchedCategories.map(c => (c.subcategoryId || '').toLowerCase()).filter(Boolean)
  );
  matchedSubcategoryIdsFromRules.forEach(id => matchedSubcategoryIds.add(id));

  // 3. Score Deep Service Items strictly
  const scoredServiceItems: {
    item: { main: MainCategory; sub: Subcategory; service: ServiceItem };
    score: number;
  }[] = [];

  serviceHierarchy.forEach(main => {
    main.subcategories.forEach(sub => {
      const subId = sub.id.toLowerCase();
      const isSubMatched = matchedSubcategoryIds.has(subId);

      sub.services.forEach(serv => {
        const servNameEn = normalizeSearchString(serv.name);
        const servNameHi = normalizeSearchString(serv.nameHi);
        const servTaglineEn = normalizeSearchString(serv.tagline || '');
        const servTaglineHi = normalizeSearchString(serv.taglineHi || '');

        let score = 0;

        // Exact service name match (Highest Priority)
        if (servNameEn === query || servNameHi === query) {
          score += 3000;
        } else if (servNameEn.startsWith(query) || servNameHi.startsWith(query)) {
          score += 2000;
        } else if (containsExactWordOrPhrase(servNameEn, query) || containsExactWordOrPhrase(servNameHi, query)) {
          score += 1600;
        } else if (query.length >= 3 && (servNameEn.includes(query) || servNameHi.includes(query))) {
          score += 900;
        }

        // Subcategory match
        if (isSubMatched) {
          score = Math.max(score, 1200);
        }

        // Tagline match
        if (containsExactWordOrPhrase(servTaglineEn, query) || containsExactWordOrPhrase(servTaglineHi, query)) {
          score += 300;
        }

        if (score > 0) {
          scoredServiceItems.push({
            item: { main, sub, service: serv },
            score
          });
        }
      });
    });
  });

  scoredServiceItems.sort((a, b) => b.score - a.score);

  const topServiceScore = scoredServiceItems[0]?.score || 0;
  const filteredScoredServiceItems = topServiceScore >= 1500
    ? scoredServiceItems.filter(si => si.score >= 900)
    : scoredServiceItems.filter(si => si.score >= 300);

  const matchedServices = filteredScoredServiceItems.map(si => si.item);

  // If a deep service item had a top match, ensure its corresponding flat Category is also in matchedCategories at the top
  if (matchedServices.length > 0) {
    matchedServices.forEach(item => {
      const mappedCat = categories.find(
        c => (c.subcategoryId && c.subcategoryId.toLowerCase() === item.sub.id.toLowerCase())
      );
      if (mappedCat && !matchedCategoryIds.has(mappedCat.id)) {
        matchedCategories.push(mappedCat);
        matchedCategoryIds.add(mappedCat.id);
      }
    });
  }

  // 4. Score Providers strictly (Only verified & relevant providers)
  const scoredProviders: { provider: Provider; score: number }[] = [];

  for (const p of providers) {
    if (
      p.verificationStatus === 'rejected' || 
      p.verificationStatus === 'pending' || 
      (p.isVerified === false && p.verificationStatus !== 'verified')
    ) {
      continue;
    }

    let score = 0;
    const pNameEn = normalizeSearchString(p.name);
    const pNameHi = normalizeSearchString(p.nameHi);
    const pTitleEn = normalizeSearchString(p.title);
    const pTitleHi = normalizeSearchString(p.titleHi);
    const pCatEn = normalizeSearchString(p.categoryName);
    const pCatHi = normalizeSearchString(p.categoryNameHi);
    const pBioEn = normalizeSearchString(p.bio);
    const pBioHi = normalizeSearchString(p.bioHi);
    const pSpecsEn = (p.specialties || []).map(s => normalizeSearchString(s));
    const pSpecsHi = (p.specialtiesHi || []).map(s => normalizeSearchString(s));

    // Exact Provider Name / Title Match
    if (pNameEn === query || pNameHi === query) {
      score += 2500;
    } else if (pNameEn.includes(query) || pNameHi.includes(query)) {
      score += 1800;
    }

    if (pTitleEn === query || pTitleHi === query) {
      score += 2200;
    } else if (containsExactWordOrPhrase(pTitleEn, query) || containsExactWordOrPhrase(pTitleHi, query)) {
      score += 1600;
    }

    // Specialties match
    for (const spec of pSpecsEn) {
      if (spec === query) {
        score = Math.max(score, 2000);
      } else if (containsExactWordOrPhrase(spec, query)) {
        score = Math.max(score, 1500);
      }
    }
    for (const spec of pSpecsHi) {
      if (spec === query) {
        score = Math.max(score, 2000);
      } else if (containsExactWordOrPhrase(spec, query)) {
        score = Math.max(score, 1500);
      }
    }

    // Category match
    if (p.categoryId && matchedCategoryIds.has(p.categoryId)) {
      // Find score of that category
      const catScore = scoredCategories.find(c => c.category.id === p.categoryId)?.score || 1200;
      score = Math.max(score, catScore);
    } else if (pCatEn === query || pCatHi === query) {
      score = Math.max(score, 2000);
    }

    // Bio word match
    if (containsExactWordOrPhrase(pBioEn, query) || containsExactWordOrPhrase(pBioHi, query)) {
      score += 200;
    }

    if (score > 0) {
      scoredProviders.push({ provider: p, score: score + (p.rating * 10) });
    }
  }

  scoredProviders.sort((a, b) => b.score - a.score);

  const topProviderScore = scoredProviders[0]?.score || 0;
  const filteredScoredProviders = topProviderScore >= 1500
    ? scoredProviders.filter(sp => sp.score >= 1000)
    : scoredProviders.filter(sp => sp.score >= 300);

  const matchedProviders = filteredScoredProviders.map(sp => sp.provider);

  const hasResults = matchedCategories.length > 0 || matchedProviders.length > 0 || matchedServices.length > 0;

  return {
    categories: matchedCategories,
    providers: matchedProviders,
    serviceItems: matchedServices,
    hasResults
  };
}

/**
 * Returns string[] array of expanded search keywords for compatibility
 */
export function getExpandedSearchKeywords(rawQuery: string): string[] {
  const q = normalizeSearchString(rawQuery);
  if (!q) return [];
  
  const tokens = q.split(' ').filter(Boolean);
  const list: string[] = [q, ...tokens];

  for (const rule of DOMAIN_RULES) {
    if (rule.keywords.some(k => normalizeSearchString(k) === q || containsExactWordOrPhrase(k, q))) {
      rule.keywords.forEach(k => list.push(k.toLowerCase()));
    }
  }

  return Array.from(new Set(list));
}
