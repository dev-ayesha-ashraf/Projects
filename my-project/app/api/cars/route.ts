import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

// GET: List all cars
export async function GET() {
  const { data, error } = await supabase.from('cars').select('*').order('date_added', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Add a new car
export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from('cars').insert([body]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}
