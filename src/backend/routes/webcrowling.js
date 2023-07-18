function webcrowling(app,fs,path,os,axios,cheerio){
    const username = os.userInfo().username;
    const qualityDir = `/Users/${username}/Documents/Qualityinfo`; // Quality 폴더 경로
    const filePath = path.join(qualityDir, 'users.json'); // users.json 파일 경로
    
  
    let users = {};
    app.route('/signin/contents/crowling')
    .get((req, res) => {
       // users.json 파일이 존재하는 경우 이전 데이터를 읽어옴
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        if (fileContent) {
          users = JSON.parse(fileContent);
        }
      }
      const filepath = req.query.filepath || null;
      const userID = req.query.userID;      
      const errorMessage = 'You have accessed an invalid path.'

      if(!userID || userID !== users.userid){
        return res.redirect('/signin?errorMessage=' + encodeURIComponent(errorMessage))
      }else{
        return res.render(path.join(__dirname, '../../view', 'webcrowling.ejs'),{userID:userID,filepath:filepath});
      }
    })
    .post((req, res) => {
      const Link = req.body.link;
      const first = req.body.mainhtmlCode
      const second = req.body.secondhtmlCode
      const third = req.body.thirdhtmlCode
      const qualityDir = `/Users/${username}/Documents/Qualitycrowling`; // Quality 폴더 경로
      const filePath = path.join(qualityDir, 'crowlinginfo.json'); // users.json 파일 경로

      if (!fs.existsSync(qualityDir)) {
        fs.mkdirSync(qualityDir);
      }

      const gethtml= async(first,second,third) => {
        try{
          await axios.get(`${Link}`)
          .then((response) =>{
            let ulList = []
            const htmlString = response.data;
            const $ = cheerio.load(htmlString);
            const bodyList = $(first);
            const data = $(first).text().replace(/^\s+|\s+$/gm, "");
            bodyList.map((i, element) => {
              ulList[i] = {
                listnum: i + 1,
                firstlist: `${data}`,
                secondlist: $(element).find(second).text().replace(/^\s+|\s+$/gm, ""),
                thirdlist: $(element).find(third).text().replace(/^\s+|\s+$/gm, ""),
            };
          });
            console.log("bodyList : ", ulList);
            fs.writeFile(filePath, JSON.stringify(ulList), 'utf-8', (err) => {
              if (err) {
                console.log(err);
                return res.status(500).send('Error occurred while saving user data.');
              }
              console.log('New info added to the file.');

              const userID = req.body.userID;
              const filepath = `${filePath}`

              res.redirect('/signin/contents/crowling?userID=' + encodeURIComponent(userID) + '&filepath=' + encodeURIComponent(filepath))            
            });

          })
        }catch(err){
          console.log(err)
        }
      }

      gethtml(first,second,third)
    })
}

module.exports = webcrowling