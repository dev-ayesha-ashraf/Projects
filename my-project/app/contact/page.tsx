"use client";
import React, { useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import { supabase } from '@/lib/supabaseClient';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const { error: dbError } = await supabase.from('contact').insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject || 'General Inquiry',
          message: form.message,
          status: 'Unread'
        }
      ]);

      if (dbError) throw dbError;

      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "bg-primary-light border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent w-full transition duration-300";
  const labelClasses = "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2";

  return (
    <div className="bg-primary text-white min-h-screen flex flex-col font-[Poppins] antialiased overflow-x-hidden">
      <NavigationBar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Soft background light reflections */}
        <div className="absolute top-[30%] left-[-15%] w-[450px] h-[450px] bg-accent/5 rounded-full filter blur-[130px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute top-[60%] right-[-15%] w-[450px] h-[450px] bg-accent/5 rounded-full filter blur-[130px] pointer-events-none animate-pulse-slow"></div>

        {/* Header Title */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-accent font-black tracking-widest text-xs uppercase bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 tracking-tight">
            Contact <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Supreme Cars</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
            Have questions about a premium listing or looking for custom imports in Karachi? Reach out to our advisors immediately.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 animate-fade-in-up">
          
          {/* Left Column: Direct Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Address Card */}
            <div className="glass-dark border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent group-hover:via-accent transition duration-300"></div>
              <div className="flex gap-4">
                <div className="bg-accent/10 text-accent p-3.5 rounded-xl self-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg">Karachi Showroom</h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    Plot 38-C, Street 5,<br />
                    Clifton, Karachi,<br />
                    Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connections */}
            <div className="glass-dark border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent group-hover:via-accent transition duration-300"></div>
              <div className="flex gap-4">
                <div className="bg-accent/10 text-accent p-3.5 rounded-xl self-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg">Direct Hotlines</h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    <strong>Dealership:</strong> +92 21 3569 4343<br />
                    <strong>WhatsApp Support:</strong> +92 300 569 4343
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="glass-dark border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent group-hover:via-accent transition duration-300"></div>
              <div className="flex gap-4">
                <div className="bg-accent/10 text-accent p-3.5 rounded-xl self-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg">Dealership Hours</h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    <strong>Monday - Friday:</strong> 9:00 AM - 8:00 PM<br />
                    <strong>Saturday - Sunday:</strong> 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form (8 cols) */}
          <div className="lg:col-span-8">
            <div className="glass-dark border border-white/10 rounded-3xl p-10 shadow-2xl relative">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"></div>
              
              <h2 className="text-2xl font-black text-white tracking-tight mb-2">Send Secure Inquiry</h2>
              <p className="text-gray-400 text-xs mb-8">Fields marked with * are required. Your data remains fully secure.</p>

              {success && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl text-sm font-bold mb-6 animate-pulse">
                  Thank you! Your message has been sent successfully. One of our Clifton advisors will contact you shortly.
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm font-bold mb-6">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Your Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="e.g. Muhammad Ali" 
                      required 
                      value={form.name}
                      onChange={handleChange}
                      className={inputClasses} 
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="e.g. ali@email.com" 
                      required 
                      value={form.email}
                      onChange={handleChange}
                      className={inputClasses} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Phone Number</label>
                    <input 
                      type="text" 
                      name="phone"
                      placeholder="e.g. +92 300 1234567" 
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClasses} 
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Subject *</label>
                    <input 
                      type="text" 
                      name="subject"
                      placeholder="e.g. Import Request, Booking details..." 
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClasses} 
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Message *</label>
                  <textarea 
                    name="message"
                    placeholder="Provide a detailed message. If inquiring about a specific listing, please mention make & model..." 
                    required 
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`} 
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-accent hover:bg-accent-dark text-primary-dark font-black px-10 py-4 rounded-xl shadow-lg hover:shadow-accent/15 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending Message...' : 'Submit Inquiry'}
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
