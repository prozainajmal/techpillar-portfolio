import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wncbbphhnhggvcwrgpbx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduY2JicGhobmhnZ3Zjd3JncGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MDI2MTcsImV4cCI6MjA3MjM3ODYxN30.XcvGx29eLZE6mFljB26xHahzaZIK27dF8WfVoQ85mB0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
