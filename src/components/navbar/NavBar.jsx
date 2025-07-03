import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { useNavigate, Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import {useDispatch, useSelector} from 'react-redux';
import { setSearchQuery, clearSearchQuery } from '../../redux/searchSlice';
export const NavBar = () => {
  const [showUser, setShowUser] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleSearchChange = (e) => {
      dispatch(setSearchQuery(e.target.value)); 
    };

  const logout = () => {
    localStorage.clear('users');
    navigate("/sign-in");
  }
  return (
    <>
      <nav className="w-full px-4 py-5 fixed top-0 z-50 bg-[var(--background-color)] flex items-center justify-between text-[var(--background-light)]">
        <Link
          className="text-2xl md:text-3xl lg:text-5xl font-semibold text-[var(--primary-color)] ms-7 flex gap-2"
          to="/"
          onClick={() => dispatch(clearSearchQuery())}
        >
          <img src="/images/logo.svg" alt="logo" className="w-5 sm:w-7 md:w-10 lg:w-12 xl:w-13 h-auto" />

          NovaCare
        </Link>

        <form className="my-2">
          <div className="hidden md:flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 h-12 w-100">
            <span className="text-[var(--text-secondary)] pr-2">
              <FiSearch size={18} />
            </span>
            <input
              type="text"
              className="outline-none border-none focus:ring-0 text-sm text-[var(--text-primary)]"
              placeholder="Search..."
              onChange={(e) => handleSearchChange(e)}
            />
          </div>
        </form>

        <div className="hidden md:flex relative me-10 text-[var(--primary-color)] cursor-pointer transition-all duration-300 hover:border-[#085a9d] hover:scale-110">
          <FaUser size={25} onClick={() => setShowUser(!showUser)} />

        </div>
        <div className="flex md:hidden justify-end me-0 lg:me-3 group">
          {!menu ? <FaBars
            size={25} onClick={() => setMenu(!menu)}
            className="inline text-xl cursor-pointer text-[var(--text-primary)]" aria-label="Open mobile menu"
          /> :
            <MdClose size={30} onClick={() => setMenu(!menu)}
              className="inline text-3xl cursor-pointer text-[var(--text-primary)]" aria-label="Close mobile menu" />}
        </div>
         {menu && (
        <div className="fixed top-[4.2rem] right-0 w-full bg-white px-6 py-4 shadow-md md:hidden z-50 space-y-4 transition-all">
          <form>
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full border border-gray-300">
              <FiSearch size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                className="flex-grow outline-none text-sm text-gray-800 bg-transparent"
                placeholder="Search..."
                onChange={(e) => handleSearchChange(e)}

              />
            </div>
          </form>
          <div onClick={() => { navigate('/users'); setMenu(false); }} className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-[var(--text-primary)]">
            Users
          </div>
          <div onClick={() => { logout(); setMenu(false); }} className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-[var(--text-primary)]">
            Logout
          </div>
        </div>
      )}
      </nav>
      {showUser && (
        <div className="fixed top-18 right-12 bg-white border border-gray-300 rounded shadow-md py-2 w-40 z-50 text-center">
          <div
            className=" py-1 hover:bg-gray-100 cursor-pointer text-[var( --text-primary)]" onClick={() => navigate('/users')}
          >
            Users
          </div>
          <hr className='text-gray-300' />
          <div
            className=" py-1 hover:bg-gray-100 cursor-pointer text-[var( --text-primary)]" onClick={logout}
          >
            Logout
          </div>
        </div>
      )}


    </>

  )
}
