import React from "react";

function Modal({ setOpenModal }) {

  const handleSubmitClick = ()=>{
    console.log("Submit Clicked")
    setOpenModal(false)
  }

  return (
    <div className="w-full h-[100vh] bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 z-10 duration-500 flex justify-center items-center">
      <div className="  w-1/4 h-fit bg-white rounded-xl flex flex-col px-5 py-3">
        <div className="w-full max-w-xs p-5 bg-white rounded-lg font-mono">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="unique-input"
          >
            Submission Link
          </label>
          <input
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter Link here"
            type="text"
            id="unique-input"
          />
        </div>
        <div className="w-full flex justify-end items-center mb-4">
          <span className="flex gap-2 items-center">
            <button
            onClick={() => setOpenModal(false)}
            className="bg-rose-500 text-white px-4 py-1 rounded-lg">Close</button>
            <button
            onClick={handleSubmitClick}
            className="bg-green-500 text-white px-4 py-1 rounded-lg ">Submit</button>
          </span>
        </div>


      </div>
    </div>
  );
}

export default Modal;
