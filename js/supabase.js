// js/supabase.js
// Supabase client for TapWealth (browser)
const SUPABASE_URL = "https://ypilwyqurocmywzpljvg.supabase.co";
const SUPABASE_KEY = "sb_publishable_Xei58VZaN90BIZJvrJIa5Q_49uTcwiy";

// supabase-js UMD exposes a global `supabase` factory when the CDN is loaded.
// We create a client and export it via window so other scripts can use it.
if (typeof window !== "undefined") {
  // create the client
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}
