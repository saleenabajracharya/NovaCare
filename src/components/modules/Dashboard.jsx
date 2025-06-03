import React from 'react'
import { FaFilePen } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { Layout } from '../layout/Layout'
export const Dashboard = ({isDoc = true}) => {

  const user = {
    fullName : "salina bajracharya",
    email: "salina@gmail.com"
  }

  const navigate = useNavigate();
  return (
    <Layout>
    
    <div className='min-h-[calc(100vh-130px)] w-4/5 mx-auto rounded-xl p-5 bg-white '>
    <div className="my-4 mx-12">
                <h3 className=" mb-2 text-4xl text-[var(--text-primary)] font-bold">
                  Hello,{isDoc ? "Dr. ": ""} {user.fullName.split(" ")[0]}!
                </h3>
                <h5 className="mb-0 text-2xl text-[var(--text-secondary)] ">Let's start work.</h5>
    </div>
    <div className='flex mx-12'>
      <div className='h-30 w-25 bg-[var(--background-color)] rounded-lg m-4 border border-gray-300 cursor-pointer transition-all duration-300 hover:border-gray-400 hover:shadow-2xl'>
        <div className='flex justify-center items-center py-8 text-[var(--primary-color)] ' onClick={() => navigate('/new-form')}>
      <FaFilePen size={50}   />
      </div>
      <p className='text-center my-2  text-sm'>{isDoc ? "Today's List" : "New Form"}</p>
      </div>

      <div className='h-30 w-25 bg-[var(--background-color)] rounded-lg m-4 border border-gray-300 cursor-pointer transition-all duration-300 hover:border-gray-400 hover:shadow-2xl'>
        <div className='flex justify-center items-center py-8 text-[var(--primary-color)] ' onClick={() => navigate('/patient-history')}>
      <FaHistory size={50}  />
      </div>
      <p className='text-center my-2 text-sm whitespace-nowrap '>Patient History</p>
      </div>
    </div>

    </div>

    <div></div>
    </Layout>
  )
}
