// 사이드 메뉴

// 리스트 날짜별 분류
// 데이터 가져올 때 지난 7일까지만 가져오기
// 로그안 안되어있을 때 로그인 페이지 link
// 채팅 리스트 드래그 / 공유하기, 삭제하기
// 로그아웃
// 로그인/회원가입 링크 변경

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../service/firebase';
import { TChat } from '../../../types/db';
import { useAuthStore } from '../../../stores/auth.store';
import { useUserStore } from '../../../stores/user.store';
import SMChatList from './SMChatList';
import { menuIcon, plusIcon, userIcon } from '../../../assets/icons/icons';
import { getUserChat } from '../../../api/firebase/getUserChat';
import { getChat } from '../../../api/firebase/getChat';

type TSideMenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const SideMenu = ({ isMenuOpen, toggleMenu }: TSideMenuProps) => {
  const navigate = useNavigate();
  const { uid, isLoading } = useAuthStore();
  const { user, fetchUserInfo } = useUserStore();
  const [chatData, setChatData] = useState<TChat[]>();

  useEffect(() => {
    if (!isLoading && uid) {
      fetchUserInfo(uid);
      getChatList();
    }
  }, [isLoading, window.location.href]);

  // 채팅 리스트 가져오기
  const getChatList = async () => {
    const userChat = await getUserChat(uid);
    if (userChat) {
      const chatList = await Promise.all(
        userChat.map(async (chatId: string) => {
          return await getChat(chatId);
        })
      );
      setChatData(chatList);
    }
  };

  const handleLink = (link: string) => {
    toggleMenu();
    navigate(`${link}`);
  };

  const logout = () => {
    auth.signOut();
    handleLink('/chat');
  };

  return (
    <>
      <div
        className={`absolute inset-0 transition-opacity duration-300 z-40
          ${isMenuOpen ? 'bg-gray-600 opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={() => toggleMenu()}
      />
      <nav
        className={`absolute top-0 left-0 w-[280px] h-full p-4 flex flex-col z-50 rounded-r-lg bg-white
        transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          className='w-6 h-6'
          onClick={toggleMenu}
        >
          <img
            src={menuIcon}
            alt='Close Side Menu'
            className='w-full h-full object-cover'
          />
        </button>

        {/* 새 채팅 */}
        <button
          className='flex justify-center items-center w-fit h-[36px] mt-[34px]
        pl-[7px] pr-2.5 rounded-[99px] bg-[rgb(245,245,245)]'
          onClick={() => handleLink('/chat?mode=new')}
        >
          <img
            src={plusIcon}
            alt='New Chat'
            className='w-[18px] h-[18px]'
          />
          <div className='ml-[8px] text-[16px] leading-6 text-[#A1A1AA]'>새 채팅</div>
        </button>

        {/* 채팅 리스트 */}
        <div className='flex-1 overflow-scroll scrollbar-hide'>
          {chatData !== undefined && chatData.length > 0 && (
            <SMChatList
              date={'오늘'}
              chatlist={chatData}
              handleLink={handleLink}
            />
          )}
        </div>

        {/* bottom menu */}
        <div className='flex flex-col py-[9px] border-y-[1px] border-[#E4E4E7] text-[16px] leading-6'>
          <button
            className='py-[7px] text-left hover:text-[#A1A1AA]'
            onClick={() => handleLink('/mypage/item')}
          >
            좋아요 | 최근 본
          </button>
          <button
            className='py-[7px] text-left hover:text-[#A1A1AA]'
            onClick={() => handleLink('/shoerack')}
          >
            신발장
          </button>
          <button
            className='py-[7px] text-left hover:text-[#A1A1AA]'
            onClick={() => handleLink('/myfoot')}
          >
            내 발 정보
          </button>
        </div>

        {/* 로그인/회원가입 */}
        {!uid && (
          <button
            className='h-[62px] flex items-center text-[16px] leading-5 font-medium hover:text-[#A1A1AA]'
            onClick={() => handleLink('/chat?mode=sign')}
          >
            로그인
            <span className='mx-1.5'>/</span>
            회원가입
          </button>
        )}

        {/* 마이페이지/로그아웃 */}
        {uid && (
          <div className='flex justify-between items-center h-[62px]'>
            <button
              className='flex items-center gap-2 pr-5'
              onClick={() => handleLink('/mypage')}
            >
              <div className='w-[30px] h-[30px] rounded-full overflow-hidden'>
                <img
                  src={user?.profile ? user.profile : userIcon}
                  alt={`${user?.name} Profile`}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='max-w-[150px] text-[16px] leading-5 font-semibold truncate text-left'>{user?.name}</div>
            </button>
            <button
              className='text-[14px] text-[#AAAAAA] underline hover:text-[#F87171]'
              onClick={logout}
            >
              로그아웃
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default SideMenu;
