export type TUserInfoBasic = {
  email: string;
  password: string;
};

export type TUserInfo = {
  name: string;
  gender: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  sizeType: string;
  size: string;
  profile?: string;
} & TUserInfoBasic;

export type TGoogleUser = {
  uid: string;
  token: string;
  email: string;
  name: string;
  profile: string;
};