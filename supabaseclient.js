import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kxoexwdhzcxmxzygwatq.supabase.co'; // Replace with your Supabase Project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4b2V4d2RoemN4bXh6eWd3YXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MDk4MjAsImV4cCI6MjA1NTI4NTgyMH0.wXpVEFOOHHReYwJj6cDltmjy3Ff5MXG75lFhA_8xS78'; // Replace with your Supabase API Key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;