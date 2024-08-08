'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import useAuth from '@/hooks/useAuth'; // Importing the custom hook

export default function Home() {
  useAuth();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated, push]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <p className="text-2xl text-primary text-center ">Welcome To Home Page</p>
    </div>
  );
}
