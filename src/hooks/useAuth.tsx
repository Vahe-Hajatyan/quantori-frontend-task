'use client';
import { getMy, logout, refresh } from '@/redux/slices/authSlice';
import { TDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useAuth = () => {
  const { push } = useRouter(); 
  const dispatch = useDispatch<TDispatch>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (token && refreshToken) {
        dispatch(getMy(token))
          .unwrap()
          .catch(() => {
            dispatch(refresh(refreshToken))
              .unwrap()
              .catch(() => {
                dispatch(logout());
                push('/login');
              });
          });
      }
    }
  }, [dispatch, push]); 

  return {};
};

export default useAuth;
