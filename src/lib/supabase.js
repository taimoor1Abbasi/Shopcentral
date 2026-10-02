import { createClient } from '@supabase/supabase-js'

let supabase

export function getSupabaseClient() {
  if (supabase) return supabase

  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect Supabase.')
  }

  supabase = createClient(url, key)
  return supabase
}