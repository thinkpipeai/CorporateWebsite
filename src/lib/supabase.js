import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export function getSupabaseConfigMessage() {
  if (import.meta.env.DEV) {
    return 'Supabase 未配置。请复制 .env.example 为 .env，填入 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY，然后重启 npm run dev。'
  }
  return 'Supabase 未配置。请硬刷新（Cmd+Shift+R）清除缓存，或使用无痕窗口。若仍失败，请检查 GitHub Actions Secrets 并重新部署。'
}
