import db from "@/app/utils/db";
import Quiz from "@/app/model/quizSchema";

export async function GET(req,params){
    await db.connect()
    const id = params.params.id
    const data = await Quiz.findOne({_id:id})
    return new Response(JSON.stringify({data:data}))
}