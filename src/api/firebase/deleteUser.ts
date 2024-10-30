import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../service/firebase";

export const deleteUser = async (uid: string) => {
  try {
    await deleteDoc(doc(db, 'user', uid));
    await deleteDoc(doc(db, 'userChat', uid));
    await deleteDoc(doc(db, 'likeProduct', uid));
    await deleteDoc(doc(db, 'likeBrand', uid));
    await deleteDoc(doc(db, 'latestProduct', uid));
    await deleteDoc(doc(db, 'shoeRack', uid));
    await deleteDoc(doc(db, 'search', uid));
    return 'success';
  } catch (error) {
    throw error;
  }
};