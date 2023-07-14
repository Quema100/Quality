function ResetPassword(app,fs,crypto,path,os){
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
    
    app.route('/forgot/resetpassword')
    .get((req, res) => {
          // users.json 파일이 존재하는 경우 이전 데이터를 읽어옴
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        if (fileContent) {
          users = JSON.parse(fileContent);
        }
      }
      const userID = req.query.userID;

      if (!userID || userID !== users.userid) {
        return res.redirect('/forgot');
      } else {
        const errorMessage = req.query.errorMessage || null;
        return res.render(path.join(__dirname, '../../view', 'ResetPassword.ejs'), { errorMessage:errorMessage });
      }
    })
    .post((req, res) => {
        const NewPassword = req.body.NewPassword;
        const ReEnterPassword = req.body.ReEnterPassword;
        const userPassword = hashPassword(NewPassword);

        if(NewPassword !== ReEnterPassword){
          const errorMessage = 'The password is incorrect.';
          return res.redirect('/forgot/resetpassword?userID='+ encodeURIComponent(users.userid) + '&errorMessage=' + encodeURIComponent(errorMessage)); 
        }

        if(userPassword === users.password){
          const errorMessage = 'Cannot reuse previous password.'
          return res.redirect('/forgot/resetpassword?userID='+ encodeURIComponent(users.userid) + '&errorMessage=' + encodeURIComponent(errorMessage))
        }
        
        users.password = userPassword;

        fs.writeFile(filePath, JSON.stringify(users), 'utf-8', (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Error occurred while saving user data.');
          }
          const successMessage = 'You have successfully changed your password.';
          res.redirect('/signin?successMessage=' + encodeURIComponent(successMessage));
        });

    })
}

module.exports = ResetPassword