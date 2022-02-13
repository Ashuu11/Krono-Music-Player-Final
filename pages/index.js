import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashBoard from '../components/DashBoard';
import Loader from '../components/Loader';


export default function Home() {
  
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  // Loading animation...
  if (status === "loading") {
    return <Loader />;
  }
  
  return (
    <div className="">
      <Head>
        <title>Krono Music Player</title>
        <link rel="icon" href="/flavi.ico" />
      </Head>
      <DashBoard/>
    </div>
  )
}
