const axios = require('axios');

// Test the API endpoints
async function testAPI() {
  try {
    console.log('Testing Sportify Backend API...\n');

    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:3001/api/health');
    console.log('✅ Health check:', healthResponse.data.message);

    // Test get all songs
    console.log('\n2. Testing get all songs...');
    const songsResponse = await axios.get('http://localhost:3001/api/songs');
    console.log(`✅ Found ${songsResponse.data.length} songs`);

    // Test random song
    console.log('\n3. Testing random song...');
    const randomResponse = await axios.get('http://localhost:3001/api/songs/random');
    console.log('✅ Random song:', randomResponse.data.title, 'by', randomResponse.data.artist);

    // Test get all playlists
    console.log('\n4. Testing get all playlists...');
    const playlistsResponse = await axios.get('http://localhost:3001/api/playlists');
    console.log(`✅ Found ${playlistsResponse.data.length} playlists`);

    // Test search
    console.log('\n5. Testing search...');
    const searchResponse = await axios.get('http://localhost:3001/api/search?q=Blinding');
    console.log(`✅ Search results: ${searchResponse.data.length} songs found`);

    console.log('\n🎉 All API tests passed! Backend is working correctly.');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI();
