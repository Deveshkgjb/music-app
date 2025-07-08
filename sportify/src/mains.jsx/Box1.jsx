import React, { useState } from 'react';

function Box1(){

  return (
    <div className="h-full w-110  bg-black border border-gray-700 rounded-lg overflow-y-auto" >
      <div className="flex  text-white font-bold flex-row justify-between p-4 space-x-4">
        <h3 className="relative top-2">Your Library</h3>
        <button className="flex bg-black text-white rounded-lg p-2 hover:bg-gray-700 items-center gap-2">
          <i className="fa-solid fa-plus"></i>
          Create
        </button>
        <i
          className="fa-solid fa-maximize cursor-pointer"
          
        ></i>
      </div>
      <div className="flex flex-row" >
        <button className='bg-gray-900 relative mb-3 ml-3 rounded-lg text-white p-2'>
          playlist
        </button>
        <button className='bg-gray-900 relative mb-3 ml-3 rounded-lg text-white p-2'>
          playlist
        </button>
      </div>
       <div className="flex flex-row text-white" >
      <p className="ml-3"> <i 
       class="fa-solid fa-magnifying-glass "></i></p>
       </div>
       <div>
        
       </div>
    </div>
  );
}

export default Box1;
