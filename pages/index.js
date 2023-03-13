import Head from 'next/head';
import Layout from '../components/layout';
import { getPrefixes } from '../lib/prisma';


export async function getStaticProps( ) {
  
  console.log("getting static props");
  
  const prefixes = await getPrefixes();

  return {
      props: {
          prefixes,
      },
  };
}

export default function Home({prefixes}) {
  return (
    <Layout>
      <ul>
      {prefixes.map((prefix) => <li key={prefix.id}>{prefix.prefix}</li>)}
      </ul>
    </Layout>
  )
}
