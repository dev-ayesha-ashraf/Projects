import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

// GET: List all inquiries
export async function GET() {
  const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Add a new inquiry
export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from('inquiries').insert([body]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}
