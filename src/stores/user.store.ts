import { create } from "zustand";
import { TUser } from "../types/db";
import { TUserInfo } from "../types/sign";
import { upsertUser } from "../api/firebase/upsertUser";
import { getUser } from "../api/firebase/getUser";

export type TUserStore = {
  user: TUser | null;
  upsertUserInfo: (uid: string, userInfo: TUserInfo) => Promise<string>;
  fetchUserInfo: (uid: string) => TUser | null;
}

export const useUserStore = create<TUserStore>((set) => ({
  user: null,

  upsertUserInfo: async (uid: string, userInfo: TUserInfo) => {
    const data = await upsertUser(uid, userInfo);
    set({ user: data });
    return 'success';
  },

  fetchUserInfo: async (uid: string) => {
    const data = await getUser(uid);
    set({ user: data });
    return data;
  }
}))