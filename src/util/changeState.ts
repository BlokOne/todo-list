import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

type Change = {
  createAt: {
    nanoseconds: number,
    seconds: number
  },
  idTask: string,
  text: string;
  check: string,
  id: string
}

export const changeStatus = ({ createAt, idTask, text, check, id }: Change) => {
  let changeCheck = '';
  if (check === "Active") {
    changeCheck = "UnActive"
  } else {
    changeCheck = "Active"
  }
  setDoc(doc(db, `${id}`, `${idTask}`), {
    id: idTask,
    text: text,
    state: changeCheck,
    createAt: createAt
  });
}
