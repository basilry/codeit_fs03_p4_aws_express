import express from 'express';
import morgan from 'morgan';
import { getPresignedUrl, uploadFile } from './s3.js';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 8000;
const prisma = new PrismaClient();

app.use(morgan("common"));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, AWS!');
});

app.get('/hello', (req, res) => {
  res.send('Hello, Codeit!');
});

app.get('/upload', async (req, res) => {
  try {
    await uploadFile();
    res.json({ message: '파일 업로드 성공!' });
  } catch (error) {
    res.status(500).json({ message: '파일 업로드 실패', error: error.message });
  }
});

app.get('/presigned-url', async (req, res) => {
  const fileKey = "image/pepe.png"; // 클라이언트에서 동적으로 받도록 수정 가능

  try {
    const url = await getPresignedUrl(fileKey);
    res.json({ message: "Pre-signed URL 생성 성공!", url });
  } catch (error) {
    res.status(500).json({ message: "Pre-signed URL 생성 실패", error: error.message });
  }
});

app.post('/customer', async (req, res) => {
  const { name, email } = req.body;

  try {
    const customer = await prisma.customer.create({
      data: { name, email },
    });
    res.json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/product', async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const product = await prisma.product.create({
      data: { name, price, description },
    });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default app;