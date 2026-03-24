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
    limit: "5",
  });
  
  const response = await fetch(`https://api.spotify.com/v1/search?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  return data.albums?.items || [];
}

async function main() {
  try {
    const token = await getToken();
    console.log("Got token:", token.substring(0, 20) + "...");
    
    const albums = await searchAlbum(token, "Taylor Swift Midnights");
    console.log("\nFound albums:");
    albums.forEach((album, i) => {
      console.log(`\n${i + 1}. ${album.name} by ${album.artists[0].name}`);
      console.log(`   Cover URL: ${album.images[0]?.url}`);
      console.log(`   ID: ${album.id}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
