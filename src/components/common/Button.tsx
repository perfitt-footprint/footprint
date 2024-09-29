type TButtonProps = React.ComponentPropsWithoutRef<'button'>;

const Button = (props: TButtonProps) => {
  const { className, children, ...rest } = props;

  return (
    <button
      className={`${className} w-full h-[56px] rounded bg-black text-base text-white font-semibold`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
