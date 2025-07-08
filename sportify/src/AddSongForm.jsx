import { useState } from "react";
import axios from "axios";

function AddSongForm() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });
  const [audioFile, setAudioFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (50MB = 50 * 1024 * 1024 bytes)
      const maxSize = 50 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File too large! Maximum size is 50MB.');
        e.target.value = ''; // Clear the input
        return;
      }

      // Check file type
      if (!file.type.startsWith('audio/')) {
        alert('Please select an audio file.');
        e.target.value = ''; // Clear the input
        return;
      }

      setAudioFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audioFile) {
      alert("Please select an audio file");
      return;
    }

    if (!formData.title || !formData.artist) {
      alert("Please fill in title and artist");
      return;
    }

    setIsUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append('audio', audioFile);
      uploadData.append('title', formData.title);
      uploadData.append('artist', formData.artist);
      uploadData.append('album', formData.album || 'Unknown Album');
      uploadData.append('genre', formData.genre || 'Unknown');

      const response = await axios.post("http://localhost:3001/api/songs/upload", uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Song uploaded:", response.data);
      alert("Song uploaded successfully!");

      // Reset form
      setFormData({
        title: "",
        artist: "",
        album: "",
        genre: "",
      });
      setAudioFile(null);

    } catch (err) {
      console.error("Error uploading song:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        alert(`Error: ${err.response.data.message || 'Upload failed'}`);
      } else {
        alert("Error uploading song. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Upload New Song</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Song Title"
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Artist *</label>
          <input
            type="text"
            name="artist"
            value={formData.artist}
            placeholder="Artist Name"
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Album</label>
          <input
            type="text"
            name="album"
            value={formData.album}
            placeholder="Album Name"
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            placeholder="Music Genre"
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Audio File *</label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {audioFile && (
            <p className="text-green-400 text-sm mt-1">Selected: {audioFile.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          {isUploading ? 'Uploading...' : 'Upload Song'}
        </button>
      </form>
    </div>
  );
}

export default AddSongForm;
