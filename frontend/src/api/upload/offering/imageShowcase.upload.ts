import request from "@/utils/request";

/**
 * Upload multiple images (5 or less) for an offering showcase
 * @param {File[]} files - Array of image files to upload (max 5 files).
 * @param {string} offeringId - The ID of the offering.
 * @returns {Promise<string[]>} - Array of uploaded file URLs.
 */
export const uploadOfferingImageShowcase = async (files: File[], offeringId: string): Promise<string[]> => {
  if (files.length > 5) {
    throw new Error("You can upload a maximum of 5 images.");
  }

  const formData = new FormData();

  files.forEach((file, index) => {
    formData.append(`files`, file); // Notice 'files', not 'file', to align with multiple file upload
  });

  formData.append("offeringId", offeringId);

  try {
    const response = await request.post("/upload/offering-showcase", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.uploadedUrls; // Assuming the response contains an array of uploaded file URLs
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error uploading showcase images:", error.message);
    } else {
      console.error("Error uploading showcase images:", error);
    }
    throw error;
  }
};
