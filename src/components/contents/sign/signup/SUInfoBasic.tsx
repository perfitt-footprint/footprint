import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import AuthInputField from '../../auth/form/AuthInputField';
import AuthInput from '../../auth/form/AuthInput';
import AuthSelect from '../../auth/form/AuthSelect';

function SUInfoBasic({ isGoogleUser }: { isGoogleUser: boolean }) {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const yearOptions = Array.from({ length: 70 }, (_, i) => ({ value: `${i + 1955}년`, label: `${i + 1955}년` }));
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({ value: `${i + 1}월`, label: `${i + 1}월` }));
  const dayOptions = Array.from({ length: 31 }, (_, i) => ({ value: `${i + 1}일`, label: `${i + 1}일` }));

  // 값 감지
  const [emailValue, passwordValue, nameValue] = useWatch({
    control,
    name: ['email', 'password', 'name'],
  });

  // 유효성 검사 트리거
  useEffect(() => {
    if (emailValue) trigger('email');
    if (passwordValue) trigger('password');
    if (nameValue) trigger('name');
  }, [emailValue, nameValue, passwordValue, trigger]);

  return (
    <>
      {/* 아이디 */}
      <AuthInputField
        title='아이디'
        htmlFor='email'
        errorMessage={errors.email?.message as string}
      >
        <Controller
          name='email'
          control={control}
          rules={{
            required: '* 이메일을 입력해 주세요',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
              message: '* 유효한 이메일 주소를 입력하세요.',
            },
          }}
          render={({ field }) => (
            <AuthInput
              type='email'
              {...field}
              id={field.name}
              placeholder='이메일을 입력해 주세요'
              onChange={e => field.onChange(e.target.value)}
              autoComplete='email'
              disabled={isGoogleUser}
            />
          )}
        />
      </AuthInputField>

      {/* 비밀번호 */}
      {!isGoogleUser && (
        <AuthInputField
          title='비밀번호'
          htmlFor='password'
          errorMessage={errors.password?.message as string}
        >
          <Controller
            name='password'
            control={control}
            rules={{
              required: '* 비밀번호를 입력해 주세요',
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
            }}
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
      )}

      {/* 이름 */}
      <AuthInputField
        title='이름'
        htmlFor='name'
        errorMessage={errors.name?.message as string}
      >
        <Controller
          name='name'
          control={control}
          rules={{
            required: '* 이름을 입력해 주세요',
            minLength: {
              value: 2,
              message: '* 이름은 최소 2자 이상이어야 합니다.',
            },
            maxLength: {
              value: 10,
              message: '* 이름은 최대 10자 이하여야 합니다.',
            },
            pattern: {
              value: /^[A-Za-z가-힣\s]+$/,
              message: '* 이름은 한글 또는 영어로만 입력해 주세요.',
            },
          }}
          render={({ field }) => (
            <AuthInput
              type='text'
              {...field}
              id={field.name}
              placeholder='이름을 입력해 주세요'
              onChange={e => field.onChange(e.target.value)}
            />
          )}
        />
      </AuthInputField>

      {/* 성별 */}
      <AuthInputField
        title='성별'
        htmlFor='gender'
        errorMessage={errors.gender?.message as string}
      >
        <Controller
          name='gender'
          control={control}
          rules={{ required: '* 성별을 선택해 주세요' }}
          render={({ field }) => (
            <AuthSelect
              {...field}
              id={field.name}
              options={[
                { value: '여성', label: '여성' },
                { value: '남성', label: '남성' },
              ]}
              placeholder='성별을 선택해 주세요'
              fieldChange={field.onChange}
            />
          )}
        />
      </AuthInputField>

      {/* 생년월일 */}
      <AuthInputField
        title='생년월일'
        htmlFor='birth'
        errorMessage={
          (errors.birthYear?.message as string) ||
          (errors.birthMonth?.message as string) ||
          (errors.birthDay?.message as string)
        }
      >
        <div className='flex gap-1'>
          <Controller
            name='birthYear'
            control={control}
            rules={{ required: '* 생년월일을 선택해 주세요.' }}
            render={({ field }) => (
              <AuthSelect
                {...field}
                id={field.name}
                options={yearOptions}
                placeholder='년'
                fieldChange={field.onChange}
              />
            )}
          />
          <Controller
            name='birthMonth'
            control={control}
            rules={{ required: '* 생년월일을 선택해 주세요.' }}
            render={({ field }) => (
              <AuthSelect
                {...field}
                id={field.name}
                options={monthOptions}
                placeholder='월'
                fieldChange={field.onChange}
              />
            )}
          />
          <Controller
            name='birthDay'
            control={control}
            rules={{ required: '* 생년월일을 선택해 주세요.' }}
            render={({ field }) => (
              <AuthSelect
                {...field}
                id={field.name}
                options={dayOptions}
                placeholder='일'
                fieldChange={field.onChange}
              />
            )}
          />
        </div>
      </AuthInputField>
    </>
  );
}

export default SUInfoBasic;
