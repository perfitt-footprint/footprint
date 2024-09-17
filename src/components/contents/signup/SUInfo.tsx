import { useState } from 'react';
import SUInput from './SUInput';
import SUSelect from './SUSelect';
import Button from '../../common/Button';
import SUIdetails from './SUIdetails';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { FormValues } from '../../../types/sign';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../../service/firebase';
import { useNavigate } from 'react-router-dom';
function SUInfo() {
  const [state, setState] = useState<'start' | 'end'>('start');
  const navigate = useNavigate();
  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      gender: '',
      year: '',
      month: '',
      day: '',
      usersize: '',
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = async (data: FormValues) => {
    console.log('최종 data:', data);
    // 제출 후 상태를 'end'로 변경
    setState('end');

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      alert('회원가입 성공');
      navigate('/signin'); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (e) {
      if (e instanceof Error) {
        // e가 Error 타입일 때만 message 속성에 접근 가능
        console.error('회원가입 실패:', e);
        alert(`회원가입 실패: ${e.message}`);
      } else {
        // Error가 아닌 경우 기본 오류 처리
        console.error('회원가입 실패:', e);
        alert('회원가입 실패: 알 수 없는 오류');
      }
    }
  };
  const yearList = Array.from({ length: 70 }, (_, i) => ({ key: i, value: `${i + 1955}년` }));
  const monthList = Array.from({ length: 12 }, (_, i) => ({ key: i, value: `${i + 1}월` }));
  const dayList = Array.from({ length: 31 }, (_, i) => ({ key: i, value: `${i + 1}일` }));

  const handleNextClick = () => {
    if (state === 'start') {
      handleSubmit(
        data => {
          console.log(data); // data를 사용할 수 있음
          setState('end'); // 상태를 'end'로 변경
        },
        errors => {
          console.log(errors); // 유효성 검사 오류를 처리
        }
      )();
    } else {
      handleSubmit(onSubmit)(); // 최종 폼 제출
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='rounded-t-lg p-4'>
        {state === 'start' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <Header title='회원가입' /> */}
            <div className='flex flex-col gap-4 mb-10'>
              <Controller
                name='email'
                control={control}
                rules={{
                  required: '이메일을 입력해 주세요',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                    message: '이메일 형식이 아닙니다.',
                  },
                }}
                render={({ field, fieldState }) => (
                  <SUInput
                    label='아이디'
                    className='px-4 py-3.5'
                    id='email'
                    {...field}
                    placeholder='이메일을 입력해 주세요'
                    isError={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                rules={{
                  required: { value: true, message: '비밀번호를 입력해주세요' },
                  minLength: { value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다' },
                }}
                render={({ field, fieldState }) => (
                  <SUInput
                    label='비밀번호'
                    className='px-4 py-3.5'
                    type='password'
                    id='password'
                    {...field}
                    placeholder='비밀번호를 입력해 주세요'
                    isError={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name='name'
                control={control}
                rules={{ required: { value: true, message: '이름을 입력해주세요' } }}
                render={({ field, fieldState }) => (
                  <SUInput
                    label='이름'
                    className='px-4 py-3.5'
                    type='text'
                    id='username'
                    {...field}
                    placeholder='이름을 입력해 주세요'
                    isError={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name='gender'
                control={control}
                rules={{ required: { value: true, message: '성별을 선택해 주세요' } }}
                defaultValue='' // 기본 값 설정
                render={({ field, fieldState }) => (
                  <SUSelect
                    label='성별'
                    optionData={[
                      { key: 'female', value: '여자' },
                      { key: 'male', value: '남자' },
                    ]}
                    className='w-full rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                    value={field.value}
                    onChange={field.onChange}
                    placeholder='성별을 선택해 주세요'
                    helperText={fieldState.error?.message || ''}
                  />
                )}
              />

              <div className='flex flex-row gap-1 '>
                <Controller
                  name='year'
                  control={control}
                  defaultValue=''
                  rules={{ required: { value: true, message: '연도를 선택해 주세요' } }}
                  render={({ field, fieldState }) => (
                    <SUSelect
                      label='생년월일'
                      optionData={yearList}
                      className='rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                      placeholder='년'
                      value={field.value}
                      onChange={field.onChange}
                      helperText={fieldState.error?.message || ''}
                    />
                  )}
                />
                <Controller
                  name='month'
                  control={control}
                  defaultValue=''
                  rules={{ required: { value: true, message: '월을 선택해 주세요' } }}
                  render={({ field, fieldState }) => (
                    <SUSelect
                      optionData={monthList}
                      className=' rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='월'
                      helperText={fieldState.error?.message || ''}
                    />
                  )}
                />
                <Controller
                  name='day'
                  control={control}
                  defaultValue=''
                  rules={{ required: { value: true, message: '일을 선택해 주세요' } }}
                  render={({ field, fieldState }) => (
                    <SUSelect
                      optionData={dayList}
                      className='rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='일'
                      helperText={fieldState.error?.message || ''}
                    />
                  )}
                />
              </div>
            </div>
          </form>
        ) : (
          <SUIdetails />
        )}
      </div>
      <Button onClick={handleNextClick}>{state === 'start' ? '다음' : '가입완료'}</Button>
    </FormProvider>
  );
}

export default SUInfo;