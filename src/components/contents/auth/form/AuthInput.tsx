import { forwardRef } from 'react';

type TAuthInputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & {
  type: 'text' | 'password' | 'email' | 'number' | 'date';
  className?: string;
};

const AuthInput = forwardRef<HTMLInputElement, TAuthInputProps>(({ className, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-4 py-3.5 border border-[#E4E4E7] rounded
        text-[16px] leading-5 font-semibold placeholder-[#A1A1AA] ${className}`}
      {...rest}
    />
  );
});

AuthInput.displayName = 'AuthInput';

export default AuthInput;
