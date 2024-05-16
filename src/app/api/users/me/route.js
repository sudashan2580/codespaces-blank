import {connect} from '/workspaces/codespaces-blank/my-app/src/dbconfig/dbconfig.js'
import User from '/workspaces/codespaces-blank/my-app/src/models/userModel.js'
import bcryptjs from 'bcrypt'
import {sendEmail} from '/workspaces/codespaces-blank/my-app/src/helper/mailer.js'
import { NextResponse } from 'next/server';
import { getDatafromToken } from '../../../../helper/getDatafromToken';

connect();
export async function POST(req){
const userId=await getDatafromToken(req)
const user=User.findOne({_id:userId}).select("-password")
return NextResponse.json({
    message:"Userfound",
    data:user
})
}