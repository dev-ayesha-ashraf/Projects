"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="w-full glass-dark sticky top-0 z-[999] px-6 py-4 flex items-center justify-between border-b border-white/5 shadow-2xl transition-all duration-300">
      
      {/* Brand Logo & Name */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="bg-accent/10 border border-accent/20 p-2 rounded-xl group-hover:bg-accent group-hover:text-primary-dark text-accent transition-all duration-300 transform group-hover:rotate-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="font-black text-2xl tracking-wider text-white group-hover:text-accent transition duration-300">
          SUPREME CARS
        </span>
      </Link>

      {/* Nav Menu Items */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-300">
        <li>
          <Link href="/" className="hover:text-accent transition duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-accent after:transition-all after:duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/car-listing" className="hover:text-accent transition duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-accent after:transition-all after:duration-300">
            Our Inventory
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-accent transition duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-accent after:transition-all after:duration-300">
            Contact Us
          </Link>
        </li>
      </ul>

      {/* Action Button */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Link 
              href="/admin/dashboard" 
              className="bg-accent hover:bg-accent-dark text-primary-dark px-5 py-2 rounded-xl font-black text-xs tracking-wide shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Admin Panel
            </Link>
            <button 
              onClick={handleLogout}
              className="border border-white/10 hover:border-red-500 hover:text-red-400 text-gray-400 px-4 py-2 rounded-xl font-bold text-xs transition duration-300 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link 
            href="/login" 
            className="bg-accent hover:bg-accent-dark text-primary-dark px-6 py-2.5 rounded-xl font-black text-sm tracking-wide shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Login
          </Link>
        )}
      </div>

    </nav>
  );
}
