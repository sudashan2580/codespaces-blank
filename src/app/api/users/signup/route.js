import {connect} from '@dbconfig/dbconfig'
import User from '@/models/userModel'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcrypt'
import {sendEmail} from '@/helpers/mailer'

connect();
export async function POST(request){
try{
const reqBody=request.json()
const{username,email,password}=reqBody;
//validation
console.log(reqBody);
const user = await User.findOne({email})
    if(user){
        return NextResponse.json({error:"User already exists"});
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword=await bcryptjs.hash(password,salt)
    const newUser = new User({
        username,email,password:hashedPassword
    })
    const savedUser=await newUser.save()
    console.log(savedUser);
    //send verification email
await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});
return NextResponse.json({
    message:"Sucessfull",
    sucess:true,
    savedUser
})
    
}
catch(error){
    return NextResponse.json({error:error.message})
}
}
