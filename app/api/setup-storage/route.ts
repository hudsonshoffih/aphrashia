import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }

    const adminClient = createAdminClient();

    const { data: buckets, error: bucketsError } =
      await adminClient.storage.listBuckets();

    if (bucketsError) {
      console.error("Bucket list error:", bucketsError);
      return NextResponse.json(
        { error: `Failed to list buckets: ${bucketsError.message}` },
        { status: 500 }
      );
    }

    const audioBucket = buckets?.find(
      (bucket) => bucket.name === "audio_files"
    );

    if (!audioBucket) {
      const { error } = await adminClient.storage.createBucket("audio_files", {
        public: false,
        fileSizeLimit: 52428800, // 50MB limit
        allowedMimeTypes: ["audio/wav", "audio/mpeg", "audio/webm"],
      });

      if (error) {
        console.error("Bucket creation error:", error);
        return NextResponse.json(
          { error: `Failed to create bucket: ${error.message}` },
          { status: 500 }
        );
      }

      console.log("Created audio_files bucket");

      try {
        // Create a policy to allow authenticated users to upload to their own folder
        // Using RPC to create policy instead of direct method
        const { error: policyError } = await adminClient.rpc(
          "create_storage_policy",
          {
            bucket_name: "audio_files",
            policy_name: "allow_uploads_to_own_folder",
            definition: `((auth.uid() = folder) OR (auth.uid() IN (SELECT user_id FROM users WHERE id = folder)))`,
            allow_uploads: true,
            allow_downloads: true,
          }
        );

        if (policyError) {
          console.error("Policy creation error:", policyError);
        }
      } catch (policyError) {
        console.warn("Could not set bucket policies:", policyError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error setting up storage:", error);
    return NextResponse.json(
      { error: `Failed to set up storage: ${error}` },
      { status: 500 }
    );
  }
}
