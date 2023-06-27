function signup(app,fs,crypto,path){
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
    
    function hashPassword(password) {
      // 비밀번호를 해시화하는 함수
      const hash = crypto.createHash('sha256');
      hash.update(password);
      const hashedPassword = hash.digest('hex');
      return hashedPassword;
    }
    
    app.post('/sign', (req, res) => {
      const userID = req.body.id;
      const hashedPassword= req.body.userPassword;
      // 비밀번호를 암호화하여 저장
      const userPassword = hashPassword(hashedPassword);
    
      const newUser = {
        userid: userID,
        password: userPassword
      };


      if (users.userid === userID) {
        console.log('User already exists. Cannot create a duplicate user.');
        res.render(path.join(__dirname, '../web', 'main.ejs'),{ errorMessage:null});
      }
    
      // 데이터를 추가하는 대신에 기존 데이터를 유지하도록 할 때는 아래의 코드를 사용합니다.
      if (Object.keys(users).length > 0) {
        console.log('Cannot add new user. Existing data already exists.');
        return res.render(path.join(__dirname, '../web', 'main.ejs'),{ errorMessage:null});
      }
    
      users = newUser;
    
      fs.writeFile(filePath, JSON.stringify(users), 'utf-8', (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error occurred while saving user data.');
        }
        console.log('New user added to the file.');
        res.render(path.join(__dirname, '../web', 'main.ejs'),{ errorMessage:null});
      });

    });
}

module.exports = signup