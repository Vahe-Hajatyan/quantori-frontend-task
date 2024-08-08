'use client';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const about = () => {
  useAuth();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated]);
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-2xl text-primary text-center">
        Welcome To About Page
      </p>
      
    </div>
  );
};
export default about;
