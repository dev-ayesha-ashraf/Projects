"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Successfully signed in, redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-primary font-[Poppins] overflow-hidden">
      {/* Left Side: Info & Visual branding */}
      <div className="hidden md:flex flex-col justify-between items-start w-1/2 p-16 relative bg-gradient-to-br from-primary via-primary-light to-primary-dark border-r border-white/5">
        {/* Glow effect */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse-slow"></div>
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-accent/10 border border-accent/20 p-2 rounded-xl text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-extrabold text-2xl tracking-wider text-white">SUPREME CARS</span>
        </div>

        {/* Center Welcome Statement */}
        <div className="relative z-10 max-w-lg mb-20 animate-fade-in-up">
          <span className="text-accent font-black tracking-widest text-xs uppercase bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
            Exclusive Portal
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-white mt-6 leading-tight tracking-tight">
            Elevate your <br />
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">experience.</span>
          </h1>
          <p className="text-gray-400 text-lg mt-6 leading-relaxed">
            Gain secure access to the Supreme Cars control suite. Oversee live inventories, manage custom responses, and inspect metrics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-8 w-full border-t border-white/5 pt-8 relative z-10">
          <div>
            <div className="text-3xl font-black text-white">100%</div>
            <div className="text-gray-500 text-xs mt-1 uppercase font-bold tracking-wider">Secured</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">256-bit</div>
            <div className="text-gray-500 text-xs mt-1 uppercase font-bold tracking-wider">Encryption</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">24/7</div>
            <div className="text-gray-500 text-xs mt-1 uppercase font-bold tracking-wider">Uptime</div>
          </div>
        </div>
      </div>

      {/* Right Side: Glassmorphism Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-primary-dark relative">
        {/* Glow effect */}
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none animate-pulse-slow"></div>

        <div className="w-full max-w-md glass-dark border border-white/10 rounded-3xl p-10 relative z-10 shadow-2xl animate-fade-in-up">
          
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white tracking-tight">System Sign-In</h2>
            <p className="text-gray-400 text-sm mt-2">Enter credentials to authenticate session.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-bold mb-6 animate-shake">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSignIn}>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
                <input 
                  type="email" 
                  className="w-full bg-primary/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition duration-300" 
                  placeholder="you@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input 
                  type="password" 
                  className="w-full bg-primary/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition duration-300" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2.5 text-xs text-gray-400 cursor-pointer select-none">
                <input type="checkbox" className="w-4 h-4 rounded bg-primary/50 border border-white/10 text-accent focus:ring-0 focus:ring-offset-0 cursor-pointer accent-accent" /> Remember device
              </label>
              <a href="#" className="text-accent hover:underline text-xs font-bold">Trouble signing in?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-dark text-primary-dark font-black py-4 rounded-xl shadow-lg hover:shadow-accent/15 transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-dark"></div>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8 text-xs text-gray-500">
            Authorized admin use only. <Link href="/" className="text-accent font-bold hover:underline">Return to Home</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
