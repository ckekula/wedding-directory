import request from "@/utils/request";

export const uploadOfferingBanner = async (file: File, offeringId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("offeringId", offeringId);

  try {
    const response = await request.post("/upload/offering-banner", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.fileUrl; // Assuming the response contains the uploaded file URL
  } catch (error) {
    if (error instanceof Error) {
      //console.error("Error uploading banner image:", error.message);
    } else {
      //console.error("Error uploading banner image:", error);
    }
    throw error;
  }
};
