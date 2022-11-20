import { useContext } from 'react';
import { Icon } from '@chakra-ui/react';
import Image from 'next/image';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <div className='flex justify-center items-center mr-1'>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        className='text-2xl cursor-pointer'
        d={['none','none','none','block']}
      />
    </div>
  );
}

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <div className='flex justify-center items-center mr-1'>
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        className='text-2xl cursor-pointer'
        d={['none','none','none','block']}
    />
    </div>
  );
}

const ImageScrollbar = ({data}) => {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{ overflow: 'hidden' }} >
      {data.map((item) => (
        <div className='w-[910px] overflow-hidden p-1' itemId={item.id}>
          <Image placeholder="blur" blurDataURL={item.url} src={item.url} width={1000} height={500}  sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px" />
        </div>
      ))}
    </ScrollMenu>
  )
}

export default ImageScrollbar