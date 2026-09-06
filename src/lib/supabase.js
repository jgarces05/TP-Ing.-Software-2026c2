import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const clave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Mientras no haya credenciales, la aplicación funciona igual con los datos
// de ejemplo de src/lib/semilla.js. Ver .env.example.
export const haySupabase = Boolean(url && clave);

export const supabase = haySupabase ? createClient(url, clave) : null;
