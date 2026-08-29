import React, { useState } from 'react';
import { 
  Menu, 
  MapPin, 
  ChevronDown, 
  Bell, 
  X, 
  Check, 
  PhoneCall, 
  ShieldCheck, 
  Home, 
  Grid, 
  ClipboardList, 
  User, 
  HelpCircle, 
  RefreshCw, 
  CreditCard, 
  Heart, 
  Star, 
  Info, 
  Settings, 
  LogOut, 
  ArrowRight
} from 'lucide-react';
import { Language, ServiceRequest, CustomerProfile, CustomerNotification } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  currentLocation: string;
  onLocationChange: (loc: string) => void;
  requests: ServiceRequest[];
  customer: CustomerProfile | null;
  notifications: CustomerNotification[];
  onNavigate: (view: 'home' | 'categories' | 'requests' | 'find_service') => void;
  onOpenRequests: () => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  onOpenHelpSupport: () => void;
  onOpenPayments: () => void;
  onOpenReviews: () => void;
  onOpenSaved: () => void;
  onOpenAbout: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  onMarkNotificationRead?: (id?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  currentLocation,
  onLocationChange,
  requests,
  customer,
  notifications,
  onNavigate,
  onOpenRequests,
  onOpenProfile,
  onOpenAuth,
  onOpenHelpSupport,
  onOpenPayments,
  onOpenReviews,
  onOpenSaved,
  onOpenAbout,
  onOpenSettings,
  onLogout,
  onMarkNotificationRead,
}) => {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const t = translations[language];
  const activeRequestsCount = requests.filter(
    r => r.status !== 'completed' && r.status !== 'cancelled'
  ).length;

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const handleQuickRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <header id="mohalla-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2">
        {/* Left: Hamburger & Location */}
        <div className="flex items-center gap-2">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-slate-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/70 transition-colors cursor-pointer"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-slate-900" />
          </button>

          {/* Location Selector */}
          <div className="relative">
            <button
              id="header-location-dropdown-btn"
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="text-left flex flex-col focus:outline-none cursor-pointer group"
            >
              <span className="text-[9px] text-slate-400 font-bold uppercase leading-none">
                {t.nearbyLocation}
              </span>
              <span className="flex items-center gap-1 text-xs sm:text-sm font-black text-slate-900 mt-0.5 group-hover:text-amber-600 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-amber-600 fill-amber-500 shrink-0" />
                <span className="truncate max-w-[110px] sm:max-w-[160px]">{currentLocation}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-700" />
              </span>
            </button>

            {/* Location Dropdown */}
            {isLocationDropdownOpen && (
              <div 
                id="location-picker-popup"
                className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {language === 'hi' ? 'अपना मोहल्ला चुनें' : 'Select Locality'}
                </div>
                {t.locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      onLocationChange(loc);
                      setIsLocationDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-amber-50 transition-colors cursor-pointer ${
                      currentLocation === loc ? 'text-amber-600 bg-amber-50/60 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>{loc}</span>
                    {currentLocation === loc && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center/Right: Controls (Language Switcher, Notifications, Refresh) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher - ALWAYS VISIBLE with shrink-0 and high contrast */}
          <div className="flex items-center gap-1 shrink-0">
            <div 
              id="header-lang-toggle-container"
              className="flex items-center p-0.5 bg-slate-100/95 rounded-full border border-slate-200 text-[10px] sm:text-[11px] font-bold shadow-2xs shrink-0"
            >
              <button
                id="lang-hi-btn"
                type="button"
                onClick={() => onToggleLanguage('hi')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-amber-500 text-white shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Hindi / हिंदी"
              >
                हिं
              </button>
              <button
                id="lang-en-btn"
                type="button"
                onClick={() => onToggleLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-500 text-white shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English / अंग्रेज़ी"
              >
                EN
              </button>
            </div>

            {/* Round Language Switch Button - Always Visible, High-Contrast */}
            <button
              id="header-lang-switch-arrow-btn"
              type="button"
              onClick={() => onToggleLanguage(language === 'hi' ? 'en' : 'hi')}
              title={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
              aria-label="Toggle Language English Hindi"
              className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-600 text-white border border-amber-600 flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs shrink-0 group font-extrabold text-[10px]"
            >
              <span className="group-hover:scale-110 transition-transform">
                {language === 'hi' ? 'EN' : 'हिं'}
              </span>
            </button>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              id="notification-bell-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-3.5 h-3.5 text-slate-700" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Popup */}
            {showNotifications && (
              <>
                {/* Non-blocking invisible click-outside backdrop */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)} 
                />
                
                <div 
                  id="notifications-popup"
                  className="absolute right-0 top-full mt-2 w-72 sm:w-84 bg-white rounded-3xl shadow-2xl border border-slate-200 p-3.5 z-50 space-y-2.5 animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-black text-slate-900">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-600" />
                      <span>{language === 'hi' ? 'सूचनाएं' : 'Notifications'}</span>
                      {unreadNotificationsCount > 0 && (
                        <span className="text-[10px] text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-full font-bold">
                          {unreadNotificationsCount} {language === 'hi' ? 'नई' : 'New'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {unreadNotificationsCount > 0 && onMarkNotificationRead && (
                        <button
                          type="button"
                          onClick={() => onMarkNotificationRead()}
                          className="text-[10px] text-amber-700 hover:text-amber-800 font-bold hover:underline cursor-pointer"
                        >
                          {language === 'hi' ? 'सभी पढ़ें' : 'Mark all read'}
                        </button>
                      )}
                      <button
                        id="close-notifications-btn"
                        type="button"
                        onClick={() => setShowNotifications(false)}
                        className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors"
                        aria-label="Close Notifications"
                      >
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-[11px] space-y-2 max-h-72 overflow-y-auto pr-0.5">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-slate-400 text-xs font-semibold">
                        {language === 'hi' ? 'कोई नई सूचना नहीं है' : 'No notifications yet'}
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          onClick={() => {
                            if (!notif.read && onMarkNotificationRead) {
                              onMarkNotificationRead(notif.id);
                            }
                            setShowNotifications(false);
                            if (notif.requestId) {
                              onOpenRequests();
                            }
                          }}
                          className={`p-2.5 rounded-2xl border cursor-pointer transition-colors ${
                            !notif.read
                              ? 'bg-amber-50/70 hover:bg-amber-100/70 border-amber-200 text-slate-900'
                              : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200/70 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between font-extrabold text-xs">
                            <span className="text-slate-900">{language === 'hi' ? notif.titleHi : notif.title}</span>
                            <span className="text-[9px] text-slate-400 font-normal">{notif.timestamp}</span>
                          </div>
                          <p className="text-slate-600 mt-1 font-medium leading-relaxed">
                            {language === 'hi' ? notif.messageHi : notif.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Avatar */}
          <button
            id="header-profile-btn"
            onClick={customer?.isLoggedIn ? onOpenProfile : onOpenAuth}
            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs cursor-pointer overflow-hidden ring-2 ring-amber-300/40 shrink-0"
            title={customer?.isLoggedIn ? customer.name : t.loginRegister}
          >
            {customer?.avatar && customer.isLoggedIn ? (
              <img src={customer.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Slide-out Hamburger Menu Drawer with Clearly Visible Close 'X' Button and Tap Outside to Close */}
      {isMobileMenuOpen && (
        <div 
          id="hamburger-menu-overlay"
          className="fixed inset-0 z-[100] bg-slate-950/65 backdrop-blur-xs flex justify-start items-stretch animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
          }}
        >
          <div 
            id="hamburger-menu-drawer"
            className="w-80 max-w-[85vw] bg-white h-screen h-[100dvh] max-h-screen shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-200 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Top Header: Brand + Prominent 'X' Close Button */}
            <div className="p-4 sm:p-5 pb-3 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                  M
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 tracking-tight">
                    MOHALLA <span className="text-amber-500">HELPLINE</span>
                  </div>
                  <div className="text-[9px] text-slate-400 font-semibold">{t.tagline}</div>
                </div>
              </div>

              {/* Clearly Visible & High-Contrast Close Button */}
              <button
                id="close-hamburger-menu-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-800 hover:text-rose-600 flex items-center justify-center cursor-pointer transition-colors shadow-2xs border border-slate-200"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Scrollable Menu Items Container with flex-1 min-h-0 */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 py-3 space-y-3 overscroll-contain">
              {/* User Identity / Profile Mini Card */}
              <div 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (customer?.isLoggedIn) onOpenProfile();
                  else onOpenAuth();
                }}
                className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-2.5 flex items-center justify-between cursor-pointer hover:bg-amber-100/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-amber-300 ring-2 ring-amber-400 shrink-0">
                    <img 
                      src={customer?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80'} 
                      alt="User" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 truncate max-w-[140px]">
                      {customer?.isLoggedIn ? customer.name : (language === 'hi' ? 'नमस्ते, अतिथि' : 'Hello, Guest')}
                    </div>
                    <div className="text-[10px] text-amber-800 font-semibold truncate max-w-[140px]">
                      {customer?.isLoggedIn ? customer.locality : (language === 'hi' ? 'लॉगिन / साइनअप करें' : 'Login / Register')}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </div>

              {/* CUSTOMER MENU ITEMS */}
              <div className="space-y-0.5 text-xs font-bold text-slate-700">
                {/* 1. Home */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('home');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <Home className="w-4 h-4 text-amber-600" />
                  <span>{t.home}</span>
                </button>

                {/* 2. My Profile */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (customer?.isLoggedIn) onOpenProfile();
                    else onOpenAuth();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <User className="w-4 h-4 text-amber-600" />
                  <span>{t.profile}</span>
                </button>

                {/* 3. All Services */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('categories');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <Grid className="w-4 h-4 text-amber-600" />
                  <span>{t.allCategories}</span>
                </button>

                {/* 4. My Requests */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenRequests();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center justify-between text-slate-800 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ClipboardList className="w-4 h-4 text-amber-600" />
                    <span>{t.myRequests}</span>
                  </div>
                  {activeRequestsCount > 0 && (
                    <span className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                      {activeRequestsCount}
                    </span>
                  )}
                </button>

                {/* 5. Notifications */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowNotifications(true);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center justify-between text-slate-800 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-amber-600" />
                    <span>{language === 'hi' ? 'सूचनाएं' : 'Notifications'}</span>
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {/* 6. Payments */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenPayments();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>{t.payments}</span>
                </button>

                {/* 7. My Reviews */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenReviews();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>{t.myReviews}</span>
                </button>

                {/* 8. Saved Providers */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSaved();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>{t.savedProviders}</span>
                </button>

                {/* 9. Help & Support */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenHelpSupport();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>{t.helpSupport}</span>
                </button>

                {/* 10. About Mohalla Helpline */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAbout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <Info className="w-4 h-4 text-slate-500" />
                  <span>{t.aboutApp}</span>
                </button>

                {/* 12. Settings */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-600" />
                  <span>{t.settings}</span>
                </button>

                {/* 13. Logout */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 flex items-center gap-3 text-rose-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>{t.logout}</span>
                </button>
              </div>
            </div>

            {/* Bottom brand indicator */}
            <div className="py-2.5 px-4 border-t border-slate-100 bg-slate-50 text-center text-[10px] text-slate-400 font-semibold shrink-0">
              Mohalla Helpline
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
