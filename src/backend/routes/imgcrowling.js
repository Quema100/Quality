function imgcrowling(app,fs,path,os,puppeteer){
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
        return res.render(path.join(__dirname, '../../view', 'imgcrowling.ejs'),{userID:userID,filepath:filepath});
      }
    })
    .post((req, res) => {
      const Link = req.body.link;
      const qualityDir = `/Users/${username}/Downloads`; // Quality 폴더 경로

      (async () => {
        const browser = await puppeteer.launch({
          headless: false,
        });
        const page = await browser.newPage();

        const list = []

        const trashLink = []

        await page.goto(Link);

        await page.setViewport({ width: 1080, height: 1024 });

        let redirected = false; // 리디렉션이 이미 수행되었는지 추적하는 플래그
        
        page.on('response', async (response) => {
          const type = response.request().resourceType();
          const url = response.url();
          if (!['image', 'jpeg', 'png', 'webp'].includes(type)) return;
      
          console.log(`image: ${url}, Type: ${type}`);
          list.push(url)
          console.log(list)

          for (const url of list) {
            if(trashLink.includes(url))return;
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'domcontentloaded',delay: 3000 });
        
            // 이미지 다운로드 로직
            const imageUrls = await page.evaluate(() => {
              const images = document.querySelectorAll('img[src]');
              return Array.from(images, img => img.src);
            });

            for (const imageUrl of imageUrls) {
              trashLink.push(imageUrl)
              console.log(imageUrl);
              let http = String(imageUrl)
              if(!http.startsWith("http")||http.includes("generate")){
                await page.close();
                const indexToRemove = list.indexOf(imageUrl);
                if (indexToRemove !== -1) {
                  list.splice(indexToRemove, 1);
                }
                return;
              }

              try {
                const response = await page.goto(imageUrl, { waitUntil: 'networkidle2',delay: 1000 });
              
                const imageBuffer = await response.buffer();

              
                const fileName = path.join(qualityDir, `${Math.random()}.png`);
                fs.writeFileSync(fileName, imageBuffer);
                console.log(`Image downloaded: ${fileName}`);

                await page.close();

                const indexToRemove = list.indexOf(imageUrl);
                if (indexToRemove !== -1) {
                  list.splice(indexToRemove, 1);
                }
              
              } catch (error) {
                console.error(`Error downloading image from ${imageUrl}: ${error.message}`);
              }
            }

          }
          const userID = req.body.userID;

          if (!redirected) {
            redirected = true;
            res.redirect('/signin/contents/crowling?userID=' + encodeURIComponent(userID) + '&filepath=' + encodeURIComponent(qualityDir));
          }
        });
      })();
    })
}

module.exports = imgcrowling