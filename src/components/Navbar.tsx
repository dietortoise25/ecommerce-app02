// components/Navbar.tsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { cartAtom, userAtom } from '../store/store';

import { CartItem } from '../utils/types';
import {
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineHome,
  HiOutlineCollection,
  HiShoppingBag
} from 'react-icons/hi';
import classNames from 'classnames';

export default function Navbar() {
  const [cart] = useAtom(cartAtom);
  const [user, setUser] = useAtom(userAtom);

  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 左侧导航 */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center text-xl font-bold text-gray-800"
            >
              <HiShoppingBag className="mr-2 h-6 w-6" />
              A-Shop
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={classNames(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium',
                  {
                    'bg-gray-900 text-white': location.pathname === '/',
                    'text-gray-600 hover:bg-gray-100 hover:text-gray-900': location.pathname !== '/'
                  }
                )}
              >
                <HiOutlineHome className="mr-1 h-5 w-5" />
                Home
              </Link>
              <Link
                to="/products"
                className={classNames(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium',
                  {
                    'bg-gray-900 text-white': location.pathname === '/products',
                    'text-gray-600 hover:bg-gray-100 hover:text-gray-900': location.pathname !== '/products'
                  }
                )}
              >
                <HiOutlineCollection className="mr-1 h-5 w-5" />
                Products
              </Link>
              <Link
                to="/profile"
                className={classNames(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium',
                  {
                    'bg-gray-900 text-white': location.pathname === "/profile",
                    'text-gray-600 hover:bg-gray-100 hover:text-gray-900': location.pathname !== "/profile"
                  }
                )}
              >
                <HiOutlineCollection className="mr-1 h-5 w-5" />
                Profile(鉴权测试)
              </Link>
            </div>
          </div>AuthGar

          {/* 右侧导航 */}
          <div className="flex items-center space-x-4">
            {/* 购物车 */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <HiOutlineShoppingCart className="h-6 w-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* 用户状态 */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="md:inline text-gray-600">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                >
                  <HiOutlineUser className="h-5 w-5" />
                  <span className="ml-1">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <HiOutlineUser className="mr-2 h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}