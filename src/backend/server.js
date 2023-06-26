const express = require('express');
const fs = require('fs')
const app = express();
const path = require('path');
const port = 3000;


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
  res.sendFile(path.join(__dirname, '../web', 'main.html'));
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

app.get('/signin', (req, res) => {
  // 데이터 처리 로직
  const data = {
   message: 'Hello, server!',
   timestamp: new Date().toISOString(),
  };
  res.json(data);
});

const qualityDir = '/Quality'; // Quality 폴더 경로
const filePath = path.join(qualityDir, 'users.json'); // users.json 파일 경로

// Quality 폴더가 존재하지 않을 경우 생성
if (!fs.existsSync(qualityDir)) {
  fs.mkdirSync(qualityDir);
}

let users = {};

// users.json 파일이 존재하는 경우 이전 데이터를 읽어옴
if (fs.existsSync(filePath)) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  if (fileContent) {
    users = JSON.parse(fileContent);
  }
}

app.post('/sign', (req, res) => {
  const userID = req.body.id;
  const userPassword = req.body.userPassword;

  if (users.hasOwnProperty(userID)) {
    console.log('User already exists. Cannot create a duplicate user.');
    //res.sendFile(path.join(__dirname, '../web', 'main.html'));
    return res.sendFile(path.join(__dirname, '../web', 'main.html'));//res.status(400).send('User already exists. Cannot create a duplicate user.');
  }

  const newUser = {
    usrid: userID,
    password: userPassword
  };

  // 데이터를 추가하는 대신에 기존 데이터를 유지하도록 할 때는 아래의 코드를 사용합니다.
  if (Object.keys(users).length > 0) {
    console.log('Cannot add new user. Existing data already exists.');
    res.sendFile(path.join(__dirname, '../web', 'main.html'));
    return res.sendFile(path.join(__dirname, '../web', 'main.html'));//res.status(400).send('Cannot add new user. Existing data already exists.');
  }

  users = newUser;

  fs.writeFile(filePath, JSON.stringify(users), 'utf-8', (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error occurred while saving user data.');
    }
    console.log('New user added to the file.');
    res.sendFile(path.join(__dirname, '../web', 'main.html'));
    //res.send('New user added successfully.');
  });
  // 데이터 처리 로직
  //console.log(req.body)
  //res.send(req.body);
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