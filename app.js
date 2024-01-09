const express=require('express');
const aws=require('aws-sdk');

const path=require('path');
const app=express();
const multer=require('multer');
const dotenv=require('dotenv');
dotenv.config();
aws.config.update({
    
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETKEY,
    region: process.env.REGION
});

const s3 = new aws.S3();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // limit file size to 5MB
    },
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"/public")));
app.set('views','./src/views');
app.set('view engine','ejs');
app.get('/',(request,response)=>{
   
    response.render('index');
});
app.post('/upload', upload.single('myFile'), (request, response)=> {
    const params = {
        Bucket: process.env.BUCKETNAME,
        Key: request.file.originalname,
        Body: request.file.buffer,
      };
    
      s3.upload(params, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error uploading file');
        }
    
        response.send('File uploaded successfully');
      });
  })
  
app.listen(9172,(error)=>{
    if(error) throw error;
    console.log(`server started at port 9172`);
});