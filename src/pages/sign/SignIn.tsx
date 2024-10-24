// 이메일 로그인

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../service/firebase';
import { useSignStore } from '../../stores/sign.store';
import { TUserInfoBasic } from '../../types/sign';
import AuthContainer from '../../components/contents/auth/form/AuthContainer';
import AuthInputField from '../../components/contents/auth/form/AuthInputField';
import AuthInput from '../../components/contents/auth/form/AuthInput';

function SignIn() {
  const navigate = useNavigate();
  const { setSignSheetOpen } = useSignStore();
  const methods = useForm<TUserInfoBasic>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {
    control,
    formState: { errors },
  } = methods;
  const [errorMessage, setErrorMessage] = useState('');

  // 로그인
  const handleSubmit = async (data: TUserInfoBasic) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      if (user) {
        setSignSheetOpen(false);
        navigate('/chat?mode=start');
      }
    } catch (error: any) {
      console.log(error);
      handleErrorMessage(error.code);
    }
  };

  // error message
  const handleErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/invalid-email':
        setErrorMessage('* 유효하지 않은 이메일 주소입니다.');
        break;
      case 'auth/user-not-found':
        setErrorMessage('* 해당 이메일과 일치하는 계정을 찾을 수 없습니다.');
        break;
      case 'auth/wrong-password':
        setErrorMessage('* 잘못된 비밀번호입니다.');
        break;
      default:
        setErrorMessage('* 로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <AuthContainer
      title='로그인'
      methods={methods}
      handleSubmit={methods.handleSubmit(handleSubmit)}
      errorMessage={errorMessage}
      btnText='로그인'
    >
      <AuthInputField
        title='아이디'
        htmlFor='email'
        errorMessage={errors.email?.message}
      >
        <Controller
          name='email'
          control={control}
          rules={{ required: '* 이메일을 입력해 주세요' }}
          render={({ field }) => (
            <AuthInput
              type='email'
              {...field}
              id={field.name}
              placeholder='이메일을 입력해 주세요'
              onChange={e => field.onChange(e.target.value)}
              autoComplete='email'
            />
          )}
        />
      </AuthInputField>
      <AuthInputField
        title='비밀번호'
        htmlFor='password'
        errorMessage={errors.password?.message}
      >
        <Controller
          name='password'
          control={control}
          rules={{ required: '* 비밀번호를 입력해 주세요' }}
          render={({ field }) => (
            <AuthInput
              type='password'
              {...field}
              id={field.name}
              placeholder='비밀번호를 입력해 주세요'
              onChange={e => field.onChange(e.target.value)}
              autoComplete='current-password'
            />
          )}
        />
      </AuthInputField>
    </AuthContainer>
  );
}

export default SignIn;
