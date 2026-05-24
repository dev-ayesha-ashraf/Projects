"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import NavigationBar from "../../../components/NavigationBar";
import Footer from "../../../components/Footer";

const conditions = {
  Excellent: "bg-green-500/20 text-green-400 border border-green-500/30",
  Good: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Fair: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  "Needs Repair": "bg-red-500/20 text-red-400 border border-red-500/30",
};

export default function CarDetailPage() {
  const [car, setCar] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("/car-placeholder.jpg");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Inquiry state
  const [inquiry, setInquiry] = useState({ name: "", email: "", phone: "", message: "" });
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetchCar();
  }, []);

  const fetchCar = async () => {
    setLoading(true);

    if (!id) {
      setError("No vehicle selected.");
      setLoading(false);
      return;
    }
    const { data, error: fetchError } = await supabase
      .from("cars")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setCar(data);
      setMainImage(data?.images?.[0] ?? "/car-placeholder.jpg");
    }
    setLoading(false);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryLoading(true);
    setInquirySuccess(false);
    try {
      const { error: insertError } = await supabase.from("inquiries").insert([
        {
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          message: inquiry.message,
          subject: `Inquiry on ${car?.brand} ${car?.model} (${car?.year})`,
          car_id: car?.id,
          created_at: new Date().toISOString(),
          status: "Unread",
        },
      ]);
      if (insertError) throw insertError;
      setInquiry({ name: "", email: "", phone: "", message: "" });
      setInquirySuccess(true);
    } catch (err: any) {
      alert("Error sending inquiry: " + err.message);
    }
    setInquiryLoading(false);
  };

  const inputClasses = "bg-primary-dark border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent w-full transition duration-300";

  if (loading) {
    return (
      <div className="bg-primary text-white min-h-screen flex flex-col font-[Poppins]">
        <NavigationBar />
        <div className="flex-1 flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="bg-primary text-white min-h-screen flex flex-col font-[Poppins]">
        <NavigationBar />
        <div className="flex-1 flex flex-col justify-center items-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold">{error || "Vehicle Not Found"}</h2>
          <a href="/" className="text-accent mt-4 hover:underline">Return to Home</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-primary text-white min-h-screen flex flex-col font-[Poppins] antialiased">
      <NavigationBar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Glow */}
        <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-accent/5 rounded-full filter blur-[150px] pointer-events-none" />
        {/* Dynamic Details Page Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8 animate-fade-in-up">
          {/* Left / Middle: Images & Specs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="h-96 md:h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                <img src={mainImage} alt={car.title} className="w-full h-full object-cover" />
              </div>
              {/* Carousel subimages */}
              {car.images && car.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {car.images.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Vehicle detail ${idx}`}
                      className="w-40 h-28 object-cover rounded-xl border border-white/10 shadow-md cursor-pointer hover:border-accent transition duration-300 flex-shrink-0"
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Specifications Details Grid */}
            <div className="glass-dark border border-white/5 rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-extrabold border-b border-white/5 pb-3">Vehicle Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div><div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Make</div><div className="text-white font-extrabold text-sm">{car.brand}</div></div>
                <div><div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Model</div><div className="text-white font-extrabold text-sm">{car.model}</div></div>
                <div><div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Year</div><div className="text-white font-extrabold text-sm">{car.year}</div></div>
                <div><div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Mileage</div><div className="text-white font-extrabold text-sm">{car.mileage ? car.mileage.toLocaleString() : '0'} km</div></div>
                <div><div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Transmission</div><div className="text-white font-extrabold text-sm">{car.transmission}</div></div>
                <div><div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Fuel Type</div><div className="text-white font-extrabold text-sm">{car.fuel_type}</div></div>
                <div><div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Engine Capacity</div><div className="text-white font-extrabold text-sm">{car.engine_capacity || "N/A"}</div></div>
                <div><div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Exterior Color</div><div className="text-white font-extrabold text-sm">{car.color || "N/A"}</div></div>
                <div><div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Condition</div><div><span className={`inline-block rounded px-2.5 py-0.5 text-xs font-bold ${conditions[car.condition as keyof typeof conditions] || 'bg-primary-light'}`}>{car.condition}</span></div></div>
              </div>
            </div>
            {/* Description */}
            <div className="glass-dark border border-white/5 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-extrabold border-b border-white/5 pb-3">Seller's Description</h3>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{car.description || "No description provided."}</p>
            </div>
            {/* Features List */}
            {car.features && car.features.length > 0 && (
              <div className="glass-dark border border-white/5 rounded-2xl p-8 space-y-4">
                <h3 className="text-xl font-extrabold border-b border-white/5 pb-3">Premium Features</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300"><span className="text-accent">✓</span>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Right Side: Price Card & Inquiry Form */}
          <div className="space-y-6">
            {/* Summary Price Card */}
            <div className="glass-dark border border-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
              <span className="text-accent font-black tracking-widest text-[10px] uppercase bg-accent/10 px-3 py-1 rounded-full border border-accent/20 self-start mb-4">Listing Price</span>
              <div className="text-3xl font-black text-white tracking-tight">PKR {car.price ? car.price.toLocaleString() : 'N/A'}</div>
              <h1 className="text-white font-extrabold text-xl mt-4">{car.brand} {car.model} ({car.year})</h1>
              <div className="text-gray-400 text-xs mt-1 line-clamp-2">{car.title}</div>
              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-gray-400 text-xs">Listing Status</span>
                <span className={`rounded px-3 py-1 text-xs font-black uppercase tracking-wider ${car.status === 'Sold' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>{car.status}</span>
              </div>
            </div>
            {/* Inquiry Form */}
            {car.status !== 'Sold' && (
              <div className="glass-dark border border-white/5 rounded-2xl p-8 shadow-xl space-y-6">
                <div><h3 className="text-xl font-extrabold text-white">Purchase Inquiry</h3><p className="text-gray-400 text-xs mt-1">Submit your info to connect with our dealer immediately.</p></div>
                {inquirySuccess && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-xs font-bold">Inquiry sent successfully! Our team will contact you shortly.</div>
                )}
                <form className="space-y-4" onSubmit={handleInquirySubmit}>
                  <div><input type="text" placeholder="Your Name *" className={inputClasses} required value={inquiry.name} onChange={e => setInquiry(prev => ({ ...prev, name: e.target.value }))} /></div>
                  <div><input type="email" placeholder="Your Email *" className={inputClasses} required value={inquiry.email} onChange={e => setInquiry(prev => ({ ...prev, email: e.target.value }))} /></div>
                  <div><input type="text" placeholder="Phone Number" className={inputClasses} value={inquiry.phone} onChange={e => setInquiry(prev => ({ ...prev, phone: e.target.value }))} /></div>
                  <div><textarea placeholder="Type your message..." className={`${inputClasses} resize-none`} rows={3} value={inquiry.message} onChange={e => setInquiry(prev => ({ ...prev, message: e.target.value }))} /></div>
                  <button type="submit" disabled={inquiryLoading} className="w-full bg-accent hover:bg-accent-dark text-primary-dark font-black py-3 rounded-xl shadow-lg transition duration-300 disabled:opacity-50 cursor-pointer text-sm">
                    {inquiryLoading ? 'Sending message...' : 'Send Inquiry'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
