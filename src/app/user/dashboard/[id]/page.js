"use client"
import { useEffect, useState } from "react";
import styles from './page.module.css'
import { BiDownArrow } from "react-icons/bi";
const Dashboard = (params) => {
    console.log(params)
    const [user,setUser] = useState("")
    const [pageData,setPageData] = useState()
    const [part,setPart] = useState(false)
    const [ques,setQues] = useState(false)
    useEffect(()=>{
        setUser(localStorage.getItem("user"))
    },[])
    useEffect(()=>{
        getData();
    }, [user])
    const getData = async()=>{
        const raw = await fetch(`/api/dashboard/${params.params.id}`)
        const res = await raw.json()
        setPageData(res)
        console.log(pageData)
    }
    console.log(pageData)
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.box} onClick={()=>setPart(prev=>!prev)}>Participants<BiDownArrow /></div>
                <div className={!part?styles.particpantsBox:styles.hide}>
                    {pageData?.[0].participants.map((e)=><div className={styles.theBox}>{e.name} - {e.score}</div>)}
                </div> 
                <div className={styles.box} onClick={()=>setQues(prev=>!prev)}>Questions<BiDownArrow /></div>
                <div className={!ques?styles.particpantsBox:styles.hide}>
                {pageData?.[0].questions.map((e,i)=><div className={styles.theBox} >{i+1} . {e.question}</div>)}
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;