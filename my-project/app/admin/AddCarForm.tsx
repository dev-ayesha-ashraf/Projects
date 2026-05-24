"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AddCarForm({ onCarAdded }: { onCarAdded: () => void }) {
  const [form, setForm] = useState({
    title: '', brand: '', model: '', year: '', price: '', mileage: '', transmission: '', fuel_type: '', engine_capacity: '', color: '', condition: '', features: '', description: '', contact_phone: '', contact_email: ''
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      // Upload images to Supabase Storage
      const imageUrls: string[] = [];
      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from('car-images')
          .upload(`cars/${fileName}`, file);
        if (uploadError) throw uploadError;
        const url = supabase.storage.from('car-images').getPublicUrl(data.path).data.publicUrl;
        imageUrls.push(url);
      }
      // Prepare features as array
      const featuresArr = form.features.split(',').map((f) => f.trim()).filter(Boolean);
      // Insert car
      const { error: insertError } = await supabase.from('cars').insert([
        { 
          ...form, 
          year: Number(form.year), 
          price: Number(form.price), 
          mileage: Number(form.mileage), 
          features: featuresArr, 
          images: imageUrls,
          status: 'Available',
          date_added: new Date().toISOString()
        }
      ]);
      if (insertError) throw insertError;
      setForm({ 
        title: '', brand: '', model: '', year: '', price: '', mileage: '', transmission: '', 
        fuel_type: '', engine_capacity: '', color: '', condition: '', features: '', 
        description: '', contact_phone: '', contact_email: '' 
      });
      setImageFiles([]);
      setSuccess(true);
      setTimeout(() => onCarAdded(), 1000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Error adding car listing');
      } else {
        setError('Error adding car listing');
      }
    }
    setLoading(false);
  };

  const inputClasses = "bg-primary/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent w-full transition duration-300";
  const labelClasses = "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-white/5 pb-4 mb-6">
        <h2 className="text-2xl font-black text-white">Add Premium Vehicle</h2>
        <p className="text-gray-400 text-sm mt-1">Complete the details below to create a high-quality listing</p>
      </div>

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm font-semibold animate-pulse">
          Vehicle listing added successfully! Refreshing...
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className={labelClasses}>Listing Title *</label>
          <input name="title" placeholder="e.g. 2021 Mustang GT Fastback" value={form.title} onChange={handleChange} required className={inputClasses} />
        </div>
        
        <div>
          <label className={labelClasses}>Brand / Make *</label>
          <input name="brand" placeholder="e.g. Ford" value={form.brand} onChange={handleChange} required className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Model *</label>
          <input name="model" placeholder="e.g. Mustang" value={form.model} onChange={handleChange} required className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Year *</label>
          <input name="year" placeholder="e.g. 2021" value={form.year} onChange={handleChange} required type="number" className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Price (PKR) *</label>
          <input name="price" placeholder="e.g. 8500000" value={form.price} onChange={handleChange} required type="number" className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Mileage (km) *</label>
          <input name="mileage" placeholder="e.g. 15000" value={form.mileage} onChange={handleChange} required type="number" className={inputClasses} />
        </div>


        <div>
          <label className={labelClasses}>Transmission *</label>
          <select name="transmission" value={form.transmission} onChange={handleSelectChange} required className={`${inputClasses} cursor-pointer`}>
            <option value="" disabled className="text-gray-500">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Tiptronic">Tiptronic</option>
          </select>
        </div>


        <div>
          <label className={labelClasses}>Fuel Type *</label>
          <select name="fuel_type" value={form.fuel_type} onChange={handleSelectChange} required className={`${inputClasses} cursor-pointer`}>
            <option value="" disabled className="text-gray-500">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Engine Capacity (e.g. 1500cc)</label>
          <input name="engine_capacity" placeholder="e.g. 5000cc" value={form.engine_capacity} onChange={handleChange} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Exterior Color</label>
          <input name="color" placeholder="e.g. Shadow Black" value={form.color} onChange={handleChange} className={inputClasses} />
        </div>


        <div>
          <label className={labelClasses}>Condition *</label>
          <select name="condition" value={form.condition} onChange={handleSelectChange} required className={`${inputClasses} cursor-pointer`}>
            <option value="" disabled className="text-gray-500">Select Condition</option>
            <option value="Brand New">Brand New</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Contact Phone</label>
          <input name="contact_phone" placeholder="e.g. +92 300 1234567" value={form.contact_phone} onChange={handleChange} className={inputClasses} />
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>Premium Features (Comma separated)</label>
          <input name="features" placeholder="e.g. Leather Seats, Panoramic Roof, Apple CarPlay" value={form.features} onChange={handleChange} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Contact Email</label>
          <input name="contact_email" placeholder="e.g. dealer@supremecars.com" value={form.contact_email} onChange={handleChange} className={inputClasses} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label className={labelClasses}>Vehicle Description</label>
          <textarea name="description" placeholder="Provide a detailed overview of the vehicle, history, features, and modifications..." value={form.description} onChange={handleChange} rows={4} className={`${inputClasses} resize-none`} />
        </div>

        <div>
          <label className={labelClasses}>Vehicle Images (multiple) *</label>
          <div className="relative group flex flex-col justify-center items-center h-28 border border-dashed border-white/20 hover:border-accent hover:bg-white/5 rounded-xl transition duration-300 cursor-pointer">
            <input type="file" multiple accept="image/*" onChange={handleImageChange} required className="absolute inset-0 opacity-0 cursor-pointer" />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 group-hover:text-accent mb-2 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-gray-400 group-hover:text-white transition">
              {imageFiles.length > 0 ? `${imageFiles.length} file(s) selected` : "Click to upload multiple images"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
        <button 
          type="submit" 
          disabled={loading} 
          className="bg-accent hover:bg-accent-dark text-primary-dark font-black px-8 py-3 rounded-lg shadow-lg hover:shadow-accent/20 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Publishing Vehicle...' : 'Publish Vehicle'}
        </button>
      </div>
    </form>
  );
}
