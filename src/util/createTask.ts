import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase"



export const createTask = (task: string, state: string, userID: string) => {
  if (task !== '') {
    let taskText = task.trimStart();
    const idTask = `${Date.now()}${userID}`
    const newTask = doc(db, `${userID}`, idTask);
    setDoc(newTask, {
      id: idTask,
      text: taskText,
      state: state,
      createAt: serverTimestamp(),
    }, { merge: true });
  }
}