"use client"
import Link from "next/link";
import styles from "./page.module.css"
import {GoTrophy} from 'react-icons/go'
import {PiNoteDuotone, PiPlusBold} from 'react-icons/pi'
import {FiLogOut, FiShare, FiShare2} from 'react-icons/fi'
import {BiHomeAlt2, BiPlusMedical} from 'react-icons/bi'
import { useEffect, useState } from "react";
const QuizBox = ({id})=>{
    const [user,setUser] = useState()
    useEffect(()=>{
        setUser(localStorage.getItem("user"))
    },[])
    return(
        <div className={styles.quizBox}>
        <div>Title of the quiz</div>
        <div className={styles.quizButtons}>
        <button onClick={()=>{
           navigator.clipboard.writeText(`http://localhost:3000/takequiz/${id}`);
        }}>Share Quiz</button>
            <Link href={`/user/dashboard/${id}`}><button>Show Results</button></Link>
        </div>
    </div>
    )
}
const User = () => {
    const[u,setU] = useState()
    const [quizData,setQuizData] = useState([])
    useEffect(()=>{
        getQuizList()
    },[])
    const getQuizList= async()=>{
        const user = localStorage.getItem("user")
        const raw = await fetch("/api/getquiz",{method:"POST",headers:{"Content-Type": "application/json"},body:JSON.stringify(user)})
        const res = await raw.json()
        console.log(res)
        console.log(user)
        setQuizData(res.data)
        setU(user)
    }
    console.log("thsi is " , quizData)
    return (
        <div className={styles.container}>
            <div className={styles.sectionTitle}>Hello {u}</div>
            <div className={styles.userDashboard}>
                <Link href={"/createquiz"}><div className={styles.buttons}><button><PiPlusBold  /> Create Quiz</button></div></Link>
                <div className={styles.hr}></div>
                <div className={styles.previousQuiz}>
                    <div className={styles.sectionTitle}>Previous Quizzes</div>
                    <div className={styles.quizContainer}>{quizData?.map((e)=><QuizBox id={e._id}  />)} </div>
                </div>
            </div>
        </div>
    );
}
 
export default User;