"use client";
import React from "react";
import Link from "next/link";

type CarCardProps = {
  id: string | number;
  image?: string;
  title: string;
  price: string;
  tags?: string[];
  details?: string;
};

export default function CarCard({ id, image, title, price, tags = [], details }: CarCardProps) {
  const slug = title.replace(/\s+/g, "-").toLowerCase();
  // Use id for routing to ensure uniqueness
  const href = id ? `/car-detail/${id}` : `/car-detail/${slug}`;
  return (
    <Link href={href} className="block">
      <div className="glass-card rounded-2xl overflow-hidden relative flex flex-col group h-full cursor-pointer">
        {/* Image container with zoom hover */}
        <div className="relative overflow-hidden h-48 w-full">
          <img
            src={image ?? "/car-placeholder.jpg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-60" />
        </div>
        {/* Card Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Title */}
            <h3 className="font-extrabold text-white text-lg mb-2 group-hover:text-accent transition duration-300 line-clamp-1">
              {title}
            </h3>
            {/* Details / Specs if provided */}
            {details && (
              <div className="text-xs text-gray-400 mb-3 line-clamp-1">
                {details}
              </div>
            )}
          </div>
          {/* Pricing & Footer Actions */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="text-accent font-black text-lg tracking-tight">
              {price}
            </div>
            <div className="text-white/80 group-hover:text-accent font-bold text-xs flex items-center gap-1 transition duration-300">
              <span>Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
