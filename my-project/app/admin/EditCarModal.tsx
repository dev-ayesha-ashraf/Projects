"use client";
import { useState } from 'react';

type Car = {
  title: string;
  brand: string;
  model: string;
  year: string | number;
  price: string | number;
  mileage: string | number;
  transmission: string;
  fuel_type: string;
  engine_capacity?: string;
  color?: string;
  condition: string;
  status: string;
  contact_phone?: string;
  contact_email?: string;
  features: string[];
  description?: string;
  [key: string]: any;
};

interface EditCarModalProps {
  car: Car;
  onClose: () => void;
  onSave: (updated: Car) => void;
}

export default function EditCarModal({ car, onClose, onSave }: EditCarModalProps) {
  const [form, setForm] = useState({ ...car, features: car.features ? car.features.join(', ') : '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: typeof form) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const featuresArr = form.features.split(',').map((f: string) => f.trim()).filter(Boolean);
      await onSave({ ...form, features: featuresArr });
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Error updating car details');
      } else {
        setError('Error updating car details');
      }
    }
    setLoading(false);
  };

  const inputClasses = "bg-primary-dark border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent w-full transition duration-300";
  const labelClasses = "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5";

  return (
    <div className="fixed inset-0 bg-primary-dark/85 backdrop-blur-md flex items-center justify-center p-6 z-[9999] overflow-y-auto animate-fade-in">
      <div className="glass-dark border border-white/10 w-full max-w-4xl rounded-2xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto no-scrollbar animate-fade-in-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition duration-200"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-white/5 pb-4 mb-6">
            <h2 className="text-2xl font-black text-white">Edit Car Listing</h2>
            <p className="text-gray-400 text-sm mt-1">Make changes below and click save to apply updates</p>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className={labelClasses}>Listing Title *</label>
              <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className={inputClasses} />
            </div>
            
            <div>
              <label className={labelClasses}>Brand *</label>
              <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>Model *</label>
              <input name="model" placeholder="Model" value={form.model} onChange={handleChange} required className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>Year *</label>
              <input name="year" placeholder="Year" value={form.year} onChange={handleChange} required type="number" className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>Price (PKR) *</label>
              <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required type="number" className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>Mileage (km) *</label>
              <input name="mileage" placeholder="Mileage" value={form.mileage} onChange={handleChange} required type="number" className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>Transmission *</label>
              <select name="transmission" value={form.transmission} onChange={handleChange} required className={`${inputClasses} cursor-pointer`}>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Tiptronic">Tiptronic</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Fuel Type *</label>
              <select name="fuel_type" value={form.fuel_type} onChange={handleChange} required className={`${inputClasses} cursor-pointer`}>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Engine Capacity</label>
              <input name="engine_capacity" placeholder="Engine Capacity" value={form.engine_capacity} onChange={handleChange} className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>Exterior Color</label>
              <input name="color" placeholder="Color" value={form.color} onChange={handleChange} className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>Condition *</label>
              <select name="condition" value={form.condition} onChange={handleChange} required className={`${inputClasses} cursor-pointer`}>
                <option value="Brand New">Brand New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Status *</label>
              <select name="status" value={form.status} onChange={handleChange} required className={`${inputClasses} cursor-pointer`}>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Contact Phone</label>
              <input name="contact_phone" placeholder="Contact Phone" value={form.contact_phone} onChange={handleChange} className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>Contact Email</label>
              <input name="contact_email" placeholder="Contact Email" value={form.contact_email} onChange={handleChange} className={inputClasses} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <label className={labelClasses}>Premium Features (Comma separated)</label>
              <input name="features" placeholder="Features (comma separated)" value={form.features} onChange={handleChange} className={inputClasses} />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Vehicle Description</label>
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={4} className={`${inputClasses} resize-none`} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-primary-light hover:bg-white/10 border border-white/10 text-white rounded-lg px-6 py-2.5 text-sm font-bold transition duration-300"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-accent hover:bg-accent-dark text-primary-dark font-black px-6 py-2.5 rounded-lg text-sm transition duration-300"
            >
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
