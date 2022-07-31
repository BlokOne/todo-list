import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { store } from "../store";
import { setTasks } from "../store/slices/userSlice";

type Task = {
  createAt: {
    nanoseconds: number,
    seconds: number
  },
  text: string;
  check: string,
  id: string,
  state: string
}


export async function useUpdate(id: string) {
  const idUser = store.getState().user.id;
  const q = query(collection(db, idUser), orderBy("createAt"));
  const querySnapshot = await getDocs(q);
  const tasks: any[] = [];
  querySnapshot.forEach((doc) => {
    tasks.push(doc.data())
  });
  store.dispatch(setTasks({
    // tasks: [...tasks]
  }))


}