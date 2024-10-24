import { useForm } from 'react-hook-form';
import AuthContainer from '../auth/form/AuthContainer';

type TPassword = {
  currentPassword: string;
  newPassword: string;
  checkNewPassword: string;
};

function ASPassword() {
  const methods = useForm<TPassword>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      checkNewPassword: '',
    },
  });
  const {
    formState: { errors },
  } = methods;

  const handleSubmit = async (data: TPassword) => {};

  return (
    <AuthContainer
      title='비밀번호 변경'
      methods={methods}
      handleSubmit={methods.handleSubmit(handleSubmit)}
      btnText='로그인'
    >
      <></>
    </AuthContainer>
  );
}

export default ASPassword;
