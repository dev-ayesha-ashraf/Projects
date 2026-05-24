"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";

const conditions = {
  Excellent: "bg-green-500/20 text-green-400 border border-green-500/30",
  Good: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Fair: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  "Needs Repair": "bg-red-500/20 text-red-400 border border-red-500/30",
};

export default function CarListing() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ brand: "", model: "", minPrice: "", maxPrice: "", year: "", condition: "", transmission: "", fuel_type: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("status", "Available")
      .order("date_added", { ascending: false }); // falls back to date_added if columns mismatch
    
    if (!error && data) {
      setCars(data);
    } else {
      // Try active listing fallback
      const { data: fallbackData } = await supabase.from("cars").select("*");
      if (fallbackData) setCars(fallbackData.filter(car => car.status !== 'Sold'));
    }
    setLoading(false);
  };

  const filteredCars = cars.filter((car: any) => {
    if (filters.brand && car.brand !== filters.brand) return false;
    if (filters.model && car.model !== filters.model) return false;
    if (filters.year && String(car.year) !== filters.year) return false;
    if (filters.condition && car.condition !== filters.condition) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (filters.fuel_type && car.fuel_type !== filters.fuel_type) return false;
    if (filters.minPrice && car.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && car.price > Number(filters.maxPrice)) return false;
    if (search && !(car.brand + " " + car.model + " " + car.title).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const brands = Array.from(new Set(cars.map((c: any) => c.brand))).filter(Boolean);
  const models = Array.from(new Set(cars.map((c: any) => c.model))).filter(Boolean);
  const years = Array.from(new Set(cars.map((c: any) => c.year))).filter(Boolean);

  const selectClasses = "bg-primary-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent w-full transition cursor-pointer";
  const inputClasses = "bg-primary-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent w-full transition";

  return (
    <div className="min-h-full flex flex-col font-[Poppins] antialiased bg-primary text-white overflow-x-hidden">
      <NavigationBar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Glow */}
        <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-accent/5 rounded-full filter blur-[150px] pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-accent font-black tracking-widest text-xs uppercase bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
            Showroom catalog
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 tracking-tight">
            Browse Our <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Collection</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
            Discover verified performance models, dynamic imports, and custom vehicles listed by active verified owners.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar Filters */}
          <aside className="md:w-1/3 lg:w-1/4">
            <div className="glass-dark border border-white/5 rounded-2xl p-6 mb-12 shadow-xl animate-fade-in-up">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-accent mb-4 border-b border-white/5 pb-2">
                Advanced Filters
              </h3>
              <div className="grid grid-cols-1 gap-4">
                
                {/* Search */}
                <div>
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                    className={inputClasses} 
                  />
                </div>

                {/* Brand */}
                <div>
                  <select value={filters.brand} onChange={e => setFilters(f => ({ ...f, brand: e.target.value }))} className={selectClasses}>
                    <option value="">Brand (All)</option>
                    {brands.map((b: string) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                {/* Model */}
                <div>
                  <select value={filters.model} onChange={e => setFilters(f => ({ ...f, model: e.target.value }))} className={selectClasses}>
                    <option value="">Model (All)</option>
                    {models.map((m: string) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                {/* Year */}
                <div>
                  <select value={filters.year} onChange={e => setFilters(f => ({ ...f, year: e.target.value }))} className={selectClasses}>
                    <option value="">Year (All)</option>
                    {years.map((y: any) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <select value={filters.condition} onChange={e => setFilters(f => ({ ...f, condition: e.target.value }))} className={selectClasses}>
                    <option value="">Condition (All)</option>
                    {Object.keys(conditions).map((c: string) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Transmission */}
                <div>
                  <select value={filters.transmission} onChange={e => setFilters(f => ({ ...f, transmission: e.target.value }))} className={selectClasses}>
                    <option value="">Transmission (All)</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                {/* Fuel */}
                <div>
                  <select value={filters.fuel_type} onChange={e => setFilters(f => ({ ...f, fuel_type: e.target.value }))} className={selectClasses}>
                    <option value="">Fuel (All)</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                {/* Pricing range */}
                <div className="flex gap-2">
                  <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))} className={inputClasses} />
                  <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))} className={inputClasses} />
                </div>

              </div>

              {/* Reset Filters button */}
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => setFilters({ brand: "", model: "", minPrice: "", maxPrice: "", year: "", condition: "", transmission: "", fuel_type: "" })}
                  className="text-accent hover:text-accent-light text-xs font-bold transition flex items-center gap-1"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column Listings */}
          <section className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="text-center py-20 rounded-2xl glass-dark border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold mb-2">No Vehicles Found</h3>
                <p className="text-gray-400">Try adjusting your filters or search keywords</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredCars.map((car: any) => (
                  <Link key={car.id} href={`/car-detail?id=${car.id}`} className="no-underline block h-full">
                    <div className="glass-card rounded-2xl overflow-hidden relative flex flex-col group h-full transition duration-300">
                      <div className="relative overflow-hidden h-48 w-full">
                        <img 
                          src={car.images && car.images[0] ? car.images[0] : "/car-placeholder.jpg"} 
                          alt={car.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`inline-block rounded px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${conditions[car.condition as keyof typeof conditions] || 'bg-primary-light'}`}>
                            {car.condition}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h2 className="text-white font-extrabold text-xl mb-1 group-hover:text-accent transition duration-300">
                            {car.brand} {car.model} <span className="text-gray-400 font-normal text-base">({car.year})</span>
                          </h2>
                          <div className="text-accent font-black text-lg mb-4">
                            PKR {car.price ? car.price.toLocaleString() : 'N/A'}
                          </div>
                          
                          <div className="flex gap-1.5 flex-wrap mb-4">
                            <span className="bg-primary-light text-gray-400 rounded px-2.5 py-1 text-[10px] uppercase font-bold">{car.mileage ? car.mileage.toLocaleString() : '0'} km</span>
                            <span className="bg-primary-light text-gray-400 rounded px-2.5 py-1 text-[10px] uppercase font-bold">{car.transmission}</span>
                            <span className="bg-primary-light text-gray-400 rounded px-2.5 py-1 text-[10px] uppercase font-bold">{car.fuel_type}</span>
                          </div>
                          <p className="text-gray-400 text-xs line-clamp-1">{car.title}</p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-accent transition duration-300">
                          <span>View Specifications</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
