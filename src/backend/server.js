const express = require('express');
const app = express();
const port = 3000;


// CORS 설정 (모든 도메인에서 접근 가능하도록 설정)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// 라우트 정의
app.get('/', (req, res) => {
  // 데이터 처리 로직
  const data = {
    message: 'Hello, server!',
    timestamp: new Date().toISOString(),
  };
  res.json(data);
});

// 서버 시작
const start = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

module.exports = {
  start,
};