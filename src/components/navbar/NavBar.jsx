import React, {useState} from 'react'
import { FiSearch } from "react-icons/fi";
import { useNavigate, Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";


export const NavBar = () => {
  const [showUser,setShowUser] = useState(false);
  const navigate = useNavigate();
  return (
    <>
  <nav className="w-full px-4 py-5 fixed top-0 z-50 bg-[var(--background-color)] flex items-center justify-between text-[var(--background-light)]">
    <Link
      className="text-5xl font-semibold text-[var(--primary-color)] ms-15 flex gap-2"
      to="/"
    >
        <img src="/images/logo.svg" alt="logo" style={{height:"50px", width:"50px"}}/>
      NovaCare
    </Link>

    <form className="my-2">
      <div className="flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 h-12 w-100">
        <span className="text-[var(--text-secondary)] pr-2">
          <FiSearch size={18} />
        </span>
        <input
          type="text"
          className="outline-none border-none focus:ring-0 text-sm text-[var(--text-primary)]"
          placeholder="Search..."
        />
      </div>
    </form>

    <div className="relative me-10 text-[var(--primary-color)] cursor-pointer transition-all duration-300 hover:border-[#085a9d] hover:scale-110">
    <FaUser size={30} onClick={() => setShowUser(!showUser)}/>

    </div>
  </nav>
  {showUser && (
        <div className="absolute top-18 right-12 bg-white border border-gray-300 rounded shadow-md py-2 w-40 z-50 text-center">
          <div
            className=" py-2 hover:bg-gray-100 cursor-pointer text-[var( --text-primary)]" onClick={() => navigate('/profile')}
          >
            Profile
          </div>
          <hr className='text-gray-300'/>
          <div
            className=" py-2 hover:bg-gray-100 cursor-pointer text-[var( --text-primary)]"
          >
            Logout
          </div>
        </div>
      )}

</>

  )
}
