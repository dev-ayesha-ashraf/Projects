import React from 'react';

type SectionTitleProps = {
  children: React.ReactNode;
  id?: string;
};

export default function SectionTitle({ children, id }: SectionTitleProps) {
  return (
    <div id={id} className="flex flex-col items-center justify-center text-center mt-20 mb-10 animate-fade-in-up">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
        {children}
      </h2>
      <div className="flex items-center gap-2 mt-4">
        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-accent"></div>
        <div className="w-2.5 h-2.5 bg-accent rotate-45 rounded-[2px] shadow-sm"></div>
        <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-accent"></div>
      </div>
    </div>
  );
}
