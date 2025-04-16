'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './supabaseConnect'; 

import Logout from './Logout'
import InteractiveBackground from './InteractiveBg';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login'); 
      } else {
        setUser(session.user); 
        setLoading(false);
      }
    };

    getSession();
  }, [router]);

  if (loading){
    return (
    <p className='w-full h-[100vh] flex justify-center content-center'>Loading...</p>
    );
  }

  console.log(user)

  if(user){
  return (
    <>
    <div className="p-4 w-full flex justify-between">
      <h1 className="text-xl">Welcome, {user?.user_metadata?.display_name}</h1>
      <Logout/>
    </div>
    <InteractiveBackground/>
    </>
  );
}
else{
  return(
  <>Please Login</>
  );
}
}
