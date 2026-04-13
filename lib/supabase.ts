import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lsglmmbtfwgbhlgakmzv.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZ2xtbWJ0ZndnYmhsZ2FrbXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDA3OTgsImV4cCI6MjA5MTUxNjc5OH0.tJpNjFOMAGFpoc9Sx9kuDvFhr5x6EuEMVhTfatfU6mU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);