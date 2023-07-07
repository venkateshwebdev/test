import styles from './page.module.css'
import QuestionComponent from '@/Components/question/QuestionComponent';
const CreateQuiz = () => {
    return (
        <div className={styles.container}>
            <QuestionComponent />
        </div>
    );
}
 
export default CreateQuiz;