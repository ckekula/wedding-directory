import request from "@/utils/request";

/**
 * Upload multiple videos for an offering video showcase
 * @param {File[]} files - Array of video files to upload.
 * @param {string} offeringId - The ID of the offering.
 * @returns {Promise<string[]>} - Array of uploaded video URLs.
 */
export const uploadOfferingVideoShowcase = async (files: File[], offeringId: string): Promise<string[]> => {
  if (files.length === 0) {
    throw new Error("You need to upload at least one video.");
  }

  const formData = new FormData();

  // Append each video file to the FormData object
  files.forEach((file) => {
    formData.append("files", file); // Notice 'files' to match the backend's expected field name
  });

  formData.append("offeringId", offeringId);

  try {
    const response = await request.post("/upload/offering-videos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.uploadedUrls; // Assuming the response contains an array of uploaded video URLs
  } catch (error) {
    if (error instanceof Error) {
      //console.error("Error uploading videos:", error.message);
    } else {
      //console.error("Error uploading videos:", error);
    }
    throw error;
  }
};
