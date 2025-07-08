import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ name: '', mobile: '' });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    console.log('Login Data:', loginData);
    alert('Login successful!');
    setShowLoginModal(false);
  };

  return (
    <nav className="bg-black p-4 flex items-center justify-between border-b border-gray-800">
      <div className="flex items-center space-x-4">
        <h1 className="text-white text-2xl font-bold text-green-500">Devesh</h1>
      </div>
      
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for songs, artists, or albums"
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          className="text-gray-400 hover:text-white transition-colors"
          onClick={() => setShowLoginModal(true)}
        >
          <User size={24} />
        </button>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Name (Optional)</label>
                <input
                  type="text"
                  name="name"
                  value={loginData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Mobile Number (Optional)</label>
                <input
                  type="text"
                  name="mobile"
                  value={loginData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
