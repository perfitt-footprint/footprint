import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import Header from '../Header';
import Button from '../Button';
import AuthErrorMessage from './AuthErrorMessage';

type TAuthContainerProps = {
  title: string;
  methods: UseFormReturn<any>;
  formClassName?: string;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  children: ReactNode;
  errorField?: boolean;
  errorMessage?: string;
  btnText: string;
};

const AuthContainer = ({ errorField = true, ...props }: TAuthContainerProps) => {
  const { title, methods, formClassName, handleSubmit, children, errorMessage, btnText } = props;
  const location = useLocation();
  const isChat = location.pathname === '/chat';

  return (
    <FormProvider {...methods}>
      <div className='h-full flex flex-col'>
        <Header
          title={title}
          back={!isChat}
        />
        <form
          className={`w-full flex-1 p-4 flex flex-col gap-4 overflow-auto scrollbar-hide ${isChat && 'pt-0'}`}
          onSubmit={handleSubmit}
        >
          <div className={`flex-grow flex flex-col gap-4 overflow-auto scrollbar-hide ${formClassName}`}>
            {children}
          </div>
          <div className='px-1'>
            {errorField && (
              <AuthErrorMessage
                className='h-6 text-center'
                message={errorMessage}
              />
            )}
            <Button type='submit'>{btnText}</Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AuthContainer;
