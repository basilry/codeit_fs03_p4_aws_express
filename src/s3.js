import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import dotenv from 'dotenv';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
dotenv.config();

const filePath = 'src/pepe.png'
const fileStream = fs.createReadStream(filePath);

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

const uploadFile = async () => {
  const params = {
    Bucket: bucketName,
    Key: 'image/pepe.png',
    Body: fileStream,
    ContentType: 'image/png',
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3.send(command);
    console.log('Object uploaded successfully:', data);
  } catch (err) {
    console.error('Error uploading object to S3:', err.message || err);
  }
};

const getPresignedUrl = async (fileKey) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
  });

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1시간 유효
    return url;
  } catch (err) {
    console.error("❌ Error generating Pre-signed URL:", err.message || err);
  }
};



export { s3, uploadFile, getPresignedUrl };