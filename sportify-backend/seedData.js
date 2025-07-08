const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sportify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Song Schema
const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, default: 'Unknown Album' },
  duration: { type: Number, default: 0 },
  audioUrl: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  genre: { type: String, default: 'Unknown' },
  createdAt: { type: Date, default: Date.now }
});

const Song = mongoose.model('Song', songSchema);

// Playlist Schema
const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

// Sample songs data
const sampleSongs = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    genre: "Pop"
  },
  {
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: 174,
    audioUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    genre: "Pop"
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    genre: "Pop"
  },
  {
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    duration: 178,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    genre: "Pop"
  },
  {
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
    duration: 141,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
    genre: "Hip Hop"
  },
  {
    title: "hello",
    artist: "The ",
    album: "After ",
    duration: 300,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    genre: "Pop"
  },
  {
    title: "New Song Title",
    artist: "New Artist",
    album: "New Album",
    duration: 180,
    audioUrl: "https://example.com/new-song.mp3",
    imageUrl: "https://example.com/new-song-image.jpg",
    genre: "New Genre"
  }
];

// Sample playlists data
const samplePlaylists = [
  {
    name: "Today's Top Hits",
    description: "The most played songs right now",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
  },
  {
    name: "Chill Vibes",
    description: "Relax and unwind with these chill tracks",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop"
  }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Song.deleteMany({});
    await Playlist.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Insert sample songs
    const insertedSongs = await Song.insertMany(sampleSongs);
    console.log(`Inserted ${insertedSongs.length} songs`);
    
    // Create playlists with some songs
    const playlist1 = new Playlist({
      ...samplePlaylists[0],
      songs: [insertedSongs[0]._id, insertedSongs[1]._id, insertedSongs[2]._id]
    });
    
    const playlist2 = new Playlist({
      ...samplePlaylists[1],
      songs: [insertedSongs[3]._id, insertedSongs[4]._id]
    });
    
    await playlist1.save();
    await playlist2.save();
    
    console.log('Inserted sample playlists');
    console.log('Database seeded successfully!');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
}

seedDatabase();
