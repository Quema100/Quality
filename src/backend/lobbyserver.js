function lobby (app,fs,path){
    const qualityDir = '/Quality'; // Quality 폴더 경로
    const filePath = path.join(qualityDir, 'users.json'); // users.json 파일 경로
    

    let users = {};

    app.route('/lobby')
    .get((req, res)=>{
      // users.json 파일이 존재하는 경우 이전 데이터를 읽어옴
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        if (fileContent) {
          users = JSON.parse(fileContent);
        }
      }
      
      let id = req.query.userID
      const errorMessage = 'You have accessed an invalid path.'

      if(!id || id !== users.userid){
          return res.redirect('/signin?errorMessage=' + encodeURIComponent(errorMessage))
      }else{
        res.sendFile(path.join(__dirname, '../web/lobby', 'lobby.html'));
      }

    })
    .post((req, res)=>{

    })


}

module.exports = lobby