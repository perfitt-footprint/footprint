import { doc, setDoc } from "firebase/firestore";
import { db } from "../../service/firebase";
import { TUserInfo } from "../../types/sign";

export const upsertUser = async (uid: string, userInfo: TUserInfo) => {
  try {
    const { password, birthYear, birthMonth, birthDay, sizeType, ...rest } = userInfo;
    const userData = {
      ...rest,
      birth: {
        year: parseInt(birthYear.slice(0, -1)),
        month: parseInt(birthMonth.slice(0, -1)),
        day: parseInt(birthDay.slice(0, -1)),
      },
    };
    await setDoc(doc(db, 'user', uid), userData);

    return userData;
  } catch (error) {
    throw error;
  }
};