const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const port = process.env.PORT || 3000;
const request = require('request')
const { google } = require('googleapis')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ExamSchema = new Schema({
        nombre:String,
        precio:{
                type:Number,
                default:0
        }
})
 var transporter = nodemailer.createTransport({    
        service: 'Office365',
        host: "smtpout.secureserver.net",  
        secureConnection: true,
        port: 465,
        auth: {
                user: "cotizador-de-examenes@laboratoriossanfelipehn.com",
                pass: "Octubre131064RmA"
        }
        });

transporter.use('compile',hbs({
        viewEngine:{
                extname:'.handlebars',
                layoutsDir:'./src/views',
                defaultLayout:false
        },
        viewPath:'./src/views/',
        extName:'.handlebars'
}))

var mailOptions = {
        from: "cotizador-de-examenes@laboratoriossanfelipehn.com",
        to: "",
        subject: "",
        template:'test-email',  
        context:{
                
        } 
      };

const Exam = mongoose.model('Examen',ExamSchema)
function connectToMongoose(){
        mongoose.connect('mongodb://localhost:27017/examenes');
}
app.listen(port,()=>{
        console.log(`Listeing on port ${port}`)
})
app.use(express.static(path.join(__dirname,'/src/public/assets')))
app.use(express.urlencoded({extended:false}))
app.set('view engine','handlebars')
app.engine('handlebars',exphbs({}))
app.set('views', __dirname + '/src/views')
app.get('/',  async (req,res)=>{
        let exams = await Exam.find()
        let nombres = exams.map((examen)=>{
                return examen.nombre
        })
        res.render('index',{layout:false,nombres})
})

app.post('/blah',(req,res)=>{
        res.send('form submitted')
})
app.get('/blog',(req,res)=>{
        res.render('blog',{layout:false})
})

app.post('/cotizador', async (req,res)=>{
        let total = 0;
        let examsArray = req.body.examen
        const examenes = []
        examsArray.forEach(async(exam,index)=>{
                const {nombre, precio} = await Exam.findOne({nombre:exam})
                 examenes.push({
                         nombre,
                         precio
                 })                       
                 total += precio
                 if(index === examsArray.length-1){
                         console.log(req.body.correo)
                         mailOptions.subject=`Hola ${req.body.nombre}, aquí va tu cotización`
                         mailOptions.to=req.body.correo
                         mailOptions.context.nombre = req.body.nombre
                         mailOptions.context.apellido = req.body.apellido
                         mailOptions.context.examenes=examenes
                         mailOptions.context.total=total
                        transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                        console.log(error)
                                } else {
                                console.log('Email sent: ' + info.response);
                                }
                        })

                        res.send('Email Sent')
                 }
        })

  
})
   

connectToMongoose()








