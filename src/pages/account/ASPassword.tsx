// 비밀번호 변경

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { reauthenticateWithCredential, signOut, updatePassword } from 'firebase/auth';
import { EmailAuthProvider } from 'firebase/auth/web-extension';
import { auth } from '../../service/firebase';
import AuthContainer from '../../components/common/auth/AuthContainer';
import AuthInputField from '../../components/common/auth/AuthInputField';
import AuthInput from '../../components/common/auth/AuthInput';
import AuthErrorMessage from '../../components/common/auth/AuthErrorMessage';

type TPassword = {
  currentPassword: string;
  newPassword: string;
  checkNewPassword: string;
};

function ASPassword() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const methods = useForm<TPassword>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      checkNewPassword: '',
    },
  });
  const {
    control,
    formState: { errors },
    trigger,
  } = methods;

  useEffect(() => {
    if (user?.providerData.some(provider => provider.providerId === 'google.com')) navigate('/mypage');
  }, []);

  const [currentPWValue, newPWValue, checkNewPWValue] = useWatch({
    control,
    name: ['currentPassword', 'newPassword', 'checkNewPassword'],
  });

  useEffect(() => {
    if (currentPWValue) trigger('currentPassword');
    if (newPWValue) trigger('newPassword');
    if (checkNewPWValue) trigger('checkNewPassword');
  }, [currentPWValue, newPWValue, checkNewPWValue, trigger]);

  // 비밀번호 변경
  const handleSubmit = async (data: TPassword) => {
    const { currentPassword, newPassword } = data;
    if (user) {
      try {
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential); // 재인증
        await updatePassword(user, newPassword); // 비밀번호 변경
        alert('비밀번호가 변경되었습니다. 재로그인이 필요합니다.');
        await signOut(auth);
        navigate('/chat?mode=sign');
      } catch (error) {
        alert('비밀번호 변경 실패');
        console.log('비밀번호 변경 실패: ', error);
      }
    } else alert('비밀번호 변경 실패');
  };

  return (
    <AuthContainer
      title='비밀번호 변경'
      methods={methods}
      handleSubmit={methods.handleSubmit(handleSubmit)}
      btnText='변경하기'
    >
      {/* 현재 비밀번호 */}
      <AuthInputField
        title='현재 비밀번호'
        htmlFor='currentPassword'
        errorMessage={errors.currentPassword?.message as string}
      >
        <Controller
          name='currentPassword'
          control={control}
          rules={{ required: '* 현재 비밀번호를 입력해 주세요.' }}
          render={({ field }) => (
            <AuthInput
              type='password'
              {...field}
              id={field.name}
              placeholder='현재 비밀번호'
              onChange={e => field.onChange(e.target.value)}
              autoComplete='current-password'
            />
          )}
        />
      </AuthInputField>

      {/* 새로운 비밀번호 */}
      <AuthInputField
        title='새로운 비밀번호'
        htmlFor='newPassword'
        errorMessage={errors.checkNewPassword?.message as string}
      >
        <Controller
          name='newPassword'
          control={control}
          rules={{
            required: '* 새로운 비밀번호를 입력해 주세요.',
            minLength: {
              value: 8,
              message: '* 비밀번호는 최소 8자 이상이어야 합니다.',
            },
            maxLength: {
              value: 30,
              message: '* 비밀번호는 최대 30자 이하여야 합니다.',
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
              message: '* 영문 대소문자, 숫자, 특수문자를 포함하여야 합니다.',
            },
            validate: {
              isDifferent: value => {
                const currentPassword = methods.getValues('currentPassword');
                return value !== currentPassword || '* 새 비밀번호는 현재 비밀번호와 달라야 합니다.';
              },
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <AuthInput
                type='password'
                {...field}
                id={field.name}
                placeholder='새 비밀번호'
                onChange={e => field.onChange(e.target.value)}
                autoComplete='new-password'
              />
              <AuthErrorMessage
                message={fieldState.error?.message as string}
                className={fieldState.error ? 'mb-1' : ''}
              />
            </>
          )}
        />
        <Controller
          name='checkNewPassword'
          control={control}
          rules={{
            required: '* 새 비밀번호 확인란을 입력해 주세요.',
            validate: value => {
              const newPassword = methods.getValues('newPassword');
              return value === newPassword || '* 새 비밀번호와 일치해야 합니다.';
            },
          }}
          render={({ field }) => (
            <AuthInput
              type='password'
              {...field}
              id={field.name}
              placeholder='새 비밀번호 확인'
              onChange={e => field.onChange(e.target.value)}
              autoComplete='new-password'
            />
          )}
        />
      </AuthInputField>
    </AuthContainer>
  );
}

export default ASPassword;
