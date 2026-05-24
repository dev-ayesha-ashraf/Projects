import React from 'react';
import { UserGroupIcon, TruckIcon, CalendarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

const stats = [
  { label: 'Happy Customers', value: '1,500+', icon: <UserGroupIcon className="w-6 h-6" /> },
  { label: 'Cars Sold', value: '1,200+', icon: <TruckIcon className="w-6 h-6" /> },
  { label: 'Years Experience', value: '10+', icon: <CalendarIcon className="w-6 h-6" /> },
  { label: 'Satisfaction Rate', value: '98%', icon: <CheckBadgeIcon className="w-6 h-6" /> },
];

export default function StatsSection() {
  return (
    <section className="w-full py-16 relative overflow-hidden flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full relative z-10">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="glass-card rounded-2xl p-6 text-center border border-white/5 relative overflow-hidden flex flex-col items-center group hover:scale-105 transition duration-300"
          >
            {/* Soft accent top highlight */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent group-hover:via-accent transition duration-300"></div>
            
            <div className="text-3xl mb-2.5 opacity-80 group-hover:scale-110 transition duration-300">
              {stat.icon}
            </div>
            
            <div className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              {stat.value}
            </div>
            
            <div className="text-accent text-[10px] font-black uppercase tracking-widest mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
