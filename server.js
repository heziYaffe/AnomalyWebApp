const express = require('express');
const fileUpload = require('express-fileupload');
const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');


const MasterBackend =  require('./BackEnd/MasterBackend');

const app = express();
app.use(express.json({limit: '10mb', extended: true}));

app.use(fileUpload())

var models = [{id:4,Name:"J",is_Ready:false,type:"NonLinear"},
                {id:5,Name:"Jake",is_Ready:false,type:"Linear"}]


app.get('/api/customers',(req,res)=>{


    console.log(MasterBackend);
    var mt = new MasterBackend.MasterBackend();

});


app.get('/api/models',(req,res) =>{

    res.json(models)
})


app.post('/api/models/add',(req,res) => {
   
    models.push(req.body);
    

})

app.get(`/api/models/:id`,(req,res)=>{

    models.forEach(model => {if(model.id == req.params.id){res.json(model);console.log(model)}});
    
})

const port  = 5000;

app.delete('/api/models/delete/:id',(req,res) => {
     
     console.log(req.params.id);
     const tmp = models.filter((model) => model.id != req.params.id);
     models = tmp;
     
     
})

//app.post('/api/file/add',(req,res) => {   
    //if(req.files) {
        //console.log(req.files)
        //var file = req.files.myFile
        //var filename = file.name
        //console.log(filename)
    //}
    //file.mv('./uploads/'+filename,function(err){
        //if(err){
            //res.send(err)
        //}else{
            //res.send("File Uploaded")
        //}
    //})
       
    //})




// A function which deletes all files 
// inside the uploads folder 
// should be activated when we are done turning the file into 
// a Data object. 
const purgeUploadsFolder = () => {

    const directory = 'uploads';
    fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
        });
    }
    });
}

app.post('/api/models/update',(req,res)=>{
    console.log(req.body.predict_data['All Cause'])
})

app.listen(port,()=> console.log(`server started on port ${port}`))