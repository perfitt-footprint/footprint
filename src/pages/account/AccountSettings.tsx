// 개인정보 수정 / 비밀번호 변경 / 회원탈퇴

import { useNavigate, useParams } from 'react-router-dom';
import ASProfile from './ASProfile';
import ASPassword from './ASPassword';
import ASDelete from './ASDelete';

function AccountSettings() {
  const navigate = useNavigate();
  const { mode } = useParams();

  switch (mode) {
    case 'profile':
      return <ASProfile />;
    case 'password':
      return <ASPassword />;
    case 'delete':
      return <ASDelete />;
    default:
      navigate('/mypage');
  }
}

export default AccountSettings;
