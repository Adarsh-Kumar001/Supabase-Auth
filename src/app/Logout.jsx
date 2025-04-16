'use client';

import { useRouter } from 'next/navigation';
import { supabase } from './supabaseConnect';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
        if(confirm("Are You Sure? You will be logged out!")){
            router.push('/login');
        } 
    }
  };

  return (
    
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-150 hover:cursor-pointer"
    >
      Logout
    </button>

  );
}
