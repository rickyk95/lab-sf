require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const expHbs = require('express-handlebars');
const mongoose  = require('mongoose');
const port = process.env.PORT || 3000;
const Test = require('./models/Test');
const bodyParser = require('body-parser');
const {transporter,mailOptions} = require('./mail');
const Hubspot = require('hubspot');
const hubspot = new Hubspot({ accessToken: process.env.HUBSPOT_TOKEN});
async function createContact(firstName,lastName,email,website_form){
    try{
        const contactObj = {
            "properties": [
              {"property": "firstname","value": firstName },
              {"property": "lastname", "value": lastName },
              {"property":"email","value":email},
              {"property":"website_form","value":website_form}
            ]
          };
          console.log('top one is running');
          const hubspotContact = await hubspot.contacts.create(contactObj);
    }catch(e){
      console.log(e);
       if(e.error.message.toLowerCase().trim() === 'Contact already exists'.toLowerCase().trim()){
        const contactObj = {
            "properties": [
              { "property": "firstname","value": firstName },
              { "property": "lastname", "value": lastName },
              {"property":"email","value":email}
            ]
          };
        let existingEmail = e.options.body.properties[2]['value'];
        console.log("This is whats running");
        await hubspot.contacts.createOrUpdate(email,contactObj);
       }
    }
};

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
mongoose.connect(process.env.MONGOURL,()=>{
    console.log("Connected");
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded())
// app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.set('view engine','handlebars');
app.engine('handlebars',expHbs.engine({}));
app.get('/', async (req,res)=>{
    try{
        let tests = await Test.find().lean();
        let contacts = await hubspot.contacts.getAll()
        res.render('index',{layout:false,tests:tests})
    }catch(e){
        console.log(e,'e');
    }
})

app.get('/articulos/:title',(req,res)=>{
    let title = encodeURIComponent(req.params.title);
    // res.sendFile(path.join(__dirname,'/views/articles/article-1.html'));
    console.log(req.params.title);
    res.sendFile(path.join(__dirname,'/views/articles/'+ req.params.title + '.html'));
})
async function findTest(name,price){
    try{
        let test = await Test.findOne({name:name.toLowerCase()});
        console.log('Test found',test);
    }catch(e){
        console.log('Error occured:',e);

    }
}

app.post('/quote',async (req,res)=>{
    let total = 0;
    let selectedTests = req.body.selectedTests
    console.log(selectedTests);
    const examenes = []
    selectedTests.forEach(async(exam,index)=>{
            const {nombre, precio} = await Test.findOne({nombre:exam})
             examenes.push({
                     nombre,
                     precio
             });                 
             total += precio;
             if(index === selectedTests.length-1){
                     mailOptions.subject=`Hola ${req.body.name}, aquí va tu cotización`;
                     mailOptions.to=req.body.email;
                     mailOptions.context.nombre = req.body.name;
                     mailOptions.context.apellido = req.body.lastName;
                     mailOptions.context.examenes=examenes;
                     mailOptions.context.total=total;
                    transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                    console.log(error);
                            } else {
                            console.log('Email sent: ' + info.response);
                            }
                    })
                    await createContact(req.body.name,req.body.lastName,req.body.email,req.body.website_form);
                    res.status(200).send('Received');
             }
    })
})

app.post('/contact',async (req,res)=>{
    try{
        await createContact(req.body.nombre,req.body.lastName,req.body.email,req.body.website_form);
        res.status(200).send('Received');
    }catch(e){
        res.send(e,'error');
    }

})


