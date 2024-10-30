type TAuthSelectButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  isActive: boolean;
};

const AuthSelectButton = (props: TAuthSelectButtonProps) => {
  const { isActive, children, ...rest } = props;

  return (
    <button
      type='button'
      className={`h-11 flex-1 border border-[#E4E4E7] rounded text-[16px] leading-5 font-semibold
        ${isActive ? ' bg-[#E4E4E7]' : 'bg-white'}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default AuthSelectButton;
