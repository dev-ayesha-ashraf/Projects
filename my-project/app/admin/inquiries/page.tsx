"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function AdminInquiries() {
  type Contact = {
    id: string;
    name: string;
    email: string;
    message: string;
    status: string;
    reply?: string;
    created_at?: string;
    [key: string]: any;
  };

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState<{ [id: string]: string }>({});

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('contact').select('*').order('created_at', { ascending: false });
    if (!error) setContacts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleReply = async (id: string) => {
    const text = reply[id];
    if (!text) return;
    const { error } = await supabase.from("contact").update({ status: "Replied", reply: text }).eq("id", id);
    if (!error) {
      setReply((r) => ({ ...r, [id]: "" }));
      fetchContacts();
    } else {
      alert("Error sending reply: " + error.message);
    }
  };

  const handleMarkRead = async (id: string) => {
    const { error } = await supabase.from("contact").update({ status: "Read" }).eq("id", id);
    if (!error) fetchContacts();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this customer inquiry?")) return;
    const { error } = await supabase.from("contact").delete().eq("id", id);
    if (!error) fetchContacts();
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
              Customer Contacts
            </h1>
            <p className="text-gray-400 mt-2">View and manage customer contacts and messages</p>
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
        ) : contacts.length === 0 ? (
          <div className="text-center py-20 rounded-2xl glass-dark border border-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-xl font-bold mb-2">No Contacts Found</h3>
            <p className="text-gray-400">All customer messages are up to date</p>
          </div>
        ) : (
          <div className="rounded-2xl glass-dark border border-white/5 overflow-hidden animate-fade-in-up">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary-light/50">
                    <th className={tableHeaderClasses}>Customer</th>
                    <th className={tableHeaderClasses}>Subject & Message</th>
                    <th className={tableHeaderClasses}>Date</th>
                    <th className={tableHeaderClasses}>Status</th>
                    <th className={tableHeaderClasses}>Reply Input</th>
                    <th className={`${tableHeaderClasses} text-center`}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {contacts.map((inq: any) => (
                    <tr key={inq.id} className="hover:bg-white/5 transition duration-200">
                      
                      {/* Customer Info */}
                      <td className={tableCellClasses}>
                        <div className="font-extrabold text-white">{inq.name}</div>
                        <div className="text-gray-400 text-xs mt-1">{inq.email}</div>
                        {inq.phone && <div className="text-accent text-xs font-semibold mt-0.5">{inq.phone}</div>}
                      </td>

                      {/* Message Content */}
                      <td className={`${tableCellClasses} max-w-sm`}>
                        <div className="font-bold text-white text-sm line-clamp-1">{inq.subject || "No Subject"}</div>
                        <p className="text-gray-400 text-xs mt-1 whitespace-pre-wrap line-clamp-3">{inq.message}</p>
                        {inq.reply && (
                          <div className="mt-2.5 p-2 rounded bg-accent/5 border border-accent/15 text-accent text-xs">
                            <span className="font-bold block uppercase tracking-wider text-[10px] opacity-80 mb-0.5">Your Reply:</span>
                            {inq.reply}
                          </div>
                        )}
                      </td>

                      {/* Date */}
                      <td className={tableCellClasses}>
                        <div className="text-xs text-gray-400">
                          {inq.created_at ? new Date(inq.created_at).toLocaleDateString(undefined, {
                            month: "short", day: "numeric", year: "numeric"
                          }) : 'N/A'}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          {inq.created_at ? new Date(inq.created_at).toLocaleTimeString(undefined, {
                            hour: "2-digit", minute: "2-digit"
                          }) : ''}
                        </div>
                      </td>

                      {/* Status */}
                      <td className={tableCellClasses}>
                        <span className={`inline-block rounded px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                          inq.status === 'Replied' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : inq.status === 'Read' 
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                        }`}>
                          {inq.status || 'New'}
                        </span>
                      </td>

                      {/* Quick Reply Form */}
                      <td className={tableCellClasses}>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder={inq.reply ? "Send another reply..." : "Type reply..."}
                            className="bg-primary-dark border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent w-48 transition"
                            value={reply[inq.id] || ''}
                            onChange={e => setReply(r => ({ ...r, [inq.id]: e.target.value }))}
                          />
                          <button
                            className="bg-accent hover:bg-accent-dark text-primary-dark rounded-lg px-3 py-1.5 text-xs font-black transition duration-300"
                            onClick={() => handleReply(inq.id)}
                          >
                            Send
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className={tableCellClasses}>
                        <div className="flex gap-2 justify-center">
                          {inq.status !== 'Read' && inq.status !== 'Replied' && (
                            <button 
                              className="bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-white border border-yellow-500/20 rounded-lg px-2.5 py-1.5 text-xs font-bold transition duration-300" 
                              onClick={() => handleMarkRead(inq.id)}
                              title="Mark as Read"
                            >
                              Read
                            </button>
                          )}
                          <button 
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-lg px-2.5 py-1.5 text-xs font-bold transition duration-300" 
                            onClick={() => handleDelete(inq.id)}
                            title="Delete Message"
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
