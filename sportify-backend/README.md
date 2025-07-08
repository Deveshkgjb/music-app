# Sportify Backend

A Node.js/Express backend for the Sportify music streaming application.

## Features

- RESTful API for songs and playlists
- MongoDB database integration
- CORS enabled for frontend connection
- File upload support for audio files
- Search functionality
- Sample data seeding

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sportify
NODE_ENV=development
```

3. Start MongoDB service (if using local MongoDB):
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
net start MongoDB
```

4. Seed the database with sample data:
```bash
node seedData.js
```

5. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:5000

## API Endpoints

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs/:id` - Get song by ID
- `POST /api/songs` - Create new song
- `PUT /api/songs/:id` - Update song
- `DELETE /api/songs/:id` - Delete song

### Playlists
- `GET /api/playlists` - Get all playlists
- `GET /api/playlists/:id` - Get playlist by ID
- `POST /api/playlists` - Create new playlist
- `POST /api/playlists/:id/songs` - Add song to playlist

### Search
- `GET /api/search?q=query` - Search songs by title, artist, or album

### Health Check
- `GET /api/health` - Server health check

## Sample Data

The `seedData.js` script will populate your database with:
- 5 sample songs with metadata
- 2 sample playlists
- Proper relationships between playlists and songs

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `node seedData.js` - Seed database with sample data

## Database Schema

### Song
```javascript
{
  title: String (required),
  artist: String (required),
  album: String (default: 'Unknown Album'),
  duration: Number (in seconds),
  audioUrl: String (required),
  imageUrl: String,
  genre: String,
  createdAt: Date
}
```

### Playlist
```javascript
{
  name: String (required),
  description: String,
  songs: [ObjectId] (references to Song),
  imageUrl: String,
  createdAt: Date
}
```

## Frontend Connection

The backend is configured to work with the Sportify React frontend running on http://localhost:3000. CORS is enabled for this origin.

Make sure both frontend and backend are running:
1. Backend: `npm run dev` (port 5000)
2. Frontend: `npm run dev` (port 3000)

## Troubleshooting

1. **MongoDB Connection Error**: Make sure MongoDB is running and the connection string in `.env` is correct.

2. **CORS Error**: Ensure the frontend URL is included in the CORS configuration.

3. **Port Already in Use**: Change the PORT in `.env` file if 5000 is already in use.

4. **Sample Data Not Loading**: Run `node seedData.js` to populate the database with sample data.
