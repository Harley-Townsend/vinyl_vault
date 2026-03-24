const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function getToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token;
}

async function searchAlbum(token, query) {
  const params = new URLSearchParams({
    q: query,
    type: "album",
    limit: "1",
  });
  
  const response = await fetch(`https://api.spotify.com/v1/search?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  const album = data.albums?.items?.[0];
  if (album) {
    return {
      title: album.name,
      artist: album.artists[0]?.name,
      releaseDate: album.release_date,
      coverUrl: album.images[0]?.url,
      description: `${album.artists[0]?.name} - ${album.name}`,
    };
  }
  return null;
}

async function main() {
  try {
    const token = await getToken();
    
    const albums = await Promise.all([
      searchAlbum(token, "Rumours Fleetwood Mac"),
      searchAlbum(token, "Blinding Lights The Weeknd"),
    ]);
    
    albums.forEach((album, i) => {
      if (album) {
        console.log(`Album ${i + 1}:`);
        console.log(`  Title: ${album.title}`);
        console.log(`  Artist: ${album.artist}`);
        console.log(`  Cover: ${album.coverUrl}`);
        console.log(`  Release: ${album.releaseDate}`);
        console.log();
      }
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
