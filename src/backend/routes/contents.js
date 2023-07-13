function contents (app,fs,path,spawn){
    const qualityDir = '/Quality'; // Quality 폴더 경로
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
        const wifispeed = req.query.wifispeed || null;
        res.render(path.join(__dirname, '../../view', 'contents.ejs'),{userID:userID, wifispeed:wifispeed});
        console.log('in contents')
        // 파이썬 코드 실행
        const pythonScriptPath = path.join(__dirname, '.', 'python', 'contents.py');
        const pythonProcess = spawn('python', [pythonScriptPath]);

        pythonProcess.stdout.on('data', (data) => {
          const output = data.toString();
          console.log(output); // 선택적인 출력
          // 출력이 있을 때마다 응답 보내기
          res.render(path.join(__dirname, '../../view', 'contents.ejs'), { userID: userID, wifispeed: output });        
        });
  
        pythonProcess.stderr.on('data', (data) => {
          const error = data.toString();
          console.error(error);
        });
  
        pythonProcess.on('close', (code) => {
          console.log(`pythonProcessQuit: ${code}`);
          res.end(); // 응답 종료
        });
      }
    })
    .post((req, res)=>{

    })


}

module.exports = contents