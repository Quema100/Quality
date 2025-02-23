function signin(app,fs,crypto,path,os) {
  const username = os.userInfo().username;
  const qualityDir = `/Users/${username}/Documents/Qualityinfo`; // Quality 폴더 경로
  const filePath = path.join(qualityDir, 'users.json'); // users.json 파일 경로
  
  let users = {};
    
  function hashPassword(password) {
    // 비밀번호를 해시화하는 함수
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    return hashedPassword;
  }
  
  app.route('/signin')
  .get((req, res) => {
    // users.json 파일이 존재하는 경우 이전 데이터를 읽어옴
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      if (fileContent) {
        users = JSON.parse(fileContent);
      }
    }
    const errorMessage = req.query.errorMessage || null;
    const successMessage = req.query.successMessage || null;
    res.render(path.join(__dirname, '../../view', 'signin.ejs'),{errorMessage:errorMessage,successMessage:successMessage});
  })
  .post((req, res) => {
    const userID = req.body.id.toLowerCase();
    const userPassword = req.body.userPassword;
    const encryptedPassword = hashPassword(userPassword);

    if (users.userid.toLowerCase() !== userID.toLowerCase() && encryptedPassword === users.password) {
      const errorMessage = 'Not Found ID'; // 오류 메시지 예시
      return res.redirect('/signin?errorMessage=' + encodeURIComponent(errorMessage)); // index.ejs 파일 렌더링    
    }

    if (users.userid.toLowerCase() !== userID.toLowerCase() && encryptedPassword !== users.password) {
      const errorMessage = 'Not Found ID and Password'; // 오류 메시지 예시
      return res.redirect('/signin?errorMessage=' + encodeURIComponent(errorMessage)); // index.ejs 파일 렌더링 
    }

    if (users.userid.toLowerCase() === userID.toLowerCase() && encryptedPassword !== users.password) {
      const errorMessage = 'Not Found Password'; // 오류 메시지 예시
      return res.redirect('/signin?errorMessage=' + encodeURIComponent(errorMessage)); // index.ejs 파일 렌더링      
    }

    if (users.userid.toLowerCase() === userID.toLowerCase() && encryptedPassword === users.password){
      console.log('User logged in successfully.');
      return res.redirect('/signin/home?userID=' + encodeURIComponent(userID[0].toUpperCase()+userID.toLowerCase().replace(userID[0],"")));
    }
    
  });
}

module.exports = signin