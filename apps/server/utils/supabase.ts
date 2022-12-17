import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_API_SECRET = process.env.SUPABASE_API_SECRET

if (!SUPABASE_URL || !SUPABASE_API_SECRET) {
  throw new Error('Missing Supabase URL or API secret!')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_SECRET)
