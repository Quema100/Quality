function webcrowling(app,fs,path,os,puppeteer,cheerio){
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

      //const gethtml= async(first,second,third) => {
      //  try{
      //    await axios.get(`${Link}`)
      //    .then((response) =>{
      //      let ulList = []
      //      const htmlString = response.data;
      //      const $ = cheerio.load(htmlString);
      //      const bodyList = $(first);
      //      const data = $(first).text().replace(/^\s+|\s+$/gm, "");
      //      bodyList.map((i, element) => {
      //        ulList[i] = {
      //          listnum: i + 1,
      //          firstlist: `${data}`,
      //          secondlist: $(element).find(second).text().replace(/^\s+|\s+$/gm, ""),
      //          thirdlist: $(element).find(third).text().replace(/^\s+|\s+$/gm, ""),
      //      };
      //    });
      //      console.log("bodyList : ", ulList);
      //      fs.writeFile(filePath, JSON.stringify(ulList), 'utf-8', (err) => {
      //        if (err) {
      //          console.log(err);
      //          return res.status(500).send('Error occurred while saving user data.');
      //        }
      //        console.log('New info added to the file.');

      //        const userID = req.body.userID;
      //        const filepath = `${filePath}`

      //        res.redirect('/signin/contents/crowling?userID=' + encodeURIComponent(userID) + '&filepath=' + encodeURIComponent(filepath))            
      //      });

      //    })
      //  }catch(err){
      //    console.log(err)
      //  }
      //}

      //gethtml(first,second,third)

      let MealList = {
        "date": "",
        "breakfast": "",
        "lunch": "",
        "dinner": "", 
      };
      
      async function crawl(Link,first,second,third){

        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        const ndhs_id = ''; // 추후 로그인 폼에서 각자의 아이디 비밀번호를 입력받게 할 예정
        const ndhs_pw = '';
      
        //페이지로 가라
        await page.goto(`${Link}`);
      
        //해당 페이지에 특정 html 태그를 클릭해라
        await page.click('body > div > div > div > div > div > div.row > div > div.login-body > div > div.col-xs-12.col-sm-5.login-con.pt20 > div > form > ul > li:nth-child(2)');
        
        //아이디랑 비밀번호 란에 값을 넣어라
        await page.evaluate((id, pw) => {
        document.querySelector('#stuUserId').value = id;
        document.querySelector('#stuPassword').value = pw;
        }, ndhs_id, ndhs_pw);
      
        //로그인 버튼을 클릭해라
        await page.click('#student > div > div:nth-child(2) > button');
      
        //로그인 화면이 전환될 때까지 기다려라, headless: false 일때는 필요 반대로 headless: true일때는 없어야 되는 코드
        //await page.waitForNavigation()
      
        //로그인 성공 시(화면 전환 성공 시)
        if(page.url() === 'http://portal.ndhs.or.kr/dashboard/dashboard'){
            //학사 페이지로 가서
            await page.goto('http://portal.ndhs.or.kr/studentLifeSupport/carte/list');
            
            // 현재 페이지의 html정보를 로드
            const content = await page.content();
            const $ = cheerio.load(content);
            const lists = $("body > div.container-fluid > div:nth-child(6) > div > table > tbody > tr");
            lists.each((index, list) => {
                MealList[index] = {
                    date: $(list).find("th").text().replace('\n\t\t\t\t\t\t\t\t',""),
                    breakfast:$(list).find("td:nth-of-type(1)").text(),
                    lunch:$(list).find("td:nth-of-type(2)").text(),
                    dinner:$(list).find("td:nth-of-type(3)").text()
                }
                console.log(MealList[index]); 
                fs.writeFile(filePath, JSON.stringify(MealList[index]), 'utf-8', (err) => {
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
        }
        //로그인 실패시
        else{
            console.log('실패');
            ndhs_id = 'nope';
            ndhs_pw = 'nope';
        }
      
        //브라우저 꺼라
        await browser.close();     
      };
      
      
      crawl(Link,first,second,third);
    })
}

module.exports = webcrowling