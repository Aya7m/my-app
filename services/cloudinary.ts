import cloudinary from "@/app/lib/cloudinary";

export type cloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
};

export async function uploadToCloudinary(
  file: File,
): Promise<cloudinaryUploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dateUrl = `data:${file.type};base64,${base64}`;

  try {
    const result = await cloudinary.uploader.upload(dateUrl, {
      folder: "blog_covers",
      transformation: [{ format: "webp" }],
    });
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  } catch (error) {
    console.log("Cloudinary Upload Error:", error);
    throw new Error("Cloudinary Upload Failed");
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("Cloudinary Deletion Error:", error);
    throw new Error("Cloudinary Deletion Failed");
  }
}
