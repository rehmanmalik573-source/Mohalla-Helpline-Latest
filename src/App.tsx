import React, { useState, useEffect, useMemo } from 'react';
import { categories as initialCategories } from './data/categories';
import { mockProviders as initialProviders } from './data/providers';
import { 
  Category, 
  Provider, 
  Booking, 
  ServiceRequest, 
  RequestStatus, 
  CustomerProfile, 
  CustomerNotification, 
  Language
} from './types';
import { translations } from './data/translations';

// Components
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryGrid } from './components/CategoryGrid';
import { TrustedProsSection } from './components/TrustedProsSection';
import { ProviderModal } from './components/ProviderModal';
import { Footer } from './components/Footer';

// Customer Flow Components
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { CustomerProfileDrawer } from './components/CustomerProfileDrawer';
import { ServiceRequestModal } from './components/ServiceRequestModal';
import { MyRequestsSection } from './components/MyRequestsSection';
import { AllCategoriesView } from './components/AllCategoriesView';
import { FindServiceView } from './components/FindServiceView';
import { HelpSupportModal } from './components/HelpSupportModal';
import { BottomNavBar } from './components/BottomNavBar';

// Customer Modals & Views
import { CustomerPaymentsModal } from './components/CustomerPaymentsModal';
import { CustomerReviewsModal } from './components/CustomerReviewsModal';
import { SavedProvidersModal } from './components/SavedProvidersModal';
import { AboutModal } from './components/AboutModal';
import { SettingsModal } from './components/SettingsModal';
import { performUnifiedSearch } from './utils/searchUtils';

