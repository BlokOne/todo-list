import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getUserInfo(data: any) {
  const docRef = doc(db, "Users", `${data.email}`);
  const docSnap = await getDoc(docRef);
  let userInfo = await docSnap.data();
  return userInfo
}