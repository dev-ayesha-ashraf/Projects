"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (!error) setReviews(data || []);
    setLoading(false);
  };

  const handleReply = async (id: string) => {
    const text = reply[id];
    if (!text) return;
    const { error } = await supabase.from("reviews").update({ reply: text }).eq("id", id);
    if (!error) {
      setReply((r) => ({ ...r, [id]: "" }));
      fetchReviews();
    } else {
      alert("Error sending reply: " + error.message);
    }
  };

  const handleFeature = async (id: string, is_featured: boolean) => {
    const { error } = await supabase.from("reviews").update({ is_featured: !is_featured }).eq("id", id);
    if (!error) fetchReviews();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this customer review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (!error) fetchReviews();
  };

  const tableHeaderClasses = "py-4 px-4 font-bold text-gray-400 text-xs uppercase tracking-wider text-left border-b border-white/10";
  const tableCellClasses = "py-4 px-4 text-sm text-gray-300 border-b border-white/5 align-middle";

  return (
    <div className="bg-primary text-white min-h-screen py-12 px-6 font-[Poppins] animate-fade-in">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Customer Reviews
            </h1>
            <p className="text-gray-400 mt-2">Manage customer feedback and testimonials</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="bg-primary-light border border-white/10 hover:border-accent text-white px-6 py-3 rounded-lg font-bold shadow-lg transition duration-300"
          >
            Dashboard
          </Link>
        </div>

        {/* Content Table */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 rounded-2xl glass-dark border border-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">No Reviews Found</h3>
            <p className="text-gray-400">Feedback from your users will appear here</p>
          </div>
        ) : (
          <div className="rounded-2xl glass-dark border border-white/5 overflow-hidden animate-fade-in-up">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary-light/50">
                    <th className={tableHeaderClasses}>Customer</th>
                    <th className={tableHeaderClasses}>Rating</th>
                    <th className={tableHeaderClasses}>Review Text</th>
                    <th className={tableHeaderClasses}>Date</th>
                    <th className={tableHeaderClasses}>Status</th>
                    <th className={tableHeaderClasses}>Admin Reply</th>
                    <th className={`${tableHeaderClasses} text-center`}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {reviews.map((review: any) => (
                    <tr key={review.id} className="hover:bg-white/5 transition duration-200">
                      
                      {/* Customer name */}
                      <td className={`${tableCellClasses} font-extrabold text-white`}>
                        {review.customer_name}
                      </td>

                      {/* Rating stars */}
                      <td className={tableCellClasses}>
                        <div className="text-yellow-400 flex gap-0.5 text-base">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                      </td>

                      {/* Review Text */}
                      <td className={`${tableCellClasses} max-w-sm`}>
                        <p className="text-gray-300 text-xs italic">"{review.review_text}"</p>
                        {review.reply && (
                          <div className="mt-2.5 p-2 rounded bg-accent/5 border border-accent/15 text-accent text-xs">
                            <span className="font-bold block uppercase tracking-wider text-[10px] opacity-80 mb-0.5">Your Response:</span>
                            {review.reply}
                          </div>
                        )}
                      </td>

                      {/* Date */}
                      <td className={tableCellClasses}>
                        <div className="text-xs text-gray-400">
                          {review.created_at ? new Date(review.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : 'N/A'}
                        </div>
                      </td>

                      {/* Featured status */}
                      <td className={tableCellClasses}>
                        <span className={`inline-block rounded px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                          review.is_featured 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-primary-light text-gray-400 border border-white/5'
                        }`}>
                          {review.is_featured ? 'Featured' : 'Normal'}
                        </span>
                      </td>

                      {/* Quick Reply Form */}
                      <td className={tableCellClasses}>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder={review.reply ? "Update response..." : "Respond..."}
                            className="bg-primary-dark border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent w-44 transition"
                            value={reply[review.id] || ''}
                            onChange={e => setReply(r => ({ ...r, [review.id]: e.target.value }))}
                          />
                          <button
                            className="bg-accent hover:bg-accent-dark text-primary-dark rounded-lg px-3 py-1.5 text-xs font-black transition duration-300"
                            onClick={() => handleReply(review.id)}
                          >
                            Send
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className={tableCellClasses}>
                        <div className="flex gap-2 justify-center">
                          <button 
                            onClick={() => handleFeature(review.id, review.is_featured)} 
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition duration-300 ${
                              review.is_featured 
                                ? 'bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-white border border-yellow-500/20' 
                                : 'bg-primary-light hover:bg-white/10 border border-white/10 text-white'
                            }`}
                          >
                            {review.is_featured ? "Unfeature" : "Feature"}
                          </button>
                          <button 
                            onClick={() => handleDelete(review.id)} 
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
      </div>
    </div>
  );
}