type ActiveView = 'home' | 'categories' | 'requests' | 'find_service';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('mohalla_language');
    return (saved as Language) || 'hi';
  });
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [categories] = useState<Category[]>(initialCategories);
  const [providers, setProviders] = useState<Provider[]>(() => {
    const saved = localStorage.getItem('mohalla_providers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return initialProviders;
  });
  const [currentLocation, setCurrentLocation] = useState<string>('शाहदरा, दिल्ली');
  const [savedProviderIds, setSavedProviderIds] = useState<string[]>(['p1', 'p3']);

  // Customer Profile State
  const [customer, setCustomer] = useState<CustomerProfile>(() => {
    const saved = localStorage.getItem('mohalla_customer');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      id: 'cust-101',
      name: 'अमित शर्मा (Amit Sharma)',
      phone: '+91 98765 43210',
      locality: 'शाहदरा, दिल्ली',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      isLoggedIn: true,
      registeredAt: '12/08/2026'
    };
  });

  // Service Requests State (Customer's active requests)
  const [requests, setRequests] = useState<ServiceRequest[]>(() => {
    const saved = localStorage.getItem('mohalla_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 'REQ-84920',
        customerId: 'cust-101',
        customerName: 'अमित शर्मा',
        customerPhone: '+91 98765 43210',
        categoryId: 1,
        categoryName: 'Plumber',
        categoryNameHi: 'प्लंबर',
        serviceType: 'पाइप लीकेज व नल रिपेयर',
        problemDescription: 'बाथरूम के नल से लगातार पानी टपक रहा है। मुख्य वाल्व भी ढीला है।',
        location: 'गली नं. 3, शाहदरा, दिल्ली',
        preferredDate: 'आज (Today)',
        preferredTime: '11:00 AM - 01:00 PM',
        estimatedPrice: 249,
        status: 'on_the_way',
        createdAt: '12 मिनट पहले',
        updatedAt: '2 मिनट पहले',
        assignedProvider: {
          id: 'p1',
          name: 'Rahul Sharma',
          nameHi: 'राहुल शर्मा (प्लंबर)',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
          categoryName: 'Plumber',
          categoryNameHi: 'प्लंबर',
          rating: 4.8,
          reviewCount: 142,
          isVerified: true,
          phone: '+91 98765 43210',
          etaMinutes: 10,
          badge: 'Top Rated Pro'
        }
      },
      {
        id: 'REQ-73210',
        customerId: 'cust-101',
        customerName: 'अमित शर्मा',
        customerPhone: '+91 98765 43210',
        categoryId: 2,
        categoryName: 'Electrician',
        categoryNameHi: 'इलेक्ट्रीशियन',
        serviceType: 'सीलिंग पंखा इंस्टालेशन',
        problemDescription: 'लिविंग रूम में नया हेवल्स पंखा लगाना है।',
        location: 'गली नं. 3, शाहदरा, दिल्ली',
        preferredDate: 'कल',
        preferredTime: '04:00 PM - 06:00 PM',
        estimatedPrice: 299,
        status: 'completed',
        createdAt: 'कल',
        updatedAt: 'कल',
        ratingGiven: 5,
        reviewGiven: 'बहुत ही पेशेवर और समय के पाबंद कारीगर थे। काम समय पर पूरा किया।',
        assignedProvider: {
          id: 'p2',
          name: 'Vikas Kumar',
          nameHi: 'विकास कुमार (इलेक्ट्रीशियन)',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
          categoryName: 'Electrician',
          categoryNameHi: 'इलेक्ट्रीशियन',
          rating: 4.7,
          reviewCount: 98,
          isVerified: true,
          phone: '+91 98111 22334',
          etaMinutes: 0
        }
      }
    ];
  });

  // Customer Notifications State
  const [notifications, setNotifications] = useState<CustomerNotification[]>([
    {
      id: 'notif-1',
      title: 'Technician on the way! 🛵',
      titleHi: 'कारीगर रास्ते में है! 🛵',
      message: 'Rahul Plumber is arriving in 10 minutes for #REQ-84920',
      messageHi: 'राहुल प्लंबर आपकी रिक्वेस्ट #REQ-84920 के लिए 10 मिनट में पहुंच रहे हैं।',
      timestamp: '2m ago',
      requestId: 'REQ-84920',
      read: false,
      type: 'status_change'
    },
    {
      id: 'notif-2',
      title: '₹100 Welcome Coupon',
      titleHi: '₹100 का वेलकम कूपन',
      message: 'Use code MOHALLA100 on your next service booking.',
      messageHi: 'अपनी अगली बुकिंग पर MOHALLA100 कोड का इस्तेमाल करें।',
      timestamp: '1h ago',
      read: false,
      type: 'promo'
    }
  ]);

  // Filters State
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedProviderDetail, setSelectedProviderDetail] = useState<Provider | null>(null);
  const [selectedCategoryForRequest, setSelectedCategoryForRequest] = useState<Category | null>(null);
  const [isServiceRequestModalOpen, setIsServiceRequestModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isHelpSupportOpen, setIsHelpSupportOpen] = useState(false);
  const [isPaymentsModalOpen, setIsPaymentsModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mohalla_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('mohalla_customer', JSON.stringify(customer));
  }, [customer]);

  useEffect(() => {
    localStorage.setItem('mohalla_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('mohalla_providers', JSON.stringify(providers));
  }, [providers]);

  // Filtered Providers based on category and search query using unified search logic
  const filteredProviders = useMemo(() => {
    // Only verified, active providers should appear for customer views
    const activeVerifiedProviders = providers.filter(
      p => p.verificationStatus === 'verified' && p.isVerified !== false && p.verificationStatus !== 'rejected' && p.verificationStatus !== 'pending'
    );

    if (searchQuery.trim()) {
      const searchRes = performUnifiedSearch(searchQuery, categories, activeVerifiedProviders, language);
      if (selectedCategoryId !== null) {
        return searchRes.providers.filter(p => p.categoryId === selectedCategoryId);
      }
      return searchRes.providers;
    }
    if (selectedCategoryId !== null) {
      return activeVerifiedProviders.filter(p => p.categoryId === selectedCategoryId);
    }
    return activeVerifiedProviders;
  }, [providers, categories, selectedCategoryId, searchQuery, language]);

  // Handlers
  const handleToggleLanguage = (lang: Language) => {
    setLanguage(lang);
    
    // Find index of current location in current language locations list to translate gracefully
    const currentLocs = translations[language].locations;
    const targetLocs = translations[lang].locations;
    const currentIndex = currentLocs.indexOf(currentLocation);
    
    if (currentIndex !== -1 && targetLocs[currentIndex]) {
      setCurrentLocation(targetLocs[currentIndex]);
    }
  };

  const handleOpenRequestFlowForCategory = (cat: Category) => {
    setSelectedCategoryForRequest(cat);
    setIsServiceRequestModalOpen(true);
  };

  const handleRequestSubmitted = (newReq: ServiceRequest) => {
    setRequests(prev => [newReq, ...prev]);

    // Push notification
    const newNotif: CustomerNotification = {
      id: 'notif-' + Date.now(),
      title: `Service Request #${newReq.id} Submitted`,
      titleHi: `सर्विस रिक्वेस्ट #${newReq.id} दर्ज हुई`,
      message: `Looking for nearby ${newReq.categoryName} near ${newReq.location}`,
      messageHi: `${newReq.location} के पास नजदीकी ${newReq.categoryNameHi} को सूचना भेजी जा रही है`,
      timestamp: 'Just now',
      requestId: newReq.id,
      read: false,
      type: 'status_change'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleUpdateStatus = (id: string, newStatus: RequestStatus) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: newStatus,
          updatedAt: 'Just now'
        };
      }
      return req;
    }));

    const statusTitles: Record<RequestStatus, { en: string; hi: string }> = {
      requested: { en: 'Request Received', hi: 'रिक्वेस्ट प्राप्त हुई' },
      provider_found: { en: 'Technician Matched 🔍', hi: 'नजदीकी कारीगर मिला 🔍' },
      accepted: { en: 'Request Accepted 🤝', hi: 'रिक्वेस्ट स्वीकार हुई 🤝' },
      on_the_way: { en: 'Technician on the Way 🛵', hi: 'कारीगर रास्ते में है 🛵' },
      service_started: { en: 'Service Started ⚡', hi: 'काम शुरू हुआ ⚡' },
      completed: { en: 'Service Completed! ✓', hi: 'काम पूरा हुआ! ✓' },
      cancelled: { en: 'Request Cancelled ✕', hi: 'रिक्वेस्ट रद्द की गई' },
    };

    const notifItem: CustomerNotification = {
      id: 'notif-' + Date.now(),
      title: statusTitles[newStatus]?.en || 'Status Updated',
      titleHi: statusTitles[newStatus]?.hi || 'स्टेटस अपडेट हुआ',
      message: `Request #${id} is now ${newStatus.replace('_', ' ')}`,
      messageHi: `रिक्वेस्ट #${id} का स्टेटस अब अपडेट हुआ है।`,
      timestamp: 'Just now',
      requestId: id,
      read: false,
      type: 'status_change'
    };
    setNotifications(prev => [notifItem, ...prev]);
  };

  const handleCancelRequest = (id: string) => {
    handleUpdateStatus(id, 'cancelled');
  };

  const handleRateRequest = (id: string, rating: number, review: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          ratingGiven: rating,
          reviewGiven: review,
        };
      }
      return req;
    }));
  };

  const handleMarkNotificationRead = (id?: string) => {
    if (!id) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } else {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  const handleLoginSuccess = (profile: CustomerProfile) => {
    setCustomer(profile);
  };

  const handleLogout = () => {
    setCustomer(prev => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 font-sans flex flex-col selection:bg-amber-500 selection:text-white pb-16 sm:pb-0">
      {/* Top Sticky Header */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        currentLocation={currentLocation}
        onLocationChange={setCurrentLocation}
        requests={requests}
        customer={customer}
        notifications={notifications}
        onNavigate={(view) => {
          if (view === 'find_service' && currentView !== 'find_service') {
            setSearchQuery('');
          }
          setCurrentView(view);
        }}
        onOpenRequests={() => setCurrentView('requests')}
        onOpenProfile={() => setIsProfileDrawerOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenHelpSupport={() => setIsHelpSupportOpen(true)}
        onOpenPayments={() => setIsPaymentsModalOpen(true)}
        onOpenReviews={() => setIsReviewsModalOpen(true)}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onLogout={handleLogout}
        onMarkNotificationRead={handleMarkNotificationRead}
      />

      <main className="flex-1">
        {/* VIEW 1: HOME VIEW (Customer View) */}
        {currentView === 'home' && (
          <>
            {/* Hero Section with fixed search & live suggestions */}
            <HeroSection
              language={language}
              searchQuery={searchQuery}
              categories={categories}
              providers={providers}
              onSearchChange={setSearchQuery}
              onSelectCategory={handleOpenRequestFlowForCategory}
              onSelectProvider={(p) => setSelectedProviderDetail(p)}
              onSearchSubmit={() => setCurrentView('find_service')}
            />

            {/* 6 Popular Service Category Grid with View All button */}
            <CategoryGrid
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
              onRequestCategory={handleOpenRequestFlowForCategory}
              onViewAllCategories={() => setCurrentView('categories')}
              onOpenUrgentRequest={() => {
                setSelectedCategoryForRequest(categories[0]);
                setIsServiceRequestModalOpen(true);
              }}
              language={language}
            />

            {/* Trusted Professionals Near You with Verified badges */}
            <TrustedProsSection
              providers={filteredProviders}
              language={language}
              onSelectProvider={(p) => setSelectedProviderDetail(p)}
              onBookProvider={(p) => {
                const matchedCat = categories.find(c => c.id === p.categoryId) || categories[0];
                handleOpenRequestFlowForCategory(matchedCat);
              }}
              onViewAll={() => setCurrentView('find_service')}
            />
          </>
        )}

        {/* VIEW 2: ALL CATEGORIES VIEW */}
        {currentView === 'categories' && (
          <AllCategoriesView
            categories={categories}
            language={language}
            onBackToHome={() => setCurrentView('home')}
            onSelectCategoryForRequest={handleOpenRequestFlowForCategory}
          />
        )}

        {/* VIEW 3: FIND A SERVICE VIEW */}
        {currentView === 'find_service' && (
          <FindServiceView
            categories={categories}
            providers={providers}
            language={language}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onBackToHome={() => setCurrentView('home')}
            onRequestCategory={handleOpenRequestFlowForCategory}
            onSelectProvider={(p) => setSelectedProviderDetail(p)}
          />
        )}

        {/* VIEW 4: MY REQUESTS VIEW */}
        {currentView === 'requests' && (
          <MyRequestsSection
            requests={requests}
            language={language}
            onBackToHome={() => setCurrentView('home')}
            onUpdateStatus={handleUpdateStatus}
            onCancelRequest={handleCancelRequest}
            onRateRequest={handleRateRequest}
            onNewRequestClick={() => {
              setSelectedCategoryForRequest(categories[0]);
              setIsServiceRequestModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Customer Payments Modal */}
      <CustomerPaymentsModal
        isOpen={isPaymentsModalOpen}
        onClose={() => setIsPaymentsModalOpen(false)}
        requests={requests}
        language={language}
        onSimulatePay={(reqId) => {
          handleUpdateStatus(reqId, 'completed');
        }}
      />

      {/* Customer Reviews Modal */}
      <CustomerReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        requests={requests}
        language={language}
      />

      {/* Saved Providers Modal */}
      <SavedProvidersModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedProviderIds={savedProviderIds}
        providers={providers}
        categories={categories}
        language={language}
        onSelectProvider={(p) => setSelectedProviderDetail(p)}
        onRequestCategory={handleOpenRequestFlowForCategory}
      />

      {/* About Mohalla Help Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        language={language}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Customer Service Request Modal */}
      <ServiceRequestModal
        isOpen={isServiceRequestModalOpen}
        onClose={() => setIsServiceRequestModalOpen(false)}
        category={selectedCategoryForRequest || categories[0]}
        categories={categories}
        language={language}
        customer={customer}
        providers={providers}
        onRequestSubmitted={handleRequestSubmitted}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Customer Auth Modal (Mobile + OTP) */}
      <CustomerAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        language={language}
        currentCustomer={customer}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Customer Profile Drawer */}
      <CustomerProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        customer={customer}
        language={language}
        requestsCount={requests.length}
        onUpdateProfile={setCustomer}
        onLogout={handleLogout}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onOpenRequests={() => setCurrentView('requests')}
      />

      {/* Help & Support Modal */}
      <HelpSupportModal
        isOpen={isHelpSupportOpen}
        onClose={() => setIsHelpSupportOpen(false)}
        language={language}
      />

      {/* Provider Details Modal */}
      <ProviderModal
        provider={selectedProviderDetail}
        language={language}
        onClose={() => setSelectedProviderDetail(null)}
        onBook={(p) => {
          setSelectedProviderDetail(null);
          const matchedCat = categories.find(c => c.id === p.categoryId) || categories[0];
          handleOpenRequestFlowForCategory(matchedCat);
        }}
      />

      {/* Footer */}
      <Footer
        categories={categories}
        language={language}
        onSelectCategory={(catId) => {
          if (catId) {
            const matched = categories.find(c => c.id === catId);
            if (matched) handleOpenRequestFlowForCategory(matched);
          } else {
            setCurrentView('categories');
          }
        }}
      />

      {/* Mobile-First Sticky Bottom Navigation Bar */}
      <BottomNavBar
        currentView={currentView}
        onNavigate={(v) => {
          if (v === 'find_service' && currentView !== 'find_service') {
            setSearchQuery('');
          }
          setCurrentView(v);
        }}
        language={language}
        activeRequestsCount={requests.filter(r => r.status !== 'completed' && r.status !== 'cancelled').length}
        customer={customer}
        onOpenProfile={() => setIsProfileDrawerOpen(true)}
        onOpenPayments={() => setIsPaymentsModalOpen(true)}
      />
    </div>
  );
}
