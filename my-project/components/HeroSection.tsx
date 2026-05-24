"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/car-listing?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/car-listing');
    }
  };

  return (
    <section className="relative w-full min-h-[640px] flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-20 bg-primary overflow-hidden border-b border-white/5">
      
      {/* Background image overlay with strong gradient mask */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Luxury Road background" 
          className="w-full h-full object-cover opacity-25 object-center scale-105 transition-all duration-[10000ms] ease-out hover:scale-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-12 left-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none animate-pulse-slow"></div>

      {/* Left: Premium Typography & Glassmorphism Search */}
      <div className="relative z-10 flex-1 flex flex-col items-start justify-center text-left max-w-3xl animate-fade-in-up">
        
        <span className="text-accent font-black tracking-widest text-xs uppercase bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20 mb-6">
          Karachi's Premier Car Marketplace
        </span>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
          Find Your Perfect <br />
          <span className="bg-gradient-to-r from-accent via-accent-light to-accent-dark bg-clip-text text-transparent">
            Dream Machine
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
          Access verified luxury, performance, and imported vehicles in Clifton, Karachi. Buying and selling reimagined with fast, secure, and transparent terms.
        </p>

        {/* Search Panel (Glassmorphism) - Fully Working! */}
        <form 
          className="flex w-full max-w-xl glass p-2 rounded-2xl border border-white/10 shadow-2xl relative" 
          onSubmit={handleSearch}
        >
          <div className="flex-1 flex items-center relative pl-3.5">
            <span className="text-gray-400 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search make, model, or category..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full py-3.5 bg-transparent border-0 text-white placeholder-gray-500 focus:outline-none focus:ring-0 text-base" 
            />
          </div>
          <button 
            type="submit" 
            className="px-8 py-3.5 bg-accent hover:bg-accent-dark text-primary-dark font-black rounded-xl text-sm shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ml-2"
          >
            Search
          </button>
        </form>

        {/* Quick Trust badges */}
        <div className="flex gap-8 mt-10 text-xs font-bold uppercase tracking-wider text-gray-500">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>100% Inspected</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16V5" />
            </svg>
            <span>Flexible Finance</span>
          </div>
        </div>

      </div>

      {/* Right: Premium Floating Showcase Car */}
      <div className="relative z-10 flex-1 flex justify-center items-center mt-12 lg:mt-0 animate-float lg:pl-10">
        <div className="relative p-3 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/15 shadow-2xl shadow-black/80 max-w-lg lg:max-w-xl overflow-hidden group">
          
          {/* Reflection Sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition duration-1500 ease-out"></div>
          
          <img 
            src="/hero-car.jpg" 
            alt="Feature Vehicle Showcase" 
            className="w-full object-cover rounded-[2rem] aspect-[4/3] group-hover:scale-102 transition duration-700" 
          />
          
          {/* Floating Showcase label */}
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass border border-white/15 backdrop-blur-lg flex justify-between items-center">
            <div>
              <div className="text-[10px] uppercase font-black tracking-widest text-accent">Feature Showcase</div>
              <div className="text-white font-extrabold text-sm mt-0.5">2026 Aston Martin Vantage</div>
            </div>
            <div className="bg-accent text-primary-dark font-black text-xs px-3.5 py-1.5 rounded-lg">
              View Deal
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
