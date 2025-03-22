import { createBrowserClient } from "@supabase/ssr";

// Regular client for most operations
export const createClient = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );
  return supabase;
};

// Admin client for storage operations
// Note: This should ideally be server-side only in a production app
export const createAdminClient = () => {
  // First check if we have the service role key
  if (!process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("No service role key available, using anon key instead");
    return createClient();
  }

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
      },
    }
  );
  return supabase;
};
