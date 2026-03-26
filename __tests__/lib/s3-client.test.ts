import { ensureBucket, uploadFile, getFileUrl, BUCKET_NAME, minioClient } from '@/lib/s3-client';

jest.mock('minio', () => {
  return {
    Client: jest.fn().mockImplementation(() => ({
      bucketExists: jest.fn(),
      makeBucket: jest.fn(),
      putObject: jest.fn(),
      presignedGetObject: jest.fn(),
    })),
  };
});

describe('s3-client', () => {
  const mockBucketExists = minioClient.bucketExists as jest.Mock;
  const mockMakeBucket = minioClient.makeBucket as jest.Mock;
  const mockPutObject = minioClient.putObject as jest.Mock;
  const mockPresignedGetObject = minioClient.presignedGetObject as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ensureBucket', () => {
    it('should create bucket if it does not exist', async () => {
      mockBucketExists.mockResolvedValue(false);
      mockMakeBucket.mockResolvedValue(true);

      await ensureBucket();

      expect(mockBucketExists).toHaveBeenCalledWith(BUCKET_NAME);
      expect(mockMakeBucket).toHaveBeenCalledWith(BUCKET_NAME, '');
    });

    it('should not create bucket if it exists', async () => {
      mockBucketExists.mockResolvedValue(true);

      await ensureBucket();

      expect(mockBucketExists).toHaveBeenCalledWith(BUCKET_NAME);
      expect(mockMakeBucket).not.toHaveBeenCalled();
    });
  });

  describe('uploadFile', () => {
    it('should upload file and return fileName', async () => {
      mockBucketExists.mockResolvedValue(true);
      mockPutObject.mockResolvedValue(true);

      const fileName = 'test.txt';
      const buffer = Buffer.from('test content');
      const contentType = 'text/plain';

      const result = await uploadFile(fileName, buffer, contentType);

      expect(result).toBe(fileName);
      expect(mockPutObject).toHaveBeenCalledWith(
        BUCKET_NAME,
        fileName,
        buffer,
        buffer.length,
        { 'Content-Type': contentType }
      );
    });
  });

  describe('getFileUrl', () => {
    it('should return presigned URL', async () => {
      const mockUrl = 'http://localhost:9010/learnstack/test.txt?sig=...';
      mockPresignedGetObject.mockResolvedValue(mockUrl);

      const fileName = 'test.txt';
      const result = await getFileUrl(fileName);

      expect(result).toBe(mockUrl);
      expect(mockPresignedGetObject).toHaveBeenCalledWith(BUCKET_NAME, fileName, 24 * 60 * 60);
    });
  });
});
