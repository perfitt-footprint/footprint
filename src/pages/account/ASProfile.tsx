// 내 정보 수정

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TUser } from '../../types/db';
import { TUserInfo } from '../../types/sign';
import { useAuthStore } from '../../stores/auth.store';
import { useUserStore } from '../../stores/user.store';
import AuthContainer from '../../components/common/auth/AuthContainer';
import SUInfoBasic from '../../components/contents/sign/signup/SUInfoBasic';
import SUInfoSize from '../../components/contents/sign/signup/SUInfoSize';

function ASProfile() {
  const navigate = useNavigate();
  const { uid, isLoading } = useAuthStore();
  const { user, upsertUserInfo } = useUserStore();
  const methods = useForm<TUserInfo>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      gender: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      sizeType: '',
      size: '',
    },
  });

  const setUserData = (userData: TUser) => {
    methods.setValue('email', userData.email || '');
    methods.setValue('name', userData.name || '');
    methods.setValue('gender', userData.gender || '');
    methods.setValue('birthYear', userData.birth?.year + '년' || '');
    methods.setValue('birthMonth', userData.birth?.month + '월' || '');
    methods.setValue('birthDay', userData.birth?.day + '일' || '');
    methods.setValue('sizeType', (userData.size as string).match(/\D+/g)?.[0] || '');
    methods.setValue('size', userData.size || '');
    methods.setValue('profile', userData.profile || '');
  };

  useEffect(() => {
    if (!isLoading && user) setUserData(user);
  }, [isLoading, user]);

  const handleSubmit = async (data: TUserInfo) => {
    try {
      const result = await upsertUserInfo(uid, data);
      if (result === 'success') {
        alert('수정 성공');
        navigate(-1);
      } else alert('수정 실패');
    } catch (error) {
      console.log('수정 실패: ', error);
    }
  };

  return (
    <AuthContainer
      title='내 정보 수정'
      methods={methods}
      handleSubmit={methods.handleSubmit(handleSubmit)}
      btnText='수정하기'
    >
      <SUInfoBasic emailSignUp={false} />
      <SUInfoSize edit />
    </AuthContainer>
  );
}

export default ASProfile;
