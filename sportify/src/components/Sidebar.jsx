import React, { useEffect, useState } from 'react';
import { Home, Search, Library, Plus, Heart } from 'lucide-react';
import axios from 'axios';

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/playlists');
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  return (
    <div className="w-64 bg-black h-full flex flex-col border-r border-gray-800">
      {/* Main Navigation */}
      <div className="p-6">
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-3 text-white hover:text-green-500 transition-colors">
            <Home size={24} />
            <span className="font-medium">Home</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
            <Search size={24} />
            <span className="font-medium">Search</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
            <Library size={24} />
            <span className="font-medium">Your Library</span>
          </a>
        </nav>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mx-6"></div>

      {/* Create Playlist */}
      <div className="p-6">
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
            <Plus size={24} />
            <span className="font-medium">Create Playlist</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
            <Heart size={24} />
            <span className="font-medium">Liked Songs</span>
          </a>
        </nav>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mx-6"></div>

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-2">
          {playlists.map((playlist) => (
            <a
              key={playlist._id}
              href="#"
              className="block text-gray-400 hover:text-white transition-colors py-1 truncate"
            >
              {playlist.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
