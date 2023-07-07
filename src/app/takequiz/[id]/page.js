"use client"
import { useRouter } from 'next/router';
import styles from './page.module.css'
import { useEffect, useState } from "react";
const TakeQuiz = ({params}) => {
    const param = params
    const [player, setPlayer] = useState();
    const [pName,setPName] = useState("")
    const [answers,setAnswers] = useState([])
    const [qn,setQn] = useState(0)
    const [o1,setO1] = useState(false)
    const [o2,setO2] = useState(false)
    const [o3,setO3] = useState(false)
    const [o4,setO4] = useState(false)
    const data =[{question:"what is mean by mobile?",options:["movement","maximum","none of the above","all of the above"]},{question:"what is mean by Nike?",options:["Shoe","Sneaker","none of the above","all of the above"]}]
    const [animate,setAnimate] = useState(false);
    const [quizData,setQuizData] = useState()

    useEffect(()=>{
        const player = localStorage.getItem("player");
        if(player) setPlayer(player)
        getQuestions()
    }, [])
    const getQuestions  = async()=>{
        const raw = await fetch(`/api/takequiz/${param.id}`)
        const res = await raw.json()
        setQuizData(res.data.questions)
    }
    const submitQuestion = async()=>{
        setAnimate(true)
        setQn(prev=>prev+1)
        //
        const selectedAnswers = [];
        if(o1) selectedAnswers.push("a");
        if(o2) selectedAnswers.push("b");
        if(o3) selectedAnswers.push("c");
        if(o4) selectedAnswers.push("d");

        setAnswers(prev => [...prev, selectedAnswers])
        setO1("")
        setO2("")
        setO3("")
        setO4("")
    } 
    const handlePlayer = ()=>{
        localStorage.setItem("player",pName)
        const p = localStorage.getItem("player")
        setPlayer(p)
    }
    console.log("this is" , quizData)
     return (
        !player?
        <div className={`${styles.container}`}>
            <div>
            Full Name :
            <input className={styles.playerInput} onChange={(e)=>setPName(e.target.value)} value={pName} type='text' />
            </div>
            <button onClick={handlePlayer}>Go to Quiz</button>
        </div>

            :<div className={`${styles.container}`}>
            <div className={styles.navbar}><div>{player}</div><div className={styles.navButtons}><button>00:12</button><button onClick={()=>{setPlayer("");localStorage.setItem("player","")}}>Submit Quiz</button></div></div>
                <div className={animate&&styles.animated}>
                <div className={`${styles.question}`}>{qn+1} .{quizData?.[qn]?.question}</div>
                <div className={`${styles.options}`} onClick={()=>setAnimate(false)}> <input onChange={(e)=>{setO1(e.target.checked)}} checked={o1} type="checkbox"/> A . {quizData?.[qn]?.options[0]}</div>
                <div className={`${styles.options}`} onClick={()=>setAnimate(false)}> <input onChange={(e)=>{setO2(e.target.checked)}} checked={o2} type="checkbox"/> B . {quizData?.[qn]?.options[1]}</div>
                <div className={`${styles.options}`} onClick={()=>setAnimate(false)}> <input onChange={(e)=>{setO3(e.target.checked)}} checked={o3} type="checkbox"/> C . {quizData?.[qn]?.options[2]}</div>
                <div className={`${styles.options}`} onClick={()=>setAnimate(false)}> <input onChange={(e)=>{setO4(e.target.checked)}} checked={o4} type="checkbox"/> D . {quizData?.[qn]?.options[3]}</div>
                <div><button onClick={submitQuestion}>Next Question</button></div>
                <a>{answers}</a>
            </div> 
            </div>
        );
}
 
export default TakeQuiz;