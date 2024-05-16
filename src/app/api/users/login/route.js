import {connect} from '/workspaces/codespaces-blank/my-app/src/dbconfig/dbconfig.js'
import User from '/workspaces/codespaces-blank/my-app/src/models/userModel.js'
import bcryptjs from 'bcrypt'
import {sendEmail} from '/workspaces/codespaces-blank/my-app/src/helper/mailer.js'
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";


connect();
export async function POST(req){
    const reqBody=await req.json()
const{email,password}=reqBody;
const user=await User.findOne({email})
if(!user){
    return NextResponse.json("doesnt exist");
}
const validPasswoed=await bcryptjs.compare(password,user.password)
if(!validPasswrd){
    return NextResponse.json("check your crediantial");
}
const tokendata={
    id:user._id,
    username: user.username,
    email:user.email

}
jwt.sign(tokendata,process.env.TOKEN_SECRET,{expiresIn:'1d'});
const response=NextResponse.json({
    message:"loggged in sucessfully",sucess:true
})
response.cookies.set("token",token,{httpOnly:true})
return response;
}