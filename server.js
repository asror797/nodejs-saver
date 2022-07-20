const express = require('express')
const app = express()
const path = require('path')
const ytdl = require('ytdl-core')
// const Tiktok = require('tiktok-downloader')

app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine' , 'ejs')   
app.use(express.json())



app.get('/instagram/post',(_,res) => {
   res.render('instagram-post',{data:null})
})


app.post('/instagram/post',async(req,res) => {

   const { link } = req.body

   res.send('ok')

})







app.get('/',(_,res)=> {
   res.render('youtube-video' , {video:null})
})


app.post('/',async(req,res) => {
      const { link } = req.body
      try {
         const videoId = ytdl.getVideoID(link)
         const info = await  ytdl.getInfo(link)
         const video = info.formats.filter(v => {
            if(v.mimeType.split(';')[0] == 'video/mp4' && v.hasAudio == true) return v;
         })

         res.render('youtube-video',{video , id:videoId})

      } catch (error) {
         res.sendStatus(500)
      }
      

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

   // const tiktok = new Tiktok('https://www.tiktok.com/@_..any_/video/7084702408936312070')

   // tiktok.get()
   //    .then(data => {
   //       console.log(data)
   //    })
   //    .catch(err => {
   //       console.log(err);
   //    })
   
})



app.get('/*',(_,res) => {
   res.sendStatus(404)
})


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

