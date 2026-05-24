import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

// GET: List all reviews
export async function GET() {
  const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Add a new review
export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from('reviews').insert([body]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}
