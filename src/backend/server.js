const express = require('express');
const fs = require('fs')
const app = express();
const path = require('path');
const crypto = require("crypto");
const signup = require('./signupserver.js')
const signin = require('./signinserver.js')
const port = 3000;

app.set('view engine', 'ejs'); // EJS를 뷰 엔진으로 설정
app.set('views', path.join(__dirname, '../web'));
app.use(express.json()); // JSON 데이터 파싱을 위한 Body Parser 미들웨어 등록
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 파싱을 위한 Body Parser 미들웨어 등록

// CORS 설정 (모든 도메인에서 접근 가능하도록 설정)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, '../web')));

// 라우트 정의
app.get('/', (req, res) => {
  res.render(path.join(__dirname, '../web', 'main.ejs'),{ errorMessage:null});
  // 데이터 처리 로직
  //const data = {
  //  message: 'Hello, server!',
  // timestamp: new Date().toISOString(),
  //};
  //res.json(data);
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../web/signup', 'signup.html'));
});

signin(app,fs,crypto,path)


signup(app,fs,crypto,path)



// 서버 시작
const start = () => {
  app.listen(port,'localhost', () => {
    console.log(`Server is running on port ${port}`);
  });
};

module.exports = {
  start,
};