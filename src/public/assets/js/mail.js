const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
var transporter = nodemailer.createTransport({    
    service: 'Office365',
    host: "smtpout.secureserver.net",  
    secureConnection: true,
    port: 465,
    auth: {
            user: "cotiza-examenes@laboratoriossanfelipehn.com",
            pass: "RNo#xiisu3"
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
        from: "cotiza-examenes@laboratoriossanfelipehn.com",
        to: "",
        subject: "",
        template:'test-email',  
        context:{
                
        } 
        };
module.exports={
    transporter,mailOptions
}