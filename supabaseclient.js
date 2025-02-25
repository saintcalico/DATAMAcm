const { createClient } = supabase;

const SUPABASE_URL = "https://your-supabase-url.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
