import React from 'react';

function Navbar() {
  return (
    <div className="flex fixed justify-between items-center w-full bg-black p-4">
      <div className="flex items-center space-x-100">
        <div className="h-10 w-10">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
            alt="Spotify Logo"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="text-white">
          <i className="fa-solid fa-house text-2xl"></i>
        </div>
      </div>
      <form className="max-w-md w-full flex items-center gap-2">
        <div className="relative w-full">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="What do you want to play?"
            required
          />
          <i className="fa-solid fa-magnifying-glass absolute inset-y-0 left-3 text-gray-500 dark:text-gray-400 flex items-center pointer-events-none mt-5"></i>
        </div>
      </form>
      <button className="text-black bg-white rounded-lg p-2 hover:bg-gray-200 font-bold">
        Explore Premium
      </button>
      <button className="text-white border border-white rounded-lg p-2 hover:bg-white hover:text-black">
        Install App
      </button>
      <i className="fa-solid fa-bell text-white text-2xl"></i>
      <i className="fa-solid fa-user-group text-white text-2xl"></i>
      <i className="fa-solid fa-user text-white text-2xl"></i>
    </div>
  );
}

export default Navbar;
