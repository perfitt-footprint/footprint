import { doc, getDoc } from "firebase/firestore";
import { db } from "../../service/firebase";

export const getUser = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "user", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("해당 사용자의 문서가 없습니다.");
      return null;
    }
  } catch (error) {
    throw error;
  }
};