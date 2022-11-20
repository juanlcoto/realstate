import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import Image from "next/image";

import { baseUrl, fetchApi } from "../../utils/fetchApi";
import ImageScrollbar from "../../components/ImageScrollbar";
import Layout from "../../components/Layout";

const propertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <Layout>
    <section className="m-w-[1000px] mx-auto p-4 ">
      {photos && <ImageScrollbar data={photos} />}
    </section>
    <section className="flex justify-between w-full p-6">
      <div className="flex pt-2 items-center justify-between w-2/4">
        <span className={isVerified ? 'block' : 'hidden'}>
          {isVerified && <GoVerified className="pr-3 text-green-400" />}
        </span>
        <p className="font-bold text-lg">
          AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
        </p>
        <span>
          <Image width={100} height={100} src={agency?.logo?.url} />
        </span>
      </div>
      <div className="flex items-center p-1 justify-between w-[250px] text-blue-400">
        {rooms}<FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
      </div>
    </section>
    <section className="mt-2">
      <p className="text-lg mb-2 font-bold">
        {title}
      </p>
      <p className="leading-8 text-gray-600 ">
        {description}
      </p>
    </section>
    <section className="flex flex-wrap uppercase justify-between">
      <div className="flex justify-between w-[400px] border-b-2 boer-gray-100 p-3">
        <p>Type</p>
        <p className="font-bold">{type}</p>
      </div>
      <div className="flex justify-between w-[400px] border-b-2 boer-gray-100 p-3">
        <p>Purpose</p>
        <p className="font-bold">{purpose}</p>
      </div>
      {furnishingStatus && (
        <div className="flex justify-between w-[400px] border-b-2 border-gray-100 p-3">
          <p>Furnishing Status</p>
          <p className="font-bold">{furnishingStatus}</p>
        </div>
      )}
    </section>
    <section>
      {amenities.length && <p className="text-2xl font-bold mt-5">Facilites:</p>}
        <div className="flex flex-wrap">
          {amenities?.map((item) => (
              item?.amenities?.map((amenity) => (
                <p key={amenity.text} className="font-bold text-blue-400 text-lg p-2 bg-gray-200 m-1 rounded-sm">
                  {amenity.text}
                </p>
              ))
          ))}
        </div>
    </section>
  </Layout>
);

export default propertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
