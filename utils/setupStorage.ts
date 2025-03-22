import { createClient, createAdminClient } from "./supabase";

export async function setupAudioStorage(clerkSessionId?: string) {
  try {
    const supabase = createClient();
    // Use admin client for storage operations
    const adminClient = createAdminClient();

    // Skip Supabase auth check if we have a Clerk session ID
    if (!clerkSessionId) {
      // Check authentication status
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();
      if (authError) {
        console.error("Authentication error:", authError);
        return { success: false, error: authError };
      }

      if (!session) {
        console.error("No active session");
        return { success: false, error: new Error("No active session") };
      }
    }

    // Create the bucket if it doesn't exist - using admin client
    const { data: buckets, error: bucketsError } =
      await adminClient.storage.listBuckets();

    if (bucketsError) {
      console.error("Bucket list error:", bucketsError);
      return { success: false, error: bucketsError };
    }

    const audioBucket = buckets?.find(
      (bucket) => bucket.name === "audio_files"
    );

    if (!audioBucket) {
      // WARNING: This approach may not work in the browser due to RLS policies
      // Consider moving bucket creation to a server-side API route instead
      try {
        const { error } = await adminClient.storage.createBucket(
          "audio_files",
          {
            public: false,
            fileSizeLimit: 52428800, // 50MB limit
            allowedMimeTypes: ["audio/wav", "audio/mpeg", "audio/webm"],
          }
        );

        if (error) {
          console.error("Bucket creation error:", error);

          if (error.message?.includes("violates row-level security policy")) {
            console.error(
              "RLS policy violation detected. This operation should be performed server-side with a service role key."
            );
            return {
              success: false,
              error,
              suggestion:
                "Move bucket creation to a server-side API endpoint with proper service role authentication",
            };
          }

          return { success: false, error };
        }

        console.log("Created audio_files bucket");

        // Set bucket policies - this might fail in browser context due to RLS
        try {
          // Try to update the RLS policy for the bucket to allow authenticated users to upload
          // This might fail in browser context - should be moved to server-side
          const policyResult = await adminClient.rpc("create_storage_policy", {
            bucket_name: "audio_files",
            policy_name: "allow_authenticated_uploads",
            definition: `(uid() = auth.uid() OR auth.role() = 'authenticated')`,
          });

          // Handle errors from RPC call
          if (policyResult.error) {
            console.warn(
              "Failed to set policy via RPC, may need server-side setup:",
              policyResult.error
            );
          }
        } catch (policyError: unknown) {
          console.warn("Could not set bucket policies:", policyError);
        }
      } catch (bucketError) {
        console.error("Failed to create bucket:", bucketError);
        return { success: false, error: bucketError };
      }
    } else {
      console.log("Audio bucket already exists");
    }

    return { success: true };
  } catch (error) {
    console.error("Error setting up storage:", error);
    return { success: false, error };
  }
}
