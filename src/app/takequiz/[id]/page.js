"use client"
import { useRouter } from 'next/router';
import styles from './page.module.css'
import { useEffect, useState } from "react";
import { BiWorld } from 'react-icons/bi';
const TakeQuiz = ({params}) => {
    const param = params
    const [isModal,setIsModal] = useState(false)
    const [correct,setCorrect] = useState(0)
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
        setPName("")
    }
    const checkCorrectAnswers = (expected, given) => {
        if(expected.length !== given.length) return false;
       for(let i = 0; i < expected.length; i++) {
        if(expected[i] !== given[i]) return false;
       }
       return true;
    }
    const submitQuiz = async()=>{
        answers.map((e,i)=>{
            console.log(e , quizData[i].answer)
            if(checkCorrectAnswers(quizData[i].answer, e)){
                setCorrect(prev=>prev+1)
            }
        })
        setIsModal(prev=>!prev)
        sendData()
    }
    const sendData = async()=>{
        const finalData = {name:player,result:correct,id:param.id}
        console.log(finalData)
        const result = await fetch("/api/getresult",{method:"POST",headers:{"Content-Type": "application/json"},body:JSON.stringify({finalData})})
        const finalscore = await result.json()
        console.log("YAAAAAAAAAAAAAAAAY....! you Got " , finalscore +"/"+quizData.length)
    }
    console.log("this is" , quizData)
    console.log("correct answers" , correct)
    console.log("answers are", answers)
    const done = ()=>{
        setPlayer("");
        localStorage.setItem("player","")
    }
     return (
        !player?
        <div className={`${styles.container}`}>
            <div className={styles.playerLogin}>
            Full Name*
            <input className={styles.playerInput} onChange={(e)=>setPName(e.target.value)} value={pName} type='text' placeholder='example' />
            <button onClick={handlePlayer}>Go to Quiz</button>
            </div>
        </div>

            :<div className={`${styles.container}`}>
            {isModal&&<div className={styles.modal}><BiWorld />{correct}<button onClick={done}>Done</button></div>}
            <div className={styles.navbar}><div>{player}</div><div className={styles.navButtons}><button onClick={submitQuiz}>Submit Quiz</button></div></div>
                <div className={animate&&styles.animated}>
                    <div className={styles.anm}>
                <div className={`${styles.question} ${styles.options}`}>{qn+1} .{quizData?.[qn]?.question}</div>
                <div className={`${styles.options}`} onClick={()=>setAnimate(false)}> <div className={!o1?styles.checkBox:styles.checkedBox} onClick={()=>{setO1(prev=>!prev)}}> </div>{quizData?.[qn]?.options[0]}</div>
                <div className={`${styles.options}`} onClick={()=>setAnimate(false)}> <div className={!o2?styles.checkBox:styles.checkedBox} onClick={()=>{setO2(prev=>!prev)}}> </div>{quizData?.[qn]?.options[1]}</div>
                <div className={`${styles.options}`} onClick={()=>setAnimate(false)}> <div className={!o3?styles.checkBox:styles.checkedBox} onClick={()=>{setO3(prev=>!prev)}}> </div>{quizData?.[qn]?.options[2]}</div>
                <div className={`${styles.options}`} onClick={()=>setAnimate(false)}> <div className={!o4?styles.checkBox:styles.checkedBox} onClick={()=>{setO4(prev=>!prev)}}> </div>{quizData?.[qn]?.options[3]}</div>
                <div><button onClick={submitQuestion}>Next Question</button></div>
                </div>
            </div> 
            </div>
        );
}
 
export default TakeQuiz;