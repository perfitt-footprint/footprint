import { ReactNode } from 'react';
import Header from '../../common/Header';
import Button from '../../common/Button';

type TSignContainerProps = {
  title: string;
  formClassName?: string;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  children: ReactNode;
  errorMessage?: string;
  btnText: string;
};

const SignContainer = (props: TSignContainerProps) => {
  const { title, formClassName, handleSubmit, children, errorMessage, btnText } = props;

  return (
    <div className='h-full flex flex-col'>
      <Header title={title} />
      <form
        className='w-full flex-1 p-4 pt-0 flex flex-col gap-4 overflow-auto scrollbar-hide'
        onSubmit={handleSubmit}
      >
        <div className={`flex-grow flex flex-col gap-4 overflow-auto scrollbar-hide ${formClassName}`}>{children}</div>
        <div className='px-1'>
          <div className='h-6 text-[13px] leading-4 text-[#EF4444] text-center'>{errorMessage}</div>
          <Button type='submit'>{btnText}</Button>
        </div>
      </form>
    </div>
  );
};

export default SignContainer;