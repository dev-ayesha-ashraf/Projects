"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";

export default function SoldInventory() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("status", "Sold")
      .order("date_sold", { ascending: false }); // falls back if date_sold does not exist
    
    if (!error && data) {
      setCars(data);
    } else {
      // Fallback
      const { data: fallbackData } = await supabase.from("cars").select("*").eq("status", "Sold");
      if (fallbackData) setCars(fallbackData);
    }
    setLoading(false);
  };

  return (
    <div className="bg-primary text-white min-h-screen flex flex-col font-[Poppins] antialiased">
      <NavigationBar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Glow */}
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-accent font-black tracking-widest text-xs uppercase bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
            Hall of Fame
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 tracking-tight">
            Sold <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Inventory</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
            Browse our successfully completed deals and premium vehicles delivered to happy owners.
          </p>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20 rounded-2xl glass-dark border border-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-xl font-bold mb-2">No Sold Vehicles Yet</h3>
            <p className="text-gray-400">All of our current inventory is still active</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car: any) => (
              <div key={car.id} className="glass-card rounded-2xl overflow-hidden relative flex flex-col group opacity-85 hover:opacity-100 transition duration-300">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={car.images && car.images[0] ? car.images[0] : "/car-placeholder.jpg"} 
                    alt={car.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider shadow">
                    SOLD
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
                    <div className="flex gap-1.5 flex-wrap mb-2">
                      <span className="bg-primary-light text-gray-400 rounded px-2.5 py-1 text-xs">{car.mileage ? car.mileage.toLocaleString() : '0'} km</span>
                      <span className="bg-primary-light text-gray-400 rounded px-2.5 py-1 text-xs">{car.transmission}</span>
                      <span className="bg-primary-light text-gray-400 rounded px-2.5 py-1 text-xs">{car.fuel_type}</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-3 line-clamp-1">{car.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
