"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AddCarForm from '../AddCarForm';
import EditCarModal from '../EditCarModal';
import Link from 'next/link';

export default function AdminInventory() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editCar, setEditCar] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('date_added', { ascending: false });
    
    if (!error && data) {
      setCars(data);
    } else {
      const { data: fallbackData } = await supabase.from('cars').select('*');
      if (fallbackData) setCars(fallbackData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this car listing?")) return;
    
    const { error } = await supabase.from('cars').delete().eq('id', id);
    if (!error) {
      setCars(cars.filter(car => car.id !== id));
    } else {
      alert("Error deleting car: " + error.message);
    }
  };

  const handleSaveEdit = async (updatedCar: any) => {
    const { id, ...updateData } = updatedCar;
    const { error } = await supabase.from('cars').update(updateData).eq('id', id);
    if (!error) {
      setCars(cars.map(car => car.id === id ? updatedCar : car));
      setEditCar(null);
    } else {
      alert("Error updating car: " + error.message);
    }
  };

  // Filter logic
  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      `${car.brand} ${car.model} ${car.title}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === '' || car.brand.toLowerCase() === brandFilter.toLowerCase();
    const matchesStatus = statusFilter === '' || car.status === statusFilter;
    return matchesSearch && matchesBrand && matchesStatus;
  });

  // Extract unique brands for filtering
  const brands = Array.from(new Set(cars.map(car => car.brand))).filter(Boolean);

  return (
    <div className="bg-primary text-white min-h-screen py-12 px-6 font-[Poppins] animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Inventory Management
            </h1>
            <p className="text-gray-400 mt-2">Manage and monitor all vehicle listings</p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="bg-accent hover:bg-accent-dark text-primary-dark font-bold px-6 py-3 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              {isAdding ? "Close Form" : "Add New Vehicle"}
            </button>
            <Link
              href="/admin/dashboard"
              className="bg-primary-light border border-white/10 hover:border-accent text-white px-6 py-3 rounded-lg font-bold shadow-lg transition duration-300"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Add Car Form Drawer/Section */}
        {isAdding && (
          <div className="mb-12 p-8 rounded-2xl glass-dark border border-white/10 animate-fade-in-up">
            <AddCarForm onCarAdded={() => { fetchCars(); setIsAdding(false); }} />
          </div>
        )}

        {/* Filters & View Toggle */}
        <div className="p-6 rounded-2xl glass-dark border border-white/5 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search make, model or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-primary-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-accent w-full md:w-64 transition"
            />
            
            {/* Brand Filter */}
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="bg-primary-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent w-full md:w-44 transition cursor-pointer"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-primary-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent w-full md:w-44 transition cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          {/* Grid / List Layout Toggle Buttons */}
          <div className="flex items-center bg-primary-light p-1 rounded-lg border border-white/5 self-end md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-md transition ${viewMode === 'grid' ? 'bg-accent text-primary-dark font-bold' : 'text-gray-400 hover:text-white'}`}
              title="Grid View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-md transition ${viewMode === 'list' ? 'bg-accent text-primary-dark font-bold' : 'text-gray-400 hover:text-white'}`}
              title="List View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Section */}
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
            <p className="text-gray-400">Try adjusting your search terms or filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid Layout */
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map((car) => (
              <div key={car.id} className="glass-card rounded-2xl overflow-hidden relative flex flex-col group">
                <div className="relative overflow-hidden h-52">
                  <img
                    src={car.images && car.images[0] ? car.images[0] : "/car-placeholder.jpg"}
                    alt={car.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className={`absolute top-4 right-4 rounded-full px-4 py-1.5 font-bold text-xs uppercase shadow-md ${car.status === 'Sold' ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500 text-white'}`}>
                    {car.status}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-white font-extrabold text-2xl mb-1 group-hover:text-accent transition">
                      {car.brand} {car.model} <span className="text-gray-400 font-normal text-lg">({car.year})</span>
                    </h2>
                    
                    <div className="text-accent font-black text-xl mb-4">
                      PKR {car.price ? car.price.toLocaleString() : 'N/A'}
                    </div>

                    <div className="flex gap-2 flex-wrap mb-4">
                      <span className="bg-primary-light text-gray-300 rounded-md px-2.5 py-1 text-xs border border-white/5">
                        {car.mileage ? car.mileage.toLocaleString() : '0'} km
                      </span>
                      <span className="bg-primary-light text-gray-300 rounded-md px-2.5 py-1 text-xs border border-white/5">
                        {car.transmission}
                      </span>
                      <span className="bg-primary-light text-gray-300 rounded-md px-2.5 py-1 text-xs border border-white/5">
                        {car.fuel_type}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-2 mb-6">
                      {car.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                    <button
                      onClick={() => setEditCar(car)}
                      className="flex-1 bg-primary-light border border-white/10 hover:border-accent hover:text-accent text-white rounded-lg py-2.5 text-sm font-bold transition duration-300 text-center"
                    >
                      Edit Details
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg px-4 py-2.5 text-sm font-bold transition duration-300"
                      title="Delete Listing"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List Layout */
          <div className="rounded-2xl glass-dark border border-white/5 overflow-hidden animate-fade-in-up">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary-light/50 border-b border-white/10 text-gray-400 text-sm font-bold">
                    <th className="py-4 px-6">Vehicle</th>
                    <th className="py-4 px-6">Brand</th>
                    <th className="py-4 px-6">Year</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Specs</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {filteredCars.map((car) => (
                    <tr key={car.id} className="hover:bg-white/5 transition duration-200">
                      <td className="py-4 px-6 flex items-center gap-4">
                        <img
                          src={car.images && car.images[0] ? car.images[0] : "/car-placeholder.jpg"}
                          alt={car.title}
                          className="w-16 h-12 object-cover rounded-lg border border-white/5"
                        />
                        <div>
                          <div className="font-extrabold text-white text-base">{car.model}</div>
                          <div className="text-gray-400 text-xs line-clamp-1">{car.title}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-gray-200">{car.brand}</td>
                      <td className="py-4 px-6 text-gray-300">{car.year}</td>
                      <td className="py-4 px-6 font-bold text-accent">
                        PKR {car.price ? car.price.toLocaleString() : 'N/A'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="bg-primary-light text-gray-400 rounded-md px-2 py-0.5 text-xs">{car.transmission}</span>
                          <span className="bg-primary-light text-gray-400 rounded-md px-2 py-0.5 text-xs">{car.fuel_type}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block rounded-full px-3 py-1 font-bold text-xs uppercase ${car.status === 'Sold' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                          {car.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => setEditCar(car)}
                            className="bg-primary-light hover:bg-accent hover:text-primary-dark border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(car.id)}
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-lg px-3 py-1.5 text-xs font-bold transition duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Car Modal Overlay */}
        {editCar && (
          <EditCarModal
            car={editCar}
            onClose={() => setEditCar(null)}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
}
