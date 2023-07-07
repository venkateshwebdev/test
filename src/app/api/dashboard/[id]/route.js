import db from "@/app/utils/db";
import Quiz from "@/app/model/quizSchema";

export async function GET(req,params){
    await db.connect()
    // console.log(params)
    const data = await Quiz.find({_id:params.params.id})
    return new Response(JSON.stringify(data))
}