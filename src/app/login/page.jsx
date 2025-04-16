
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabaseConnect';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setloader] = useState(0)

  const router = useRouter();

  const LogInUser = async (e) => {
    setloader(1);
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message)
        setloader(0)
      } else {
        router.push('/');
        setloader(0)
      }
      console.log(data)

    } catch (error) {
      alert(error.message);
      setloader(0)

    }

  };


  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-white">
            Log In
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
            Or
            <Link href='/signup'
              className="font-medium text-blue-500 hover:underline focus:outline-none focus:underline transition ease-in-out duration-150">

              &nbsp;Sign Up to create an account
            </Link>
          </p>
        </div>


        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form>
              <div>
                <label htmlFor="email" className="mt-6 block text-sm font-medium leading-5  text-white">Email address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input id="email" onChange={e => setEmail(e.target.value)} name="email" placeholder="enter your email" type="email" required="" value={email} className="focus:bg-gray-900 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-white transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="password" className="block text-sm font-medium leading-5 text-white">Password</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input id="password" onChange={e => setPassword(e.target.value)} placeholder='enter your password' value={password} name="password" type="password" required="" className="text-white focus:bg-gray-900 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button onClick={LogInUser} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none hover:cursor-pointer focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                    {loader ? "Loading..." : "Log In"}
                  </button>
                </span>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}