import db from "@/app/utils/db";
import Quiz from "@/app/model/quizSchema";
export async function POST(req){
    await db.connect()
    const data = await req.json()
    const participants = {
        name:data.finalData.name,
        score : data.finalData.result
    }
    await Quiz.findByIdAndUpdate(data.finalData?.id,{ $push: { participants:participants  } })
    console.log(data.finalData)
    return new Response(JSON.stringify("Hello"))
}