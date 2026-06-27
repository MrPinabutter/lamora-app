import "server-only";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

export const PRODUCT_IMAGE_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type ProductImageContentType =
  (typeof PRODUCT_IMAGE_CONTENT_TYPES)[number];

const EXTENSION_BY_CONTENT_TYPE: Record<ProductImageContentType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

function productImagePublicUrl(key: string): string {
  const customBase = process.env.AWS_S3_PUBLIC_URL_BASE?.replace(/\/$/, "");
  if (customBase) return `${customBase}/${key}`;

  const bucket = process.env.AWS_S3_BUCKET_NAME!;
  const region = process.env.AWS_REGION!;
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function createProductImageUploadUrl(
  contentType: ProductImageContentType,
): Promise<{ uploadUrl: string; publicUrl: string }> {
  const bucket = process.env.AWS_S3_BUCKET_NAME;
  if (!bucket) {
    throw new Error("AWS_S3_BUCKET_NAME não configurado.");
  }

  const key = `products/${randomUUID()}.${EXTENSION_BY_CONTENT_TYPE[contentType]}`;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  return { uploadUrl, publicUrl: productImagePublicUrl(key) };
}
