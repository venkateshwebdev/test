import db from "@/app/utils/db";
import Quiz from "@/app/model/quizSchema";

export async function POST(req){
    await db.connect()
    const user = await req.json()
    console.log("this sis " , user)
    const data = await Quiz.find({createdBy:user})
    console.log(data)
    return new Response(JSON.stringify({data:data}))
}