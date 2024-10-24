import { ReactNode } from 'react';
import AuthErrorMessage from './AuthErrorMessage';

type TAuthInputFieldProps = React.ComponentProps<'label'> & {
  title?: string;
  children: ReactNode;
  errorMessage?: string;
};

const AuthInputField = (props: TAuthInputFieldProps) => {
  const { title, children, errorMessage, ...rest } = props;
  return (
    <div className='flex flex-col gap-1'>
      <label
        className='h-[17px] text-[14px] leading-[17px] font-semibold'
        {...rest}
      >
        {title}
      </label>
      {children}
      {errorMessage && <AuthErrorMessage message={errorMessage} />}
    </div>
  );
};

export default AuthInputField;
