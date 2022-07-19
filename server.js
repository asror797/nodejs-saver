const express = require('express')
const app = express()
const path = require('path')

const ytdl = require('ytdl-core')



app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine' , 'ejs')   
app.use(express.json())



// app.get('/',(_,res) => {
//    res.render('yt.ejs')
// })


app.get('/instagram/post',(_,res) => {
   res.render('instagram-post',{data:null})
})


app.post('/instagram/post',async(req,res) => {

   const { link } = req.body

   const info = await ytdl.getInfo(link)

   const audio = info.formats.filter(v => v.hasAudio == true && v.hasVideo == false)

   res.json(audio)

})






// /* Youtube Video Download */

app.get('/',(_,res)=> {
   res.render('youtube-video' , {video:null})
})


app.post('/',async(req,res) => {
      const { link } = req.body
      try {
         const videoId = await ytdl.getVideoID(link)
         console.log(videoId);
         const info = await  ytdl.getInfo(link)
         console.log(info.formats);
         const video = info.formats.filter(v => {
            if(v.mimeType.split(';')[0] == 'video/mp4' && v.hasAudio == true) {
               return v;
            }
         })
         
         res.render('youtube-video',{video , id:videoId})

      } catch (error) {
         res.sendStatus(500)
      }
      

})


app.get('/youtube/mp3',(_,res)=> {
   res.render('youtube-audio',{audio:null})
})


app.post('/youtube/mp3',async(req,res) => {
   const { link } = req.body

   const info = await ytdl.getInfo(link)
   console.log(info.formats);
   const audio = info.formats.filter(a => {
      if(a.mimeType.split(';')[0] == 'audio/mp4') {
         return a;
      }
   })
   res.render('youtube-audio',{audio})
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


// app.get('/kill',(_,res) => {
//    console.log('server stopped');
//    process.exit()
// })
























app.listen(9000,() => {
   console.log('Server runing at 9000 PORT')
})

