"use client";
import React from 'react';
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection';
import CarCard from '../components/CarCard';
import SectionTitle from '../components/SectionTitle';
import StatsSection from '../components/StatsSection';
import ReviewsSection from './ReviewsSection';
import Footer from '../components/Footer';

// Fetch cars dynamically from Supabase
import { supabase } from '@/lib/supabaseClient';

export default function HomePage() {
  const [cars, setCars] = React.useState<any[]>([]);
  const [carsLoading, setCarsLoading] = React.useState(true);
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Sample fallback reviews if none exist
  const sampleReviews = [
    {
      id: 'sample-1',
      customer_name: 'Abdullah Tariq',
      rating: 5,
      review_text: 'I had the pleasure of working with Supreme Cars, very easy to work with them, stress free experience great customer service. Will recommend',
      date: new Date().toISOString(),
      is_featured: true,
    },
    {
      id: 'sample-2',
      customer_name: 'Noor Ahmed',
      rating: 4,
      review_text: 'Highly recommend, I would definitely come back',
      date: new Date().toISOString(),
      is_featured: true,
    },
  ];

  const fetchCars = async () => {
    setCarsLoading(true);
    const { data, error } = await supabase.from('cars').select('*');
    if (!error && data) setCars(data);
    setCarsLoading(false);
  };

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      setReviews(data);
    } else {
      setReviews(sampleReviews);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchCars();
    fetchReviews();
  }, []);

  return (
    <div className="bg-primary text-white min-h-screen flex flex-col font-[Poppins] antialiased selection:bg-accent selection:text-primary-dark overflow-x-hidden">
      <NavigationBar />
      <HeroSection />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Soft background light reflections */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[150px] pointer-events-none"></div>
        <div className="absolute top-[60%] right-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[150px] pointer-events-none"></div>

        {/* Section 1: Listings */}
        <SectionTitle id="listings">Featured Inventory</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {carsLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent" />
            </div>
          ) : (
            cars.map((car, i) => (
                <CarCard
                    key={i}
                    id={car.id}
                    image={car.images && car.images.length > 0 ? car.images[0] : "/car-placeholder.jpg"}
                    title={car.title ?? `${car.brand} ${car.model}`}
                    price={car.price ? `PKR ${car.price.toLocaleString()}` : "N/A"}
                    tags={car.tags ?? []}
                    details={car.details}
                />
            ))
          )}
        </div>

        {/* Brand Stats */}
        <StatsSection />

        {/* Client Reviews Section */}
        <ReviewsSection reviews={reviews} loading={loading} />

      </main>

      <Footer />
    </div>
  );
}