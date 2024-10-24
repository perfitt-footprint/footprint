import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import SplashScreen from '../pages/SplashScreen';
import OnBoarding from '../pages/OnBoarding';
import Chat from '../pages/chat/Chat';
import SharedChat from '../pages/chat/SharedChat';
import SignIn from '../pages/sign/SignIn';
import SignUp from '../pages/sign/SignUp';
import MyFootInfo from '../pages/MyFootInfo';
import Bridge from '../pages/Bridge';
import ProtectedLayout from '../layout/ProtectedLayout';
import MyPage from '../pages/mypage/MyPage';
import MyItem from '../pages/mypage/MyItem';
import AccountSettings from '../pages/AccountSettings';
import ShoeRack from '../pages/shoerack/ShoeRack';
import ShoesReviewEdit from '../pages/shoerack/ShoesReviewEdit';
import ShoesReviewDetail from '../pages/shoerack/ShoesReviewDetail';
import ShoesSearch from '../pages/shoerack/ShoesSearch';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <SplashScreen />,
      },
      {
        path: '/onboarding',
        element: <OnBoarding />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/shared/:id',
        element: <SharedChat />,
      },
      {
        path: '/sign/in',
        element: <SignIn />,
      },
      {
        path: '/sign/up',
        element: <SignUp />,
      },
      {
        path: '/myfoot',
        element: <MyFootInfo />,
      },
      {
        path: '/bridge',
        element: <Bridge />,
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: '/mypage',
            element: <MyPage />,
          },
          {
            path: '/mypage/item',
            element: <MyItem />,
          },
          {
            path: '/account/settings/:mode',
            element: <AccountSettings />,
          },
          {
            path: '/shoerack',
            element: <ShoeRack />,
          },
          {
            path: '/shoerack/review/:mode',
            element: <ShoesReviewEdit />,
          },
          {
            path: '/shoerack/review',
            element: <ShoesReviewDetail />,
          },
          {
            path: '/shoerack/search',
            element: <ShoesSearch />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
