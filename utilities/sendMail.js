const nodemailer = require('nodemailer');

const sendMail = async(userMail,Title,body) => {
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.EMAIL,
                pass:process.env.MAIL_PASSWORD
            }
        });
        const mailOptions = {
            from:process.env.EMAIL,
            to:userMail,
            subject:Title,
            html: body
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log("Failed to send mail: Error -->",error.message);  
            }
            else{
                console.log("Email has been sent", info.response);
            }
        })
        
    } catch (error) {
        console.log("Failed to send mail: Error -->",error.message);  
    }
}

module.exports = sendMail