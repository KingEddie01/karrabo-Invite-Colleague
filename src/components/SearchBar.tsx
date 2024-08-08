import Image from 'next/image'
import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";


const SearchBar = () => {
  return (
    <div className='flex justify-between items-center p-3' >  
      <div>
        <h2 className='font-bold '>All Staff(3)</h2>
      </div>
      <div className='flex gap-4 items-center'>
        <div className='flex gap-2 items-center'>
          <Image 
            src={'/Filter-list.png'}
            width={16}
            height={16}
            alt='filter List'
            
          />
            <p className='text-[#276510]'>Filter by</p>
        </div>
        <div className='flex items-center relative'>
         
            <AiOutlineSearch className='absolute w-6 h-6 text-gray-300 ml-4 ' />
        
          <div className='flex items-center gap-2 '>
            <input 
            type="text" 
            placeholder='Search'
            className='w-[239px] h-[44px]  border-2 border-gray-200 rounded-md pl-10 self-center'
          />
          </div>
          
        </div>
        <div>
          <button  className='bg-green-900 w-[150px] h-[43px] text-white rounded-sm font-bold'>
            + Invite Colleague
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default SearchBar