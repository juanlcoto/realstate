import Link from "next/link";
import Image from "next/image";

import Layout from "../components/Layout";
import Property from '../components/Property'

import { baseUrl, fetchApi } from "../utils/fetchApi";

const Banner = ({ purpose,title1,title2,desc1,desc2,linkName,buttonText,imageUrl }) => (
  <div className="flex flex-wrap justify-center items-center">
    <Image src={imageUrl}width={500} height={300} alt='Banner' />
    <div className="p-5">
      <p className="text-gray-500 font-sm font-medium ">{purpose}</p>
      <p className="text-gray-500 font-3xl  font-bold ">{title1}<br />{title2}</p>
      <p className="text-gray-700 font-lg pt-3 pb-3 ">{desc1}<br />{desc2}</p>
      <button className="font-xl bg-blue-300 text-white p-2 rounded-md">
        <Link href={linkName}>{buttonText}</Link>
      </button>
    </div>
  </div>
)

const Home = ({ propertiesForSale,propertiesForRent }) => {

  const title = "Inicio"

  return (
    <Layout title={title}>
      <Banner 
        purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='Everyone'
        desc1=' Explore from Apartments, builder floors, villas'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'

      />
      <div className="flex flex-wrap">
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </div>
      <Banner 
        purpose='BUY A HOME'
        title1=' Find, Buy & Own Your'
        title2='Dream Home'
        desc1=' Explore from Apartments, land, builder floors,'
        desc2=' villas and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008' 
      />
      <div className="flex flex-wrap">
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </div>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits
    }
  }
}
