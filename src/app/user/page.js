import Link from "next/link";
import styles from "./page.module.css"
import {GoTrophy} from 'react-icons/go'
import {PiNoteDuotone} from 'react-icons/pi'
import {FiLogOut, FiShare, FiShare2} from 'react-icons/fi'
import {BiHomeAlt2} from 'react-icons/bi'
const User = () => {
    return (
        <div className={styles.container}>
            <div className={styles.userDetails}><h1>FirstName LastName</h1></div>
            <div className={styles.userDashboard}>
                <div className={styles.dashboardOptions}><Link href={"/createquiz"}><div className={styles.buttons}><div> <GoTrophy /> Create Quiz</div></div></Link></div>
                <div className={styles.dashboardOptions}><Link href={"/sharequiz"}><div className={styles.buttons}><div><FiShare2/> Share Quiz </div></div></Link></div>
                <div className={styles.dashboardOptions}><div className={styles.buttons}><div><PiNoteDuotone/>See Submissions</div></div></div>
                <div className={styles.dashboardOptions}><div className={styles.buttons}><div><FiLogOut />Logout</div></div></div>
            </div>
        </div>
    );
}
 
export default User;