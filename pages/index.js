import Head from 'next/head';
import Layout from '../components/layout';
import Profile from '../components/profile';
import { getPrefixes } from '../lib/prisma';
import { useUser } from '@auth0/nextjs-auth0/client';

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
  const { user, error, isLoading } = useUser();
  const userContext = {
    user: user, 
    error: error,
    isLoading: isLoading
  };

  return (
    <Layout userContext={userContext}>
      
      <Profile userContext={userContext} />
      <ul>
        {prefixes.map((prefix) => <li key={prefix.id}>{prefix.prefix}</li>)}
      </ul>
    </Layout>
  )
}
