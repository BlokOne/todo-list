import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { store } from '../store';



export const removeTasks = async () => {
  const idUser = store.getState().user.id;
  let tasks: any[] = [];
  const q = query(collection(db, idUser), where("state", "==", "UnActive"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tasks.push(doc.data());
  });
  tasks.forEach((value) => {
    const { id } = value;
    setDoc(doc(db, idUser, `${id}`), {
      state: "Remove",
    });
  })

}



