"use client";
import { createClient } from "@/utils/supabase";
import { BsSoundwave } from "react-icons/bs";
import { BiStop } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { encodeString } from "@/misc/encode";
// import { useRouter } from "next/navigation";

export function AudioRecorder({
  isRecording,
  setIsRecording,
  mediaRecorderRef,
  audioChunksRef,
  isUploading,
  setIsUploading,
  setError,
  id,
}: {
  id: string;
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  mediaRecorderRef: React.RefObject<MediaRecorder | null>;
  audioChunksRef: React.RefObject<BlobPart[]>;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();

  const uploadToSupabase = async (audioBlob: Blob) => {
    try {
      setIsUploading(true);

      // Validate user ID
      if (!id) {
        setError("Authentication error: Missing user ID");
        console.error("Missing user ID for upload");
        return null;
      }

      const supabase = createClient();

      // Generate a unique filename using timestamp and user ID
      const timestamp = Date.now();
      const filename = `${id}/recording-${timestamp}.wav`;

      console.log(
        `Attempting to upload audio file to bucket: audio_files path: ${filename}`
      );

      // Upload the file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("audio_files")
        .upload(filename, audioBlob, {
          contentType: "audio/wav",
          cacheControl: "3600",
        });

      if (uploadError) {
        console.error("Upload error details:", uploadError);

        // Handle specific error cases
        if (
          uploadError.message?.includes("bucket") &&
          uploadError.message?.includes("not found")
        ) {
          setError("Storage bucket not found. Please try again later.");
        } else if (uploadError.message?.includes("authentication")) {
          setError("Authentication error. Please sign in again.");
        } else if (
          uploadError.message?.includes("permission") ||
          uploadError.message?.includes("policy")
        ) {
          setError(
            "Permission denied. You may not have access to upload files."
          );
        } else {
          setError(`Upload failed: ${uploadError.message}`);
        }

        throw uploadError;
      }

      console.log("Upload successful:", uploadData);

      // Get the public URL of the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage.from("audio_files").getPublicUrl(filename);

      console.log("File uploaded successfully. Public URL:", publicUrl);

      // Transcribe the audio
      try {
        const transcribeRes = await fetch("/api/whisper", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: publicUrl }),
        });

        if (!transcribeRes.ok) {
          const errorData = await transcribeRes.json();
          console.error("Transcription API error:", errorData);
          setError(
            `Transcription failed: ${errorData.error || "Unknown error"}`
          );
          return publicUrl; // Still return the URL even if transcription fails
        }

        const rres = await transcribeRes.json();
        const transcription = rres.data;

        // Save to history table
        const { error: historyError } = await supabase.from("history").insert({
          file_name: filename,
          transcription: transcription,
          uuid: id,
        });

        if (historyError) {
          console.error("Error saving to history:", historyError);
        }

        router.push(
          `/result?text=${transcription}&url=${encodeString(publicUrl)}`
        );

        return publicUrl;
      } catch (transcriptionError) {
        console.error("Transcription error:", transcriptionError);
        setError("Error processing audio. Please try again.");
        return publicUrl; // Still return the URL even if transcription fails
      }
    } catch (err) {
      console.error("Error in upload process:", err);
      setError("Error uploading recording. Please try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        try {
          await uploadToSupabase(audioBlob);
          setError(""); // Clear any previous errors
        } catch {
          // Error handling is done in uploadToSupabase
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError("");
    } catch (err) {
      setError(
        "Error accessing microphone. Please ensure you have granted permission."
      );
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isUploading}
        className={`${isRecording ? "h-12 w-12" : "h-18 w-18"} rounded-[30px] ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        } bg-red text-white flex items-center justify-center`}
      >
        {isRecording ? (
          <BiStop className="text-3xl" />
        ) : (
          <BsSoundwave className="text-4xl" />
        )}
      </button>
    </div>
  );
}
