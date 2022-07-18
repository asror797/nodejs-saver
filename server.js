const { response } = require('express');
const express = require('express')
const app = express()
const path = require('path')
const process = require('node:process')
// const  ytdl = require('ytdl-core')
// const { Instagram } = require('social-downloader-cherry')

// const saver = require('instagram-stories')

app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine' , 'ejs')   
app.use(express.json())



app.get('/',(_,res) => {
   res.render('yt.ejs')
})




// app.get('/youtube',(_,res) => {
//    res.render('youtube',{data:[]})
// })


// app.post('/youtube',async(req,res) => {
//    const { link }  = req.body

//    const data =  await ytdl.getInfo(link)

//    console.log(data.player_response.streamingData.formats);

//    res.render('youtube',{data:data.player_response.streamingData.formats })

// })


// app.get('/instagram/post',(_,res) => {
//    res.render('instagram')
// })



app.get('/instagram/post',(_,res) => {
   res.render('instagram-post',{data:null})
})


app.post('/instagram/post',async(req,res) => {

   const { link } = req.body

   const options = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': '65a5981e76msh2f4163b0efa1df2p12ba9cjsn7de83ce964a2',
         'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com'
      }
   };
   try {
      let response = await fetch(`https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index?url=${link}`, options)


      response = await response.json()
      console.log(response);

      res.render('instagram-post' , {data:response?.media})
   } catch (error) {
      console.log(error);
      res.sendStatus(500)
   }
})


app.get('/*',(_,res) => {
   res.sendStatus(404)
})




// /* Youtube Video Download */

// app.get('/youtube/mp4',(_,res)=> {
//    res.render('youtube-video' , {data:null})

// })


// app.post('/youtube/mp4',async(req,res) => {
//       const { link } = req.body
//    res.send(link)
   

// })


// app.get('/youtube/mp3',(_,res)=> {
//    res.render('youtube')
// })


// app.post('/youtube/mp3',(req,res) => {
//    res.send('ok')
// })



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