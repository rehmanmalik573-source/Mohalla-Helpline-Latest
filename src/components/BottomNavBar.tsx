import React, { useState, useEffect } from 'react';
import { Home, Search, ClipboardList, User } from 'lucide-react';
import { Language, CustomerProfile } from '../types';
import { translations } from '../data/translations';

interface BottomNavBarProps {
  currentView: 'home' | 'categories' | 'requests' | 'find_service';
  onNavigate: (view: 'home' | 'categories' | 'requests' | 'find_service') => void;
  language: Language;
  activeRequestsCount: number;
  customer: CustomerProfile | null;
  onOpenProfile: () => void;
  onOpenPayments?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentView,
  onNavigate,
  language,
  activeRequestsCount,
  customer,
  onOpenProfile,
}) => {
  const t = translations[language];
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setTimeout(() => {
        const active = document.activeElement as HTMLElement | null;
        if (!active || (active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA' && !active.isContentEditable)) {
          setIsKeyboardOpen(false);
        }
      }, 50);
    };

    const handleViewportResize = () => {
      if (window.visualViewport) {
        const isShrunk = window.innerHeight - window.visualViewport.height > 150;
        if (isShrunk) {
          setIsKeyboardOpen(true);
        }
      }
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    window.visualViewport?.addEventListener('resize', handleViewportResize);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
      window.visualViewport?.removeEventListener('resize', handleViewportResize);
    };
  }, []);

  if (isKeyboardOpen) {
    return null;
  }

  return (
    <nav 
      id="mobile-bottom-nav-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-2 pb-[max(0.375rem,env(safe-area-inset-bottom))] flex items-center justify-around shadow-lg sm:max-w-md sm:mx-auto sm:rounded-t-3xl"
    >
      {/* 1. Home */}
      <button
        id="bottom-nav-customer-home"
        onClick={() => onNavigate('home')}
        className={`flex-1 flex flex-col items-center justify-center py-1 rounded-2xl transition-all cursor-pointer ${
          currentView === 'home'
            ? 'text-amber-600 font-black'
            : 'text-slate-500 hover:text-slate-800 font-semibold'
        }`}
      >
        <div className={`p-1 rounded-xl ${currentView === 'home' ? 'bg-amber-100/70' : ''}`}>
          <Home className="w-4 h-4" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">{t.home}</span>
      </button>

      {/* 2. Find Service */}
      <button
        id="bottom-nav-customer-find"
        onClick={() => onNavigate('find_service')}
        className={`flex-1 flex flex-col items-center justify-center py-1 rounded-2xl transition-all cursor-pointer ${
          currentView === 'find_service'
            ? 'text-amber-600 font-black'
            : 'text-slate-500 hover:text-slate-800 font-semibold'
        }`}
      >
        <div className={`p-1 rounded-xl ${currentView === 'find_service' ? 'bg-amber-100/70' : ''}`}>
          <Search className="w-4 h-4" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">{t.findService}</span>
      </button>

      {/* 3. My Requests */}
      <button
        id="bottom-nav-customer-requests"
        onClick={() => onNavigate('requests')}
        className={`flex-1 flex flex-col items-center justify-center py-1 rounded-2xl transition-all relative cursor-pointer ${
          currentView === 'requests'
            ? 'text-amber-600 font-black'
            : 'text-slate-500 hover:text-slate-800 font-semibold'
        }`}
      >
        <div className={`p-1 rounded-xl relative ${currentView === 'requests' ? 'bg-amber-100/70' : ''}`}>
          <ClipboardList className="w-4 h-4" />
          {activeRequestsCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-3.5 h-3.5 px-0.5 rounded-full bg-amber-500 text-white text-[8px] font-black flex items-center justify-center">
              {activeRequestsCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">{t.myRequests}</span>
      </button>

      {/* 4. My Profile */}
      <button
        id="bottom-nav-customer-profile"
        onClick={onOpenProfile}
        className="flex-1 flex flex-col items-center justify-center py-1 rounded-2xl text-slate-500 hover:text-slate-800 font-semibold transition-all cursor-pointer"
      >
        <div className="p-1 rounded-xl">
          {customer?.avatar && customer.isLoggedIn ? (
            <img src={customer.avatar} alt="Profile" className="w-4 h-4 rounded-full object-cover" />
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">{t.profile}</span>
      </button>
    </nav>
  );
};
