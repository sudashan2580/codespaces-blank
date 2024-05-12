import {NextRequest,NextResponse,} from 'next/server'
export function GET(){
    try{
   NextResponse.json({"message":"Helllo"})
    }
    catch(e){
        NextResponse.json({e:error});
    }
}
export default function handler(req, res) {
    res.status(200).json({ name: 'John Doe' });
  }