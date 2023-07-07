"use client"
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
export default function Home() {
  const [user,setUser] = useState("")
  const [check,setCheck]  = useState(false)
  const handleUser = ()=>{
    setCheck(prev=>!prev)
    localStorage.setItem("user",user)
}
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <div className={`${styles.about} ${styles.sub} ${styles.title}`}>Quizzy</div>
      <div className={`${styles.loginForm} ${styles.sub}`}>
        <div className={styles.formContainer}>
          <form>
            <label>UserName</label>
            <input type='text' placeholder='example' onChange={(e)=>setUser(e.target.value)}  value={user}/>
            <div className='flex items-center gap-[10px]'><div className={!check?styles.checkBox:styles.checkedBox} onClick={handleUser}></div>Accept terms & conditions</div>
            {!check?<button className={styles.disabled}>login</button>:<Link href={"/user"}><button className={styles.b}>Login</button></Link>}
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}
