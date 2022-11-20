import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Spinner from '../components/Spinner';

const SearchFilters = () => {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues)

    values.forEach((item) => {
      if(item.value && filterValues?.[item.name]) {
        query[item.name] = item.value
      }
    })

    router.push({ pathname: path, query: query });
  };

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <section className='bg-gray-100 p-4 flex justify-center flex-wrap'>
      {filters.map((filter) => (
        <div key={filter.queryName}>
          <select 
            onChange={(e) => searchProperties({[filter.queryName]: e.target.value})} 
            placeholder={filter.placeholder} 
            className='w-fit p-2'
          >
            {filter?.items.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className='flex flex-col'>
        <button
          onClick={() => setShowLocations(!showLocations)}
          className='border-2 border-gray-200 mt-2'
        >
          Search Location
        </button>
        {showLocations && (
          <div className='flex flex-col relative pt-2'>
            <input 
              placeholder='Type here'
              value={searchTerm}
              className='w-[300px] focus:border-gray-300'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== '' && (
              <span 
                className='absolute cursor-pointer right-0 top-3 z-40'
                onClick={() => setSearchTerm('')}
              >
                <MdCancel />
              </span>
            )}
            {loading && <Spinner />}
            {showLocations && (
              <div className='h-[300px] overflow-auto'>
                {locationData?.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => {
                      searchProperties({locationExternalIDs: location.externalID})
                      setShowLocations(false)
                      setSearchTerm(location.name)
                    }}
                  >
                    <span className='cursor-pointer p-2 border-b-2 border-gray-100 '>
                      {location.name}
                    </span>
                  </div>
                ))}
                {!loading && !locationData?.length && (
                  <div className='flex justify-center items-center flex-col mt-5 mb-5'>
                    <span className='text-xl mt-3 '></span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchFilters