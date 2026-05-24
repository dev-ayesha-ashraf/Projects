"use client";
import React from 'react';

type Review = {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  created_at?: string;
  is_featured?: boolean;
  reply?: string;
};

interface ReviewsSectionProps {
  reviews?: Review[];
  loading?: boolean;
}

export default function ReviewsSection({ reviews = [], loading = false }: ReviewsSectionProps) {
  const featuredReviews = reviews.filter((r: Review) => r.is_featured);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 my-24 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <span className="text-accent font-black tracking-widest text-xs uppercase bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20 mb-4">
          Client Feedback
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          What Our Clients Say
        </h2>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-accent"></div>
          <div className="w-2.5 h-2.5 bg-accent rotate-45 rounded-[2px] shadow-sm"></div>
          <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-accent"></div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : featuredReviews.length === 0 ? (
        <div className="text-center py-12 rounded-2xl glass-dark border border-white/5">
          <p className="text-gray-400 text-sm">No featured reviews available.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.map((review: Review) => (
            <div 
              key={review.id} 
              className="glass-card rounded-2xl p-8 flex flex-col justify-between border border-white/5 relative group"
            >
              {/* Soft accent top highlight */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:via-accent transition duration-300"></div>

              <div>
                {/* Rating stars */}
                <div className="flex justify-between items-center mb-5">
                  <span className="font-extrabold text-white text-base">{review.customer_name}</span>
                  <div className="text-yellow-400 flex gap-0.5 text-sm">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm italic leading-relaxed mb-6">
                  &quot;{review.review_text}&quot;
                </p>
              </div>

              <div>
                {/* Date */}
                <div className="text-gray-500 text-xs mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span>Verified Buyer</span>
                  <span>
                     {review.created_at ? new Date(review.created_at).toLocaleDateString(undefined, {
                       month: "short", day: "numeric", year: "numeric"
                     }) : ''}
                  </span>
                </div>

                {/* Admin Reply */}
                {review.reply && (
                  <div className="mt-4 p-4 rounded-xl bg-accent/5 border border-accent/15 text-xs">
                    <span className="font-extrabold text-accent block uppercase tracking-wider text-[9px] mb-1">
                      Response from Supreme Cars
                    </span>
                    <p className="text-gray-300 leading-relaxed">{review.reply}</p>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
