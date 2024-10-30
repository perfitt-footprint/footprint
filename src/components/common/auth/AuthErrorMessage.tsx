type TAuthErrorMessageProps = {
  message?: string;
  className?: string;
};

const AuthErrorMessage = ({ message, className }: TAuthErrorMessageProps) => {
  return <div className={`text-[13px] leading-4 text-[#EF4444] ${className}`}>{message}</div>;
};

export default AuthErrorMessage;
