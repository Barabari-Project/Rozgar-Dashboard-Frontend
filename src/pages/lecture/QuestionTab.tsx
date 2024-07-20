

const QuestionTab: React.FC = ({ lecture }) => {

    console.log("QuestionTab", lecture)

    return (
        <>
            <div className="bg-[#E6EBF0] p-5 m-3 rounded-xl">
                <h1 className="text-start text-lg font-semibold text-[#324498]">Question Tab</h1>
                
                <br />
                <div className="w-full flex flex-col gap-4">
                {
                    lecture?.questions?.map(
                        (question, index) => 
                    <div key={question+index} className="w-full bg-white h-[55px] flex justify-between items-center rounded-xl px-4 pr-5 hover:shadow-xl duration-500 hover:cursor-pointer">
                    {/* left part */}
                     <div className="flex h-full items-center max-w-3/4 overflow-hidden gap-3 pl-2">
                         <label className="text-white">
                         <input
                             className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5 mt-1
                             marked:bg-[#FFCB33]
                             dark:checked:bg-[#FFCB33]"
                             type="checkbox"
                         />
                         </label>

                         <a href="#" className="hover:text-[rgb(79,30,223)]">{question}</a>
                     </div>
                         {/* right part */}
                     <div className="flex h-full items-center gap-3">
                         <span>Link</span>
                         <span>Submission</span>
                     </div>    
                    </div>    
                    )
                }
                    

                </div>
            </div>
        </>
    )
}

export default QuestionTab;