// ============================================================
// CLIENTE SUPABASE (Bloco 4, 28/08)
// So instancia quando as variaveis de ambiente existem — sem elas o
// site roda 100% em modo demo (dados de lib/catalogo-demo.js).
//
// Para ativar: crie um projeto em supabase.com, rode supabase/schema.sql
// e supabase/seed.sql no SQL Editor, e preencha o .env.local a partir
// do .env.example. Nada mais precisa mudar no codigo.
// ============================================================
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Cliente compartilhado (ou null em modo demo). */
export const supabase = url && anon ? createClient(url, anon) : null;

/** true quando o banco do cliente esta configurado. */
export const temBanco = Boolean(supabase);
