const express = require('express');
const fs = require('fs')
const app = express();
const path = require('path');
const crypto = require("crypto");
const signup = require('./routes/signup')
const signin = require('./routes/signin')
const forgot = require('./routes/forgot')
const lobby = require('./routes/lobby')
const ResetPassword = require('./routes/ResetPassword')
const port = 3000;

app.set('view engine', 'ejs'); // EJS를 뷰 엔진으로 설정
app.set('views', path.join(__dirname, '../view'));
app.use(express.json()); // JSON 데이터 파싱을 위한 Body Parser 미들웨어 등록
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 파싱을 위한 Body Parser 미들웨어 등록

// CORS 설정 (모든 도메인에서 접근 가능하도록 설정)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, '../public')));

// 라우트 정의
app.get('/', (req, res) => {
  res.redirect('/signin');
});

ResetPassword(app,fs,crypto,path)

forgot(app,fs,path)

signin(app,fs,crypto,path)

signup(app,fs,crypto,path)

lobby(app,fs,path)

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname, '../../html', '404.ejs')
  next()
});
// 서버 시작
const start = () => {
  app.listen(port,'localhost', () => {
    console.log(`Server is running on port ${port}`);
  });
};

module.exports = {
  start,
};