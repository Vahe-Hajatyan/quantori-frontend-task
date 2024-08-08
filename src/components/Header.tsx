'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { TDispatch } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';

const Header = () => {
  const { push } = useRouter();
  const path = usePathname().slice(1);
  const auth = useSelector((state: any) => state.auth);
  const [activePage, setActivePage] = useState(path);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch<TDispatch>();

  const loginOrLogout = () => {
    if (auth.isAuthenticated) {
      dispatch(logout());
      push('/login');
    } else {
      push('/login');
    }
  };
  useEffect(() => {
    setActivePage(path);
  }, [path]);
  console.log(auth);
  return (
    <nav className="h-14">
      <div className="flex items-center justify-around h-full">
        <div className="flex items-center">
          <Image
            priority
            src={auth.user.image ? auth.user.image : '/person.svg'}
            width={35}
            height={35}
            alt="person"
          />
          <div className="ml-4 xxs:hidden ss:block">
            <Link
              href={'/'}
              className={`p-2 ${activePage === '' ? 'text-primary' : ''}`}
              onClick={() => setActivePage('home')}
            >
              home
            </Link>
            <Link
              href={'/contact'}
              className={`p-2 ${
                activePage === 'contact' ? 'text-primary' : ''
              }`}
              onClick={() => setActivePage('contact')}
            >
              contact
            </Link>
            <Link
              href={'/about'}
              className={`p-2 ${activePage === 'about' ? 'text-primary' : ''}`}
              onClick={() => setActivePage('about')}
            >
              about
            </Link>
          </div>
        </div>
        <div className="relative sm:hidden ">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-primary text-white px-3 py-1 rounded-lg ml-3 ss:hidden xxs:block"
          >
            <p className="transform rotate-90">|||</p>
          </button>
          {showMenu && (
            <div className="absolute w-24 top-[50px] -right-8 bg-white  border border-[#E5E5E5] rounded-xl ss:hidden xxs:flex flex-col">
              <Link
                href={'/'}
                className={`p-2 ${activePage === '' ? 'text-primary' : ''}`}
                onClick={() => {
                  setShowMenu(false);
                  setActivePage('home');
                }}
              >
                home
              </Link>
              <hr />
              <Link
                href={'/contact'}
                className={`p-2 ${
                  activePage === 'contact' ? 'text-primary' : ''
                }`}
                onClick={() => {
                  setShowMenu(false);
                  setActivePage('contact');
                }}
              >
                contact
              </Link>
              <hr />
              <Link
                href={'/about'}
                className={`p-2 ${
                  activePage === 'about' ? 'text-primary' : ''
                }`}
                onClick={() => {
                  setShowMenu(false);
                  setActivePage('about');
                }}
              >
                about
              </Link>
              <hr />
              <p onClick={loginOrLogout} className="p-2">
                {auth.isAuthenticated ? 'Logout' : 'Login'}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={loginOrLogout}
          className="bg-primary text-white px-3 py-1 rounded-lg ml-3 xxs:hidden ss:block"
        >
          {auth.isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};
export default Header;
