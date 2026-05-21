import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sustituye-esto-por-tu-url.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sustituye-esto-por-tu-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
