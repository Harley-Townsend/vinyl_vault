// Expanded album database with 55+ albums across multiple genres
export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  genres: string[];
  description?: string;
}

export const ALBUM_DATABASE: Album[] = [
  // Pop
  { id: "1", title: "Midnights", artist: "Taylor Swift", coverUrl: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5", releaseDate: "2022-10-21", genres: ["Pop"], description: "Taylor Swift's introspective album exploring themes of love and loss." },
  { id: "2", title: "1989", artist: "Taylor Swift", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2014-10-27", genres: ["Pop"], description: "Taylor's official pop debut with hits like Shake It Off." },
  { id: "3", title: "Lover", artist: "Taylor Swift", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2019-08-23", genres: ["Pop"], description: "A romantic and colorful album celebrating love in all its forms." },
  { id: "4", title: "Reputation", artist: "Taylor Swift", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2017-11-10", genres: ["Pop"], description: "Dark and edgy album addressing media scrutiny and personal struggles." },
  { id: "5", title: "Dua Lipa", artist: "Dua Lipa", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2017-06-02", genres: ["Pop"], description: "Debut album featuring the hit single New Rules." },
  { id: "6", title: "Future Nostalgia", artist: "Dua Lipa", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2020-03-27", genres: ["Disco", "Pop"], description: "Disco-influenced pop album with infectious grooves." },
  { id: "7", title: "Positions", artist: "Ariana Grande", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2020-10-30", genres: ["Pop"], description: "Intimate and sensual pop album showcasing vocal prowess." },
  { id: "8", title: "Thank U, Next", artist: "Ariana Grande", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2019-02-08", genres: ["Pop"], description: "Empowering album about personal growth and self-love." },
  { id: "9", title: "Teenage Dream", artist: "Katy Perry", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2010-08-24", genres: ["Pop"], description: "Upbeat pop album with multiple chart-topping singles." },
  { id: "10", title: "Blinding Lights", artist: "The Weeknd", coverUrl: "https://i.scdn.co/image/ab67616d0000b273a3eff72f62782fb589a492f9", releaseDate: "2020-09-11", genres: ["Synthwave", "Electronic"], description: "Retro synthwave-influenced album with massive global success." },

  // Rock
  { id: "11", title: "Rumours", artist: "Fleetwood Mac", coverUrl: "https://i.scdn.co/image/ab67616d0000b27357df7ce0eac715cf70e519a7", releaseDate: "1977-02-04", genres: ["Rock"], description: "Classic rock masterpiece created during band turmoil." },
  { id: "12", title: "The Dark Side of the Moon", artist: "Pink Floyd", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1973-03-01", genres: ["Rock", "Progressive Rock"], description: "Iconic progressive rock album exploring themes of madness and mortality." },
  { id: "13", title: "Led Zeppelin IV", artist: "Led Zeppelin", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1971-11-08", genres: ["Rock", "Hard Rock"], description: "Legendary hard rock album featuring Stairway to Heaven." },
  { id: "14", title: "Abbey Road", artist: "The Beatles", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1969-09-26", genres: ["Rock", "Pop Rock"], description: "The Beatles' final recorded album with iconic medley." },
  { id: "15", title: "The White Album", artist: "The Beatles", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1968-11-22", genres: ["Rock"], description: "Double album showcasing the band's diverse songwriting." },
  { id: "16", title: "Nevermind", artist: "Nirvana", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1991-09-24", genres: ["Grunge", "Rock"], description: "Grunge masterpiece that changed rock music forever." },
  { id: "17", title: "In Utero", artist: "Nirvana", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1993-09-21", genres: ["Grunge", "Rock"], description: "Raw and emotionally intense follow-up to Nevermind." },
  { id: "18", title: "OK Computer", artist: "Radiohead", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1997-06-16", genres: ["Alternative Rock", "Electronic"], description: "Groundbreaking album blending rock with electronic elements." },
  { id: "19", title: "The Bends", artist: "Radiohead", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1995-03-03", genres: ["Alternative Rock"], description: "Alternative rock album with introspective lyrics." },
  { id: "20", title: "Appetite for Destruction", artist: "Guns N' Roses", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1987-07-21", genres: ["Hard Rock", "Heavy Metal"], description: "Explosive hard rock debut with Welcome to the Jungle." },

  // Hip-Hop
  { id: "21", title: "The College Dropout", artist: "Kanye West", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2004-02-10", genres: ["Hip-Hop", "Rap"], description: "Kanye's debut album that revolutionized hip-hop production." },
  { id: "22", title: "Late Registration", artist: "Kanye West", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2005-08-30", genres: ["Hip-Hop", "Rap"], description: "Orchestral hip-hop album with lush arrangements." },
  { id: "23", title: "good kid, m.A.A.d city", artist: "Kendrick Lamar", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2012-10-22", genres: ["Hip-Hop", "Rap"], description: "Narrative hip-hop album exploring life in Compton." },
  { id: "24", title: "To Pimp a Butterfly", artist: "Kendrick Lamar", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2015-03-15", genres: ["Hip-Hop", "Rap"], description: "Jazz and funk-influenced hip-hop masterpiece." },
  { id: "25", title: "DAMN.", artist: "Kendrick Lamar", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2017-04-14", genres: ["Hip-Hop", "Rap"], description: "Pulitzer Prize-winning hip-hop album." },
  { id: "26", title: "Illmatic", artist: "Nas", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1994-04-19", genres: ["Hip-Hop", "Rap"], description: "Classic 90s hip-hop debut with legendary production." },
  { id: "27", title: "The Marshall Mathers LP", artist: "Eminem", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2000-05-23", genres: ["Hip-Hop", "Rap"], description: "Eminem's breakthrough album with controversial lyrics." },
  { id: "28", title: "Reasonable Doubt", artist: "Jay-Z", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1996-06-25", genres: ["Hip-Hop", "Rap"], description: "Jay-Z's debut establishing his career in hip-hop." },
  { id: "29", title: "Certified Lover Boy", artist: "Drake", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2021-09-03", genres: ["Hip-Hop", "Rap"], description: "Drake's romantic hip-hop album with smooth production." },
  { id: "30", title: "Take Care", artist: "Drake", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2011-11-15", genres: ["Hip-Hop", "Rap"], description: "Introspective hip-hop album exploring relationships." },

  // Jazz
  { id: "31", title: "Kind of Blue", artist: "Miles Davis", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1959-03-02", genres: ["Jazz"], description: "Best-selling jazz album of all time." },
  { id: "32", title: "A Love Supreme", artist: "John Coltrane", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1964-12-10", genres: ["Jazz"], description: "Spiritual jazz masterpiece with four-part suite." },
  { id: "33", title: "Moanin'", artist: "Art Blakey & The Jazz Messengers", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1958-03-15", genres: ["Jazz"], description: "Hard bop classic with energetic performances." },
  { id: "34", title: "Time Out", artist: "The Dave Brubeck Quartet", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1959-12-02", genres: ["Jazz"], description: "Jazz album featuring Take Five in unusual time signatures." },
  { id: "35", title: "Maiden Voyage", artist: "Herbie Hancock", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1965-03-30", genres: ["Jazz"], description: "Modal jazz album with ethereal soundscapes." },
  { id: "36", title: "Blue Train", artist: "John Coltrane", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1957-09-15", genres: ["Jazz"], description: "Coltrane's hard bop masterpiece." },
  { id: "37", title: "Sketches of Spain", artist: "Miles Davis", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1960-03-02", genres: ["Jazz"], description: "Spanish-influenced jazz with orchestral arrangements." },
  { id: "38", title: "Giant Steps", artist: "John Coltrane", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1960-02-02", genres: ["Jazz"], description: "Challenging jazz album with complex chord changes." },
  { id: "39", title: "Bitches Brew", artist: "Miles Davis", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1970-03-30", genres: ["Jazz", "Fusion"], description: "Pioneering jazz fusion album." },
  { id: "40", title: "Headhunters", artist: "Herbie Hancock", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1973-09-12", genres: ["Jazz", "Funk"], description: "Funky jazz fusion with groove-oriented sound." },

  // Electronic
  { id: "41", title: "Discovery", artist: "Daft Punk", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2001-03-12", genres: ["Electronic", "House"], description: "Iconic electronic album with One More Time." },
  { id: "42", title: "Homework", artist: "Daft Punk", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1997-01-20", genres: ["Electronic", "House"], description: "Daft Punk's debut establishing their signature sound." },
  { id: "43", title: "Random Access Memories", artist: "Daft Punk", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2013-05-17", genres: ["Electronic", "Funk"], description: "Disco and funk-influenced electronic masterpiece." },
  { id: "44", title: "Awaken, My Love!", artist: "Childish Gambino", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2016-12-02", genres: ["Electronic", "Funk"], description: "Funk-influenced electronic album with soulful vocals." },
  { id: "45", title: "Immunity", artist: "Clairo", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2019-08-02", genres: ["Electronic", "Indie"], description: "Lo-fi electronic indie album with dreamy production." },
  { id: "46", title: "Anti", artist: "Rihanna", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2016-01-28", genres: ["Electronic", "R&B"], description: "Experimental electronic R&B album." },
  { id: "47", title: "Melodrama", artist: "Lorde", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2017-06-16", genres: ["Electronic", "Indie"], description: "Electronic indie album exploring teenage emotions." },
  { id: "48", title: "Currents", artist: "Tame Impala", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2015-07-17", genres: ["Electronic", "Psychedelic"], description: "Psychedelic electronic album with synth-pop influences." },
  { id: "49", title: "Lonerism", artist: "Tame Impala", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2012-09-24", genres: ["Electronic", "Psychedelic"], description: "Psychedelic electronic album with lush production." },
  { id: "50", title: "Vessel", artist: "Twenty One Pilots", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2013-09-17", genres: ["Electronic", "Alternative"], description: "Electronic alternative album with emotional depth." },

  // Classical
  { id: "51", title: "The Four Seasons", artist: "Antonio Vivaldi", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1725-01-01", genres: ["Classical"], description: "Iconic classical concertos depicting the seasons." },
  { id: "52", title: "Moonlight Sonata", artist: "Ludwig van Beethoven", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1801-01-01", genres: ["Classical"], description: "Beethoven's most famous piano sonata." },
  { id: "53", title: "Swan Lake", artist: "Pyotr Ilyich Tchaikovsky", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1876-03-04", genres: ["Classical", "Ballet"], description: "Legendary ballet composition with timeless melodies." },
  { id: "54", title: "The Magic Flute", artist: "Wolfgang Amadeus Mozart", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1791-09-30", genres: ["Classical", "Opera"], description: "Mozart's enchanting opera masterpiece." },
  { id: "55", title: "Requiem", artist: "Wolfgang Amadeus Mozart", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1791-12-10", genres: ["Classical"], description: "Mozart's unfinished but powerful Requiem mass." },
];

export function getAlbumById(id: string): Album | undefined {
  return ALBUM_DATABASE.find((album) => album.id === id);
}

export function searchAlbums(query: string): Album[] {
  const lowerQuery = query.toLowerCase();
  return ALBUM_DATABASE.filter(
    (album) =>
      album.title.toLowerCase().includes(lowerQuery) ||
      album.artist.toLowerCase().includes(lowerQuery) ||
      album.genres.some((genre) => genre.toLowerCase().includes(lowerQuery))
  );
}

export function getAlbumsByGenre(genre: string): Album[] {
  return ALBUM_DATABASE.filter((album) =>
    album.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
  );
}
