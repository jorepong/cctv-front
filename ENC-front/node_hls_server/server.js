// server.js
const express = require('express');
const path = require('path');
const app = express();

// 1) CORS 허용 미들웨어
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');           // 모든 출처 허용
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS'); // 허용 메서드
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 2) HLS 파일(.m3u8, .ts) 정적 제공

// cam1
app.use(
  '/cam1',
  express.static(
    'C:/ENC-front/cctv-front/ENC-front/hls_camera/cam1',
    {
      extensions: ['m3u8', 'ts'],
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.m3u8')) {
          res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        } else if (filePath.endsWith('.ts')) {
          res.setHeader('Content-Type', 'video/MP2T');
        }
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  )
);

// cam2
app.use(
  '/cam2',
  express.static(
    'C:/ENC-front/cctv-front/ENC-front/hls_camera/cam1', // 추후 cam1 대신 경로를 cam2로 수정필요
    {
      extensions: ['m3u8', 'ts'],
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.m3u8')) {
          res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        } else if (filePath.endsWith('.ts')) {
          res.setHeader('Content-Type', 'video/MP2T');
        }
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  )
);

// cam3
app.use(
  '/cam3',
  express.static(
    'C:/ENC-front/cctv-front/ENC-front/hls_camera/cam1', // 추후 cam1 대신 경로를 cam3로 수정필요
    {
      extensions: ['m3u8', 'ts'],
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.m3u8')) {
          res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        } else if (filePath.endsWith('.ts')) {
          res.setHeader('Content-Type', 'video/MP2T');
        }
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  )
);

// 3) React 앱 빌드 결과물 서빙
app.use(
  '/',
  express.static(
    path.join(__dirname, 'public', 'app'),
    { index: 'index.html' }
  )
);

// 4) 서버 시작
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`HLS server running at http://localhost:${PORT}/cam1/stream.m3u8`);
});
