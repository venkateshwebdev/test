"use client"
import { useState } from 'react';
import styles from './QuestionComponet.module.css'
import Link from 'next/link';
const QuestionComponent = ({qn}) => {
    const [resData,setResData] = useState("")
    const [questions,setQuestions] = useState([])
    const [animate,setAnimate] = useState(false)
    const [q,setQ] = useState("")
    const [o1,setO1] = useState("")
    const [o2,setO2] = useState("")
    const [o3,setO3] = useState("")
    const [o4,setO4] = useState("")
    const [ans,setAns] = useState('')
    const handleQuestions=()=>{
        setAnimate(true)
        const data = {question:q,options:[o1,o2,o3,o4],answer:ans}
        // console.log(data)
        setQuestions(prev=>[...prev,data])
        // console.log(questions)
        setO1("")
        setO2("")
        setO3("")
        setO4("")
        setAns("")
        setQ("")
    }
    const handleTest=async()=>{
        const redata = await fetch("api/createquiz",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                questions
            })
        })
        console.log( "this is " , questions)
        const data =await  redata.json()
        // const data = JSON.stringify(redata)
        console.log(data)
        setResData(data)
    }
    return (
        <div className={`${styles.container}`}>
            <div className={animate&&styles.animated}>
            <div className={`${styles.question} ${styles.inputs}`}>{questions.length+1} . <input type='text' onChange={(e)=>{setQ(e.target.value);setAnimate(false)}} value={q} placeholder='Write Your Question Here.'/></div>
            <div className={`${styles.options} ${styles.inputs}`}>A . <input  type='text' onChange={(e)=>setO1(e.target.value)} value={o1}  placeholder='GIve options' /></div>
            <div className={`${styles.options} ${styles.inputs}`}>B . <input  type='text' onChange={(e)=>setO2(e.target.value)} value={o2} placeholder='GIve options' /></div>
            <div className={`${styles.options} ${styles.inputs}`}>C . <input  type='text' onChange={(e)=>setO3(e.target.value)} value={o3} placeholder='GIve options' /></div>
            <div className={`${styles.options} ${styles.inputs}`}>D . <input  type='text' onChange={(e)=>setO4(e.target.value)} value={o4} placeholder='GIve options' /></div>
            <div className={`${styles.answer} ${styles.inputs}`}><input  type='text' onChange={(e)=>setAns(e.target.value)} value={ans}  placeholder='Give correct option' /></div>
            <div><button onClick={handleQuestions}>Add Question</button></div>
            <div><button onClick={handleTest}>That's it Share Test Link</button></div>
            <Link href={`takequiz/${resData?.data?._id}`}>take Quiz</Link>
        </div> 
        </div>
    );
}
 
export default QuestionComponent;