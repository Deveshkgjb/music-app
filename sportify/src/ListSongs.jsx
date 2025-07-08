import { useEffect, useState } from "react";
import axios from "axios";

function ListSongs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/songs") // Ensure this URL matches your backend route
      .then((res) => {
        setSongs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching songs:", err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {songs.map((song) => (
        <div key={song._id} className="bg-gray-200 p-4 rounded-lg">
          <h2>{song.title} - {song.artist}</h2>
          <audio controls src={song.audioUrl}></audio>
        </div>
      ))}
    </div>
  );
}

export default ListSongs;