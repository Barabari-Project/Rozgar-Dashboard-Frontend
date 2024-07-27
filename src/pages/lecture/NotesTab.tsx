import React from 'react'
import { ITopic } from "../../utils/types/course";

interface NotesTabProps {
  topic: ITopic | null
}

const NotesTab: React.FC<NotesTabProps> = ( { topic })=> {
  return (
    <div className="bg-[#E6EBF0] p-1 md:p-5 m-1 md:m-3 rounded-xl">
        <h1 className="text-start text-lg font-semibold text-[#324498] px-2 md:p-0">
        Notes Tab
        </h1>   
        <div className='flex items-center justify-center h-[70vh]'>
            <a href="#" className='text-[#324498] hover:scale-110 duration-500 px-7 py-2 bg-white rounded-lg shadow-lg'>Link</a>
        </div> 
    </div>
  )
}

export default NotesTab