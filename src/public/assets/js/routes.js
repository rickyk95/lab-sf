const express = require('express')
const app = express()
const router = express.Router()
const {transporter,mailOptions} = require('./mail')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ExamSchema = new Schema({
            nombre:String,
            precio:{
                    type:Number,
                    default:0
            }
    },{collection:"examenes"})

const Exam = mongoose.model('Examen',ExamSchema)
router.use(express.urlencoded({extended:false}))

router.get('/',  async (req,res)=>{
    try{
        let exams = await Exam.find()
        let nombres = exams.map((examen)=>{
                return examen.nombre
    })
        console.log(nombres);
        res.render('index',{layout:false,nombres})
    }catch(e){
            console.log(e,'Error in root URL')
            res.send('<h1>Ha ocurrido un Error </h1>')
    }
})


router.post('/cotizador', async (req,res)=>{
 try{
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

                    res.render('form-submission',{layout:false,name:req.body.nombre})
             }
    })

}catch{
    console.log()
}
})

module.exports=router
