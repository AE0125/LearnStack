import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || '',
});

const BUCKET_NAME = process.env.MINIO_BUCKET || 'learnstack';

export async function ensureBucket() {
  const exists = await minioClient.bucketExists(BUCKET_NAME);
  if (!exists) {
    await minioClient.makeBucket(BUCKET_NAME, '');
    console.log(`Bucket ${BUCKET_NAME} created.`);
  }
}

export async function uploadFile(fileName: string, buffer: Buffer, contentType: string) {
  await ensureBucket();
  await minioClient.putObject(BUCKET_NAME, fileName, buffer, buffer.length, {
    'Content-Type': contentType,
  });
  return fileName;
}

export async function getFileUrl(fileName: string) {
  return await minioClient.presignedGetObject(BUCKET_NAME, fileName, 24 * 60 * 60); // 24 hours
}

export { minioClient, BUCKET_NAME };
