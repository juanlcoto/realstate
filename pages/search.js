import Layout from '../components/Layout'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { BsFilter } from 'react-icons/bs';

import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import { baseUrl, fetchApi } from '../utils/fetchApi';
/* import noresult from '../assets/images/noresult.svg' */


const search = ({ properties }) =>{

  const [searchFilters,setSearchFilters] = useState(false)
  const router = useRouter()
  
  return (
    <Layout title='Search'>
      <section 
        className='flex cursor-pointer bg-gray-100 border-b-2 border-gray-200 p-2 font-semibold text-lg justify-center items-center'
        onClick={() => setSearchFilters(!searchFilters)}
        >
        <p className='flex items-center'>Searh property by filters { <BsFilter /> } </p>
      </section>
      { searchFilters && <SearchFilters /> }
      <p className='p-4 text-2xl text-center font-bold'>Properties { router.query.purpose }</p>
      <div className='flex flex-wrap'> {properties.map((property) => <Property property={property} key={property.id} />)} </div>
      {properties.length === 0 && (
        <p>No results</p>
      )}
    </Layout>
  )
}

export default search

export async function getServerSideProps({query}) {
  const purpose = query.purpose || 'for-rent'
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';
  
  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  return {
    props: {
      properties: data?.hits
    }
  }
}