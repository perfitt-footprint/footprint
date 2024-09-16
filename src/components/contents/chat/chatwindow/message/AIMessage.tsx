import ReactMarkdown from 'react-markdown';
import { perfittLogo } from '../../../../../assets/images/images';
import { IAIMessage } from '../../../../../types/chat';

const AIMessage = ({ text }: IAIMessage) => {
  return (
    <>
      <div className='flex text-sm leading-[22px] '>
        <div className='w-7 h-7'>
          <img
            src={perfittLogo}
            alt='perfitt-logo'
          />
        </div>
        <div className='pl-3 pt-1 pb-3 max-w-[300px] break-words'>
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};
export default AIMessage;
