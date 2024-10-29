import React from 'react'
import { ITopic } from "../../utils/types/course";
import notes from '../../assets/notes.gif'

interface NotesTabProps {
  topic: ITopic | null
}

const NotesTab: React.FC<NotesTabProps> = ( { topic })=> {
  console.log(topic);
  return (
    <div className="bg-[#E6EBF0] p-1 md:p-5 m-1 md:m-3 rounded-xl">
        <h1 className="text-start text-xl font-semibold text-[#324498] px-2 md:p-0">
          {topic.title}📝
        </h1>   
        <div className='flex items-center justify-center h-fit py-14'>

            <div className='w-72 h-36 flex gap-3 flex-col items-center justify-center bg-white shadow-xl rounded-xl'>
            <img src={notes} width={50} />
            <a target='_blank' href={topic?.url} className='text-[#324498] hover:scale-110 duration-500 text-xl underline'>Link</a>
            </div>
            
        </div> 
    </div>
  )
}

export default NotesTab
