import React, { useEffect, useState } from 'react';
import { Play, Pause, Upload, Shuffle } from 'lucide-react';
import axios from 'axios';

const MainContent = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: ''
  });
  const [audioFile, setAudioFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchSongs();
    fetchPlaylists();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/songs');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/playlists');
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    // Dispatch event to update player
    window.dispatchEvent(new CustomEvent('playSong', { detail: song }));
  };

  const handlePlayRandomSong = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/songs/random');
      handlePlaySong(response.data);
    } catch (error) {
      console.error('Error fetching random song:', error);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!audioFile || !uploadData.title || !uploadData.artist) {
      alert('Please fill in all required fields and select an audio file');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('title', uploadData.title);
    formData.append('artist', uploadData.artist);
    formData.append('album', uploadData.album);
    formData.append('genre', uploadData.genre);

    try {
      await axios.post('http://localhost:3001/api/songs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset form
      setUploadData({ title: '', artist: '', album: '', genre: '' });
      setAudioFile(null);
      setShowUploadForm(false);

      // Refresh songs list
      fetchSongs();
      alert('Song uploaded successfully!');
    } catch (error) {
      console.error('Error uploading song:', error);
      alert('Error uploading song. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Good evening</h1>
              <p className="text-gray-400">Welcome back to Sportify</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handlePlayRandomSong}
                className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-colors"
              >
                <Shuffle size={20} />
                <span>Play Random</span>
              </button>
              <button
                onClick={() => setShowUploadForm(!showUploadForm)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-colors"
              >
                <Upload size={20} />
                <span>Upload Song</span>
              </button>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="mb-8 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Upload New Song</h2>
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Artist *
                  </label>
                  <input
                    type="text"
                    value={uploadData.artist}
                    onChange={(e) => setUploadData({...uploadData, artist: e.target.value})}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Album
                  </label>
                  <input
                    type="text"
                    value={uploadData.album}
                    onChange={(e) => setUploadData({...uploadData, album: e.target.value})}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Genre
                  </label>
                  <input
                    type="text"
                    value={uploadData.genre}
                    onChange={(e) => setUploadData({...uploadData, genre: e.target.value})}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Audio File *
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-black px-6 py-2 rounded font-semibold transition-colors"
                >
                  {isUploading ? 'Uploading...' : 'Upload Song'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Featured Playlists */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Featured Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {playlist.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{playlist.name}</h3>
                    <p className="text-gray-400 text-sm">{playlist.description}</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 rounded-full p-3 hover:scale-105 transform">
                    <Play size={16} className="text-black fill-current ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Songs */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">All Songs</h2>
          <div className="space-y-2">
            {songs.map((song, index) => (
              <div
                key={song._id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer"
                onClick={() => handlePlaySong(song)}
              >
                <div className="w-8 text-gray-400 text-sm">
                  {currentSong?._id === song._id && isPlaying ? (
                    <Pause size={16} className="text-green-500" />
                  ) : (
                    <span className="group-hover:hidden">{index + 1}</span>
                  )}
                  <Play size={16} className="text-white hidden group-hover:block" />
                </div>
                
                <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
                  {song.imageUrl ? (
                    <img src={song.imageUrl} alt={song.title} className="w-full h-full object-cover rounded" />
                  ) : (
                    <span className="text-white font-bold">{song.title.charAt(0)}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${currentSong?._id === song._id ? 'text-green-500' : 'text-white'}`}>
                    {song.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>
                
                <div className="text-gray-400 text-sm">
                  {song.album}
                </div>
                
                <div className="text-gray-400 text-sm w-16 text-right">
                  {formatDuration(song.duration)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainContent;
