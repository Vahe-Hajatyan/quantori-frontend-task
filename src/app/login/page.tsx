'use client';
import { login } from '@/redux/slices/authSlice';
import { TDispatch } from '@/redux/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch<TDispatch>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ username: data.username, password: data.password }));
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      push('/');
    }
  }, [auth]);
  return (
    <div className="flex justify-center items-center h-lvh bg-[#EEEEEE]">
      <div className="xxs:w-[300px] xs:w-[350px] md:w-[400px] xxs:h-80 sm:h-96 bg-white xxs:rounded-2xl sm:rounded-none sm:rounded-s-2xl xxs:pt-8 xxs:pl-4 md:pt-12 md:pl-12">
        <h3 className="text-primary text-4xl mb-3 ml-3 font-bold">Login</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="relative flex flex-col mb-4">
              <label className="ml-3 text-xs" htmlFor="username">
                Username
              </label>
              <input
                required
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                type="text"
                id="username"
                placeholder="Enter Your UserName"
                className="w-11/12 h-11 border border-gray-400 rounded-2xl pl-10 pr-3 outline-none"
              />
              <Image
                className="absolute top-6 left-2"
                src={'/account.svg'}
                width={24}
                height={24}
                alt="account"
              />
            </div>
            <div className="relative flex flex-col mb-4">
              <label className="ml-3 text-xs" htmlFor="password">
                Password
              </label>
              <input
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter Your password"
                className="w-11/12 h-11 border border-gray-400 rounded-2xl pl-10 pr-3 outline-none"
              />
              <Image
                className="absolute top-6 left-2"
                src={'/lock.svg'}
                width={24}
                height={24}
                alt="lock"
              />
              <Image
                className="absolute top-6 right-10 "
                src={showPassword ? '/eyeon.svg' : '/eyeoff.svg'}
                width={24}
                height={24}
                alt="eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <button
              type="submit"
              className="w-11/12 h-10 bg-primary text-white font-bold rounded-xl"
            >
              Login
            </button>
            {auth.error && (
              <p className="text-red-500 text-xs text-center">{auth.error}</p>
            )}
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center px-3 w-96 h-96 xxs:hidden sm:flex bg-white rounded-e-2xl">
        <Image
          priority
          src={'/login.png'}
          alt="loginImg"
          width={571}
          height={422}
        />
      </div>
    </div>
  );
};
export default Login;
