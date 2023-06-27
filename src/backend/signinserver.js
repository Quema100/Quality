function signin(app,fs,crypto,path) {
  const qualityDir = '/Quality'; // Quality 폴더 경로
  const filePath = path.join(qualityDir, 'users.json'); // users.json 파일 경로
  
  let users = {};
  
  // users.json 파일이 존재하는 경우 이전 데이터를 읽어옴
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    if (fileContent) {
      users = JSON.parse(fileContent);
    }
  }
    
  function hashPassword(password) {
    // 비밀번호를 해시화하는 함수
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    return hashedPassword;
  }
  
  app.post('/signin', (req, res) => {
    // 텍스트를 추가할 HTML 요소 선택
    const userID = req.body.id;
    const userPassword = req.body.userPassword;
    const encryptedPassword = hashPassword(userPassword);

    if (users.userid !== userID && encryptedPassword === users.password) {
      const errorMessage = 'Not Found ID'; // 오류 메시지 예시
      res.render(path.join(__dirname, '../web', 'main.ejs'), { errorMessage: errorMessage }); // index.ejs 파일 렌더링    
    }

    if (users.userid !== userID && encryptedPassword !== users.password) {
      const errorMessage = 'Not Found ID and Password'; // 오류 메시지 예시
      res.render(path.join(__dirname, '../web', 'main.ejs'), { errorMessage: errorMessage }); // index.ejs 파일 렌더링    
    }

    if (users.userid === userID && encryptedPassword !== users.password) {
      const errorMessage = 'Not Found Password'; // 오류 메시지 예시
      res.render(path.join(__dirname, '../web', 'main.ejs'), { errorMessage: errorMessage }); // index.ejs 파일 렌더링      
    }

    if (users.userid === userID && encryptedPassword === users.password){
      console.log('User logged in successfully.');
      res.render(path.join(__dirname, '../web/lobby', 'lobby.ejs')); // index.ejs 파일 렌더링     
      //res.sendFile(path.join(__dirname, '../web', 'main.html')); 
    }
  
  });
}

module.exports = signin