"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, sold: 0, inquiries: 0, reviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [{ data: cars }, { data: sold }, { data: inquiries }, { data: reviews }] = await Promise.all([
        supabase.from("cars").select("id"),
        supabase.from("cars").select("id").eq("status", "Sold"),
        supabase.from("contact").select("id").eq("status", "Unread"),
        supabase.from("reviews").select("*").order("date", { ascending: false }).limit(3),
      ]);
      setStats({
        total: cars?.length || 0,
        sold: sold?.length || 0,
        inquiries: inquiries?.length || 0,
        reviews: reviews?.length || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-primary text-white min-h-screen py-16 px-6 font-[Poppins] animate-fade-in">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-accent font-black tracking-widest text-xs uppercase bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
            Control Panel
          </span>
          <h1 className="text-4xl md:text-6xl font-black mt-4 tracking-tight">
            Supreme Cars <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Admin</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg mt-3 max-w-xl mx-auto">
            Manage your car listings, respond to customer inquiries, and check reviews from a unified modern interface.
          </p>
        </div>

        {/* Dashboard Navigation */}
        <nav className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <Link 
            href="/admin/inventory" 
            className="group relative bg-primary-light hover:bg-primary-light/80 border border-white/5 hover:border-accent/40 rounded-2xl p-6 shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-4"
          >
            <div className="bg-accent/10 text-accent group-hover:bg-accent group-hover:text-primary-dark p-3.5 rounded-xl transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <div className="font-extrabold text-lg text-white">Manage Inventory</div>
              <div className="text-gray-400 text-xs mt-0.5">Vehicles, details & availability</div>
            </div>
          </Link>

          <Link 
            href="/admin/inquiries" 
            className="group relative bg-primary-light hover:bg-primary-light/80 border border-white/5 hover:border-accent/40 rounded-2xl p-6 shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-4"
          >
            <div className="bg-accent/10 text-accent group-hover:bg-accent group-hover:text-primary-dark p-3.5 rounded-xl transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <div className="font-extrabold text-lg text-white">Inquiries</div>
              <div className="text-gray-400 text-xs mt-0.5">Customer leads & messages</div>
            </div>
          </Link>

          <Link 
            href="/admin/reviews" 
            className="group relative bg-primary-light hover:bg-primary-light/80 border border-white/5 hover:border-accent/40 rounded-2xl p-6 shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-4"
          >
            <div className="bg-accent/10 text-accent group-hover:bg-accent group-hover:text-primary-dark p-3.5 rounded-xl transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <div className="font-extrabold text-lg text-white">Reviews</div>
              <div className="text-gray-400 text-xs mt-0.5">Manage customer testimonials</div>
            </div>
          </Link>
        </nav>

        {/* Stats Section */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up">
            <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"></div>
              <div className="text-6xl font-black text-white tracking-tight">{stats.total}</div>
              <div className="text-accent text-xs font-black uppercase tracking-widest mt-3">Active Listings</div>
              <div className="text-gray-400 text-xs mt-1">Ready for buyers to view</div>
            </div>
            
            <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
              <div className="text-6xl font-black text-white tracking-tight">{stats.sold}</div>
              <div className="text-green-400 text-xs font-black uppercase tracking-widest mt-3">Sold Inventory</div>
              <div className="text-gray-400 text-xs mt-1">Successfully processed deals</div>
            </div>

            <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
              <div className="text-6xl font-black text-white tracking-tight">{stats.inquiries}</div>
              <div className="text-yellow-400 text-xs font-black uppercase tracking-widest mt-3">New Inquiries</div>
              <div className="text-gray-400 text-xs mt-1">Customer messages waiting for reply</div>
            </div>
          </div>
        )}
        
        {/* Footer info link */}
        <div className="text-center mt-16 text-gray-500 text-sm animate-fade-in-up">
          Logged in as Administrator • <Link href="/" className="text-accent hover:underline">Go to Live Site</Link>
        </div>

      </div>
    </div>
  );
}
