import "react-native-url-polyfill/auto";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import type { Database } from "../type";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export const supabase: SupabaseClient = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);
