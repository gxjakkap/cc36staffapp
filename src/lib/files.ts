import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const S3 = new S3Client({
  region: `${process.env.S3_REGION}`,
  endpoint: `${process.env.S3_ENDPOINT}`,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
});

export async function getPresignedURL(filePath: string) {
  const url = await getSignedUrl(
    S3,
    new GetObjectCommand({
      Bucket: `${process.env.S3_BUCKET}`,
      Key: `${filePath}`,
    }),
    { expiresIn: 3600 },
  );
  return url;
}
