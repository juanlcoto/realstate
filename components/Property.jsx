import Link from 'next/link';
import Image from 'next/image';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/images/house.jpg';

const Property = ({property: {coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID}}) => {
  return (
    <div className='flex flex-wrap justify-center mx-auto mb-4 mt-4 border-2 border-stone-500 p-4'>
      <Link href={`/property/${externalID}`} passHref>
        <div className='flex flex-col items '>
          <div className='m-h-[200px] '>
            <Image src={coverPhoto ? coverPhoto.url : DefaultImage} width={400} height={260} />
          </div>
          <p className='text-lg'>
            {title.length > 30 ? `${title.substring(0,30)}...` : title}
          </p>
          <div className='full flex items-center justify-between'>
            <div className='flex items-center'>
              <span className='pr-3 text-green-400'>
                {isVerified && <GoVerified />}
              </span>
              <p className='font-bold text-lg'>
                AED { millify(price) } { rentFrequency && `${rentFrequency}` }
              </p>
            </div>
            <div>
              <Image className='rounded-full ' src={agency?.logo?.url} width={50} height={50}/>
            </div>
          </div>
          <div className='flex items-center p-1 justify-between w-[250px] text-blue-400'>
            {rooms}
            <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Property