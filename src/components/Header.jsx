import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import User from './User';
import { Button } from '../components/ui';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';

export default function Header() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className='sticky top-0 flex justify-between border-b-2 p-3 bg-white z-10'>
      <Link to={'/'} className='flex items-center text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>

      <div className='flex items-center gap-4 font-bold'>
        <nav>
          <Link to={'/products'}>Products</Link>
        </nav>

        {user && (
          <Link to={'/carts'} className='text-3xl'>
            <CartStatus />
          </Link>
        )}
        {user?.isAdmin && (
          <Link to={'/products/new'} className='text-3xl'>
            <CiEdit />
          </Link>
        )}
        {user && <User user={user} />}
        {user ? (
          <Button text={'Logout'} onClick={logout} />
        ) : (
          <Button text={'Login'} onClick={login} />
        )}
      </div>
    </header>
  );
}
