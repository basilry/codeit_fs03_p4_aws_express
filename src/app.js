import express from 'express';
import morgan from 'morgan';
import { getPresignedUrl, uploadFile } from './s3.js';

const app = express();
const port = 8000;
app.use(morgan("common"));

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

export default app;