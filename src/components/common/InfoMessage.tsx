import { ReactNode } from 'react';
import { infoIcon } from '../../assets/icons/icons';

const InfoMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-full p-4 flex gap-2 rounded-lg bg-blue-50'>
      <img
        src={infoIcon}
        alt='Infomation'
        className='w-6 h-6'
      />
      <div className='text-base text-blue-700'>{children}</div>
    </div>
  );
};

export default InfoMessage;
