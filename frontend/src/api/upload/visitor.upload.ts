import request from "@/utils/request";

export const uploadProfilePicture = async (file: File, visitorId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("visitorId", visitorId);

  try {
    const response = await request.post("/upload/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.fileUrl; // Assuming the response contains the uploaded file URL
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};
