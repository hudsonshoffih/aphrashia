import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextResponse<any>) {
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
      const { data, error } = await adminClient.storage.createBucket(
        "audio_files",
        {
          public: false,
          fileSizeLimit: 52428800, // 50MB limit
          allowedMimeTypes: ["audio/wav", "audio/mpeg", "audio/webm"],
        }
      );

      if (error) {
        console.error("Bucket creation error:", error);
        return NextResponse.json(
          { error: `Failed to create bucket: ${error.message}` },
          { status: 500 }
        );
      }

      console.log("Created audio_files bucket");

      try {
        const { error: policyError } = await adminClient.storage
          .from("audio_files")
          .createPolicy("allow_uploads_to_own_folder", {
            name: "Allow uploads to own folder",
            definition: {
              in_storage: true,
              folder_starts_with: ["{{auth.uid}}", "{{user.id}}"],
            },
            allow_uploads: true,
            allow_downloads: true,
          });

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
