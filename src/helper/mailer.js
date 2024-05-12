import User from '@/models/userModel';
import nodemailer from 'nodemailer'
export const sendEmail = async({email,emailType, userId})=>{
    try{
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if(emailType=="VERIFY"){
          await User.findByIdAndUpdate(userId, 
          {verifyToken: hashedToken,verifyTokenExpiry: Date.now() + 3600000})
        }
        else if (emailType === "RESET"){
          await User.findByIdAndUpdate(userId, 
              {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
      }
      

        
        const transport = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });
          {
          const mailOptions={ from: 'sudarshan@gmail.com', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
             html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }  
          const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
        }
    }catch(e){
        throw new Error(e.message);
        
    }
}
   