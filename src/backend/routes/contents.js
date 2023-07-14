function contents (app,fs,path,os){
  const username = os.userInfo().username;
  const qualityDir = `/Users/${username}/Documents/Qualityinfo`; // Quality 폴더 경로
  const filePath = path.join(qualityDir, 'users.json'); // users.json 파일 경로
  

  let users = {};

  app.route('/signin/contents')
  .get((req, res)=>{
    // users.json 파일이 존재하는 경우 이전 데이터를 읽어옴
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      if (fileContent) {
        users = JSON.parse(fileContent);
      }
    }
    
    const userID = req.query.userID;
    const errorMessage = 'You have accessed an invalid path.'

    if(!userID || userID !== users.userid){
        return res.redirect('/signin?errorMessage=' + encodeURIComponent(errorMessage))
    }else{
      res.render(path.join(__dirname, '../../view', 'contents.ejs'),{userID:userID});
      console.log('in contents')
    }
  })
  .post((req, res)=>{

  })


}

module.exports = contents