const express = require('express')
const app = express()
const path = require('path')
const ytdl = require('ytdl-core')

app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine' , 'ejs')   
app.use(express.json())



// app.get('/instagram/post',(_,res) => {
//    res.render('instagram-post',{data:null})
// })


// app.post('/instagram/post',async(req,res) => {

//    const { link } = req.body

//    res.send('ok')

// })







app.get('/',(_,res)=> {
   res.render('yt' , {video:null})
})


app.post('/',async(req,res) => {
      const { link } = req.body
      try {
         const videoId = ytdl.getVideoID(link)
         const info = await  ytdl.getInfo(link)
         const video = info.formats.filter(v => {
            if(v.mimeType.split(';')[0] == 'video/mp4' && v.hasAudio == true) return v;
         })

         res.render('yt',{video , id:videoId})

      } catch (error) {
         res.sendStatus(500)
      }
      

})

app.get('/*',(_,res) => {
   res.sendStatus(404)
})


app.get('/youtube/mp3',(_,res)=> {
   res.render('youtube-audio',{audio:null , link:null})
})


app.post('/youtube/mp3',async(req,res) => {
   const { link } = req.body

   const videoId = ytdl.getVideoID(link)

   const info = await ytdl.getInfo(link)
   const audio = info.formats.filter(a => {
      if(a.mimeType.split(';')[0] == 'audio/mp4') return a;
   })
   res.render('youtube-audio',{audio,id:videoId,link:link})
})



app.get('/facebook',(_,res) => {
   res.render('facebook',{video:null})
})


app.post('/facebook',(req,res) => {
   const { link } = req.body

  
   
})


app.get('/tiktok',async(_,res) => {
   
   res.render('tiktok',{video:null})
})


app.post('/tiktok',async(req,res) => {
   const { link } = req.body
   
   const options = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': '65a5981e76msh2f4163b0efa1df2p12ba9cjsn7de83ce964a2',
         'X-RapidAPI-Host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
      }
   };
   
   fetch(`https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index?url=${link}`, options)
   .then(response => response.json())
   .then(response =>{
      console.log(response);
      res.render('tiktok',{video:response.video})
   })
   .catch(err => {
      console.error(err)
      res.sendStatus(500)
   });
   
})


// app.get('/*',(_,res) => {
//    res.sendStatus(404)
// })



// /*  Instagram Media Download  */

// app.get('/instagram/story',(_,res) => {
//    res.render('instagram-story' , {data:'k'})
// })


// app.post('/instagram/story',(req,res) => {
//    console.log(req.body);
//    res.render('instagram-story')
// })


app.listen(9000,() => {
   console.log('Server runing at 9000 PORT')
})

