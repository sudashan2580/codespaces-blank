import {NextRequest,NextResponse,} from 'next/server'
export function GET(){
    try{
   NextResponse.json({"message":"Helllo"})
    }
    catch(e){
        NextResponse.json({e:error});
    }
}