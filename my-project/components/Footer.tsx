"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-primary-dark text-white pt-20 pb-8 mt-24 border-t border-white/5 relative overflow-hidden">
      
      {/* Soft glow asset inside footer */}
      <div className="absolute bottom-0 right-10 w-[250px] h-[250px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/5 relative z-10">
        
        {/* Brand Details */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-accent/10 border border-accent/20 p-2 rounded-xl text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-black text-xl tracking-wider text-white">SUPREME CARS</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mt-2">
            Karachi's trusted automotive marketplace. Buying, selling, and importing premium cars with absolute confidence since 2016.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-extrabold text-sm uppercase tracking-wider text-accent mb-1">Explore</h4>
          <Link href="/" className="text-gray-400 hover:text-white transition duration-200 text-sm">Home</Link>
          <Link href="/car-listing" className="text-gray-400 hover:text-white transition duration-200 text-sm">Inventory</Link>
          <Link href="/contact" className="text-gray-400 hover:text-white transition duration-200 text-sm">Contact Us</Link>
        </div>

        {/* Support contacts */}
        <div className="flex flex-col gap-3">
          <h4 className="font-extrabold text-sm uppercase tracking-wider text-accent mb-1">Contact</h4>
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +92 21 3569 4343
          </span>
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@supremecars.com
          </span>
          <span className="text-gray-400 text-sm leading-relaxed">
            Plot 38-C, Street 5, Clifton, Karachi, Pakistan
          </span>
        </div>

        {/* VIP newsletter updates */}
        <div className="flex flex-col gap-4">
          <h4 className="font-extrabold text-sm uppercase tracking-wider text-accent">VIP Mailing List</h4>
          <p className="text-gray-400 text-xs leading-relaxed">
            Subscribe to get early notifications for exclusive premium models in Karachi.
          </p>
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email..." 
              className="bg-primary/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent w-full transition" 
            />
            <button 
              type="submit" 
              className="bg-accent hover:bg-accent-dark text-primary-dark px-3 py-2 rounded-lg text-xs font-black transition duration-300"
            >
              Join
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 relative z-10">
        <span>© 2026 Supreme Cars Pakistan. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-white transition duration-200">Terms of Use</a>
        </div>
      </div>

    </footer>
  );
}
