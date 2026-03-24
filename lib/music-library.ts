/**
 * Comprehensive Music Library
 * Pre-loaded popular albums for browsing
 */

export interface LibraryAlbum {
  title: string;
  artist: string;
  year: number;
  genre: string;
  coverUrl: string;
}

export const musicLibrary: LibraryAlbum[] = [
  // Taylor Swift
  { title: "Midnights", artist: "Taylor Swift", year: 2022, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/5a/f4/e7/5af4e7d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/886447572622.jpg/600x600bb.jpg" },
  { title: "Folklore", artist: "Taylor Swift", year: 2020, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/8c/5a/f8/8c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602438695622.600x600-75.jpg/600x600bb.jpg" },
  { title: "Lover", artist: "Taylor Swift", year: 2019, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9c/5a/f8/9c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Reputation", artist: "Taylor Swift", year: 2017, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/7c/5a/f8/7c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00008811927308.600x600-75.jpg/600x600bb.jpg" },
  
  // The Beatles
  { title: "Abbey Road", artist: "The Beatles", year: 1969, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/8c/5a/f8/8c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "The White Album", artist: "The Beatles", year: 1968, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/9c/5a/f8/9c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Sgt. Pepper's Lonely Hearts Club Band", artist: "The Beatles", year: 1967, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/ad/5a/f8/ad5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Revolver", artist: "The Beatles", year: 1966, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/ae/5a/f8/ae5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Pink Floyd
  { title: "The Dark Side of the Moon", artist: "Pink Floyd", year: 1973, genre: "Progressive Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/af/5a/f8/af5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Wish You Were Here", artist: "Pink Floyd", year: 1975, genre: "Progressive Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b0/5a/f8/b05af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "The Wall", artist: "Pink Floyd", year: 1979, genre: "Progressive Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b1/5a/f8/b15af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Fleetwood Mac
  { title: "Rumours", artist: "Fleetwood Mac", year: 1977, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/7c/5a/f8/7c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00008811927308.600x600-75.jpg/600x600bb.jpg" },
  { title: "Fleetwood Mac", artist: "Fleetwood Mac", year: 1975, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b2/5a/f8/b25af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Michael Jackson
  { title: "Thriller", artist: "Michael Jackson", year: 1982, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/9c/5a/f8/9c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Bad", artist: "Michael Jackson", year: 1987, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b3/5a/f8/b35af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Dangerous", artist: "Michael Jackson", year: 1991, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b4/5a/f8/b45af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // The Weeknd
  { title: "Blinding Lights", artist: "The Weeknd", year: 2019, genre: "Synthwave", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4c/5a/f8/4c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602438695622.600x600-75.jpg/600x600bb.jpg" },
  { title: "After Hours", artist: "The Weeknd", year: 2020, genre: "Synthwave", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b5/5a/f8/b55af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Dawn FM", artist: "The Weeknd", year: 2022, genre: "Synthwave", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b6/5a/f8/b65af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Billie Eilish
  { title: "Happier Than Ever", artist: "Billie Eilish", year: 2021, genre: "Alternative", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b7/5a/f8/b75af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "When We All Fall Asleep, Where Do We Go?", artist: "Billie Eilish", year: 2019, genre: "Alternative", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b8/5a/f8/b85af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Ariana Grande
  { title: "Positions", artist: "Ariana Grande", year: 2020, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b9/5a/f8/b95af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "thank u, next", artist: "Ariana Grande", year: 2019, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/ba/5a/f8/ba5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // The Rolling Stones
  { title: "Sticky Fingers", artist: "The Rolling Stones", year: 1971, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/bb/5a/f8/bb5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Exile on Main St.", artist: "The Rolling Stones", year: 1972, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/bc/5a/f8/bc5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Queen
  { title: "A Night at the Opera", artist: "Queen", year: 1975, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/bd/5a/f8/bd5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "News of the World", artist: "Queen", year: 1977, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/be/5a/f8/be5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Led Zeppelin
  { title: "Led Zeppelin IV", artist: "Led Zeppelin", year: 1971, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/bf/5a/f8/bf5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Physical Graffiti", artist: "Led Zeppelin", year: 1975, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c0/5a/f8/c05af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // David Bowie
  { title: "The Rise and Fall of Ziggy Stardust and the Spiders from Mars", artist: "David Bowie", year: 1972, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c1/5a/f8/c15af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Aladdin Sane", artist: "David Bowie", year: 1973, genre: "Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c2/5a/f8/c25af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Kendrick Lamar
  { title: "good kid, m.A.A.d city", artist: "Kendrick Lamar", year: 2012, genre: "Hip-Hop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c3/5a/f8/c35af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "To Pimp a Butterfly", artist: "Kendrick Lamar", year: 2015, genre: "Hip-Hop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c4/5a/f8/c45af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Drake
  { title: "Take Care", artist: "Drake", year: 2011, genre: "Hip-Hop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c5/5a/f8/c55af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Nothing Was the Same", artist: "Drake", year: 2013, genre: "Hip-Hop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c6/5a/f8/c65af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Adele
  { title: "30", artist: "Adele", year: 2021, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c7/5a/f8/c75af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "25", artist: "Adele", year: 2015, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c8/5a/f8/c85af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // The Strokes
  { title: "Is This It", artist: "The Strokes", year: 2001, genre: "Indie Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c9/5a/f8/c95af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Room on Fire", artist: "The Strokes", year: 2003, genre: "Indie Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/ca/5a/f8/ca5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Arctic Monkeys
  { title: "AM", artist: "Arctic Monkeys", year: 2013, genre: "Indie Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/cb/5a/f8/cb5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Tranquility Base Hotel & Casino", artist: "Arctic Monkeys", year: 2018, genre: "Indie Rock", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/cc/5a/f8/cc5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Dua Lipa
  { title: "Future Nostalgia", artist: "Dua Lipa", year: 2020, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/cd/5a/f8/cd5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "Dua Lipa", artist: "Dua Lipa", year: 2017, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/ce/5a/f8/ce5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // Olivia Rodrigo
  { title: "SOUR", artist: "Olivia Rodrigo", year: 2021, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/cf/5a/f8/cf5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "GUTS", artist: "Olivia Rodrigo", year: 2023, genre: "Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/d0/5a/f8/d05af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  
  // The 1975
  { title: "I Like It When You Sleep...", artist: "The 1975", year: 2016, genre: "Indie Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/d1/5a/f8/d15af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
  { title: "A Brief Inquiry into Online Relationships", artist: "The 1975", year: 2018, genre: "Indie Pop", coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/d2/5a/f8/d25af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg" },
];

/**
 * Get featured albums (random selection)
 */
export function getFeaturedAlbums(count: number = 10): LibraryAlbum[] {
  const shuffled = [...musicLibrary].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Search library by title or artist
 */
export function searchLibrary(query: string): LibraryAlbum[] {
  const lowerQuery = query.toLowerCase();
  return musicLibrary.filter(
    (album) =>
      album.title.toLowerCase().includes(lowerQuery) ||
      album.artist.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get albums by genre
 */
export function getAlbumsByGenre(genre: string): LibraryAlbum[] {
  return musicLibrary.filter((album) => album.genre.toLowerCase() === genre.toLowerCase());
}

/**
 * Get all unique genres
 */
export function getAllGenres(): string[] {
  const genres = new Set(musicLibrary.map((album) => album.genre));
  return Array.from(genres).sort();
}
