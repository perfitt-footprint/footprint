import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useAuthStore } from '../stores/auth.store';
import { useUserStore } from '../stores/user.store';

function ProtectedLayout() {
  const navigate = useNavigate();
  const { uid, isLoading } = useAuthStore();
  const { user, fetchUserInfo } = useUserStore();

  useEffect(() => {
    if (!isLoading) {
      if (uid && !user) {
        const userData = fetchUserInfo(uid);
        if (!userData) {
          signOut(auth);
          navigate('/chat?mode=sign');
        }
      } else navigate('/chat?mode=sign');
    }
  }, [isLoading]);

  return <Outlet />;
}

export default ProtectedLayout;
