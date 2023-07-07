import Quiz  from "@/app/model/quizSchema";
import database from "@/app/utils/db";
export async function POST(req){
    await database.connect();
    const {questions} = await req.json()
    console.log(typeof questions, questions[0].question)
    // const questionList = JSON.parse(questions)
    // console.log(questionList)
    await Quiz.create({
        createdBy:"Nikhil",
        questions:questions,
        participants: []
    })
    // console.log(questions)
    const data = await Quiz.findOne({createdBy:"Nikhil"})
    console.log(data)
    return new Response(JSON.stringify({data:data}))

}