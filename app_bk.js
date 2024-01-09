const express=require('express');

const path=require('path');
const app=express();
const multer=require('multer');

//dotenv.config();
const storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
        
    // destination is used to specify the path of the directory in which the files have to be stored
    cb(null, './public/files');    
  }, 
  filename: function (req, file, cb) { 
// It is the filename that is given to the saved file.
     cb(null , file.originalname);   
  }
});
const upload = multer({ storage: storage })




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"/public")));
app.set('views','./src/views');
app.set('view engine','ejs');
app.get('/',(request,response)=>{
   
    response.render('index');
});
app.post('/upload', upload.single('myFile'), (request, response)=> {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    
    response.send("File successfully uploaded.");
   // response.send('ok');
  })
  
app.listen(9172,(error)=>{
    if(error) throw error;
    console.log(`server started at port 9172`);
});