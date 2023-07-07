"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css"
const ShareQuiz = () => {
    const [quizData,setQuizData] = useState()
    useEffect(()=>{
        localStorage.setItem("user","Nikhil")
        getQuizList()
    },[])
    const getQuizList= async()=>{
        const user = localStorage.getItem("user")
        const raw = await fetch("/api/getquiz",{method:"POST",headers:{"Content-Type": "application/json"},body:JSON.stringify(user)})
        const res = await raw.json()
        console.log(res)
        console.log(user)
    }
    return (
        <div className={styles.container}>
            
        </div>
    );
}
 
export default ShareQuiz;