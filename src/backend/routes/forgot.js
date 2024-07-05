const forgot = (app,fs,path,os) => {
  const username = os.userInfo().username;
  const qualityDir = `/Users/${username}/Documents/Qualityinfo`; // Quality 폴더 경로
  const filePath = path.join(qualityDir, 'users.json'); // users.json 파일 경로
  
  let users = {};
  

  app.route('/forgot')
  .get((req, res) => {
      // users.json 파일이 존재하는 경우 이전 데이터를 읽어옴
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      if (fileContent) {
        users = JSON.parse(fileContent);
      }
    }
    const errorMessage = req.query.errorMessage || null;
    res.render(path.join(__dirname, '../../view', 'forgot.ejs'), { errorMessage:errorMessage}); 
  })
  .post((req, res) => {
    const userID = req.body.id.toLowerCase();

    if (users.userid.toLowerCase() !== userID.toLowerCase() ) {
      const errorMessage = 'Not Found ID';
      res.redirect('/forgot?errorMessage=' + encodeURIComponent(errorMessage)); 
    }

    if (users.userid.toLowerCase() === userID.toLowerCase() ) {
      // 세션 대신 query string으로 userID 전달
      return res.redirect('/forgot/resetpassword?userID=' + encodeURIComponent(userID[0].toUpperCase()+userID.toLowerCase().replace(userID[0],"")));
    }
  
  });
}

module.exports = forgot