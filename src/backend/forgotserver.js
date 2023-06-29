function forgot (app,fs,path){
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

  app.route('/forgot')
  .get((req, res) => {
    const errorMessage = req.query.errorMessage || null;
    res.render(path.join(__dirname, '../web/forgot', 'forgot.ejs'), { errorMessage:errorMessage}); 
  })
  .post((req, res) => {
    const userID = req.body.id;

    if (users.userid !== userID) {
      const errorMessage = 'Not Found ID';
      res.redirect('/forgot?errorMessage=' + encodeURIComponent(errorMessage)); 
    }

    if (users.userid === userID){
      // 세션 대신 query string으로 userID 전달
      return res.redirect('/resetpassword?userID=' + encodeURIComponent(userID));
    }
  
  });
}

module.exports = forgot