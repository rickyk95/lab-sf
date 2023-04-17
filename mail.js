const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
var transporter = nodemailer.createTransport({    
    service: 'Office365',
    host: "smtpout.secureserver.net",  
    secureConnection: true,
    port: 465,
    auth: {
            user: "cotizador@laboratoriossanfelipehn.com",
            pass: process.env.emailPassword
    }
});

transporter.use('compile',hbs({
    viewEngine:{
            extname:'.handlebars',
            layoutsDir:'./src/views',
            defaultLayout:false
    },
    viewPath:'./views/',
    extName:'.handlebars'
}))
var mailOptions = {
        from: "cotizador@laboratoriossanfelipehn.com",
        to: "",
        subject: "",
        template:'email',  
        context:{
                
            } 
        };

module.exports={
    transporter,mailOptions
}