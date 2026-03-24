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
  { id: "56", title: "Chromatica", artist: "Lady Gaga", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2020-05-29", genres: ["Pop", "Electronic"], description: "Dance-pop album with uplifting themes." },
  { id: "57", title: "Folklore", artist: "Taylor Swift", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2020-07-24", genres: ["Pop", "Indie"], description: "Indie-folk inspired album with storytelling." },
  { id: "58", title: "Evermore", artist: "Taylor Swift", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2020-12-11", genres: ["Pop", "Indie"], description: "Sister album to Folklore with continued narrative." },
  { id: "59", title: "Midnights (3am Edition)", artist: "Taylor Swift", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2023-10-27", genres: ["Pop"], description: "Extended edition of Midnights with bonus tracks." },
  { id: "60", title: "Future Nostalgia (Moonlight Edition)", artist: "Dua Lipa", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2021-03-19", genres: ["Disco", "Pop"], description: "Remixed version of Future Nostalgia." },

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
  { id: "61", title: "The Wall", artist: "Pink Floyd", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1979-11-30", genres: ["Rock", "Progressive Rock"], description: "Concept album about isolation and alienation." },
  { id: "62", title: "Wish You Were Here", artist: "Pink Floyd", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1975-09-15", genres: ["Rock", "Progressive Rock"], description: "Tribute to former band member Syd Barrett." },
  { id: "63", title: "The Division Bell", artist: "Pink Floyd", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1994-04-04", genres: ["Rock", "Progressive Rock"], description: "Pink Floyd's final studio album with David Gilmour." },
  { id: "64", title: "Houses of the Holy", artist: "Led Zeppelin", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1973-03-23", genres: ["Rock", "Hard Rock"], description: "Epic hard rock album with diverse influences." },
  { id: "65", title: "Physical Graffiti", artist: "Led Zeppelin", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1975-02-20", genres: ["Rock", "Hard Rock"], description: "Double album showcasing Zeppelin's range." },
  { id: "66", title: "A Night at the Opera", artist: "Queen", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1975-11-21", genres: ["Rock", "Opera"], description: "Opera-influenced rock album with Bohemian Rhapsody." },
  { id: "67", title: "News of the World", artist: "Queen", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1977-10-28", genres: ["Rock"], description: "Queen album featuring We Will Rock You." },
  { id: "68", title: "The Queen is Dead", artist: "The Smiths", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1986-06-16", genres: ["Alternative Rock", "Indie"], description: "Indie rock masterpiece with witty lyrics." },
  { id: "69", title: "Doolittle", artist: "Pixies", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1989-04-03", genres: ["Alternative Rock"], description: "Influential alternative rock album." },
  { id: "70", title: "Surfer Rosa", artist: "Pixies", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1988-03-08", genres: ["Alternative Rock"], description: "Raw and energetic alternative rock debut." },

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
  { id: "71", title: "Graduation", artist: "Kanye West", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2007-09-11", genres: ["Hip-Hop", "Rap"], description: "Electro-influenced hip-hop album." },
  { id: "72", title: "808s & Heartbreak", artist: "Kanye West", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2008-11-24", genres: ["Hip-Hop", "Rap"], description: "Emotional hip-hop album with auto-tuned vocals." },
  { id: "73", title: "My Beautiful Dark Twisted Fantasy", artist: "Kanye West", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2010-11-22", genres: ["Hip-Hop", "Rap"], description: "Maximalist hip-hop masterpiece." },
  { id: "74", title: "Yeezus", artist: "Kanye West", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2013-06-18", genres: ["Hip-Hop", "Rap"], description: "Experimental and abrasive hip-hop album." },
  { id: "75", title: "Section.80", artist: "Kendrick Lamar", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2011-07-02", genres: ["Hip-Hop", "Rap"], description: "Kendrick's debut mixtape turned album." },
  { id: "76", title: "Mr. Morale & The Big Steppers", artist: "Kendrick Lamar", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2022-05-13", genres: ["Hip-Hop", "Rap"], description: "Introspective hip-hop album exploring healing." },
  { id: "77", title: "Liquid Swords", artist: "GZA", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1995-03-09", genres: ["Hip-Hop", "Rap"], description: "Wu-Tang Clan member's solo masterpiece." },
  { id: "78", title: "Only Built 4 Cuban Linx", artist: "Raekwon", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1995-08-01", genres: ["Hip-Hop", "Rap"], description: "Cinematic hip-hop album with vivid storytelling." },
  { id: "79", title: "Enter the Wu-Tang (36 Chambers)", artist: "Wu-Tang Clan", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1993-11-09", genres: ["Hip-Hop", "Rap"], description: "Legendary hip-hop collective debut." },
  { id: "80", title: "Aquemini", artist: "OutKast", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1998-09-29", genres: ["Hip-Hop", "Rap"], description: "Southern hip-hop masterpiece with diverse production." },

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
  { id: "81", title: "Coltrane Jazz", artist: "John Coltrane", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1962-02-15", genres: ["Jazz"], description: "Collection of Coltrane's modal jazz explorations." },
  { id: "82", title: "Sunship", artist: "John Coltrane", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1971-11-01", genres: ["Jazz"], description: "Spiritual jazz with cosmic themes." },
  { id: "83", title: "Mingus Ah Um", artist: "Charles Mingus", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1959-04-20", genres: ["Jazz"], description: "Jazz masterpiece with innovative orchestration." },
  { id: "84", title: "Brilliant Corners", artist: "Thelonious Monk", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1957-03-20", genres: ["Jazz"], description: "Thelonious Monk's influential debut album." },
  { id: "85", title: "Monk's Dream", artist: "Thelonious Monk", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1963-02-28", genres: ["Jazz"], description: "Monk's exploration of his own compositions." },
  { id: "86", title: "Saxophone Colossus", artist: "Sonny Rollins", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1956-09-18", genres: ["Jazz"], description: "Sonny Rollins' breakthrough album." },
  { id: "87", title: "Waltz for Debby", artist: "Bill Evans Trio", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1962-06-25", genres: ["Jazz"], description: "Intimate jazz trio recording." },
  { id: "88", title: "Trio", artist: "Bill Evans", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1978-03-15", genres: ["Jazz"], description: "Bill Evans' later trio work." },
  { id: "89", title: "Milt Jackson Quartet", artist: "Milt Jackson", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1955-01-01", genres: ["Jazz"], description: "Vibraphone-led jazz quartet." },
  { id: "90", title: "Cookin' with the Miles Davis Quintet", artist: "Miles Davis", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1957-03-02", genres: ["Jazz"], description: "Miles Davis' first great quintet recording." },

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
  { id: "91", title: "Cosmogramma", artist: "Flying Lotus", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2010-05-04", genres: ["Electronic", "Jazz"], description: "Jazz-influenced electronic masterpiece." },
  { id: "92", title: "You're Dead!", artist: "Flying Lotus", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2014-10-07", genres: ["Electronic", "Jazz"], description: "Spiritual electronic jazz fusion." },
  { id: "93", title: "Blonde", artist: "Frank Ocean", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2016-08-20", genres: ["Electronic", "R&B"], description: "Experimental electronic R&B album." },
  { id: "94", title: "Channel Orange", artist: "Frank Ocean", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2012-07-10", genres: ["Electronic", "R&B"], description: "Psychedelic R&B and electronic masterpiece." },
  { id: "95", title: "Carrie & Lowell", artist: "Sufjan Stevens", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2015-03-31", genres: ["Electronic", "Indie"], description: "Intimate electronic indie album about grief." },
  { id: "96", title: "Vespertine", artist: "Bjork", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2001-08-28", genres: ["Electronic", "Experimental"], description: "Intimate electronic album with orchestral elements." },
  { id: "97", title: "Homogenic", artist: "Bjork", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1997-09-30", genres: ["Electronic", "Experimental"], description: "Experimental electronic album with orchestral arrangements." },
  { id: "98", title: "Debut", artist: "Bjork", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "1993-07-07", genres: ["Electronic", "Experimental"], description: "Bjork's debut album with electronic and experimental sounds." },
  { id: "99", title: "Alive 2007", artist: "Daft Punk", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2007-11-19", genres: ["Electronic", "House"], description: "Live album from Daft Punk's legendary Paris concert." },
  { id: "100", title: "Overgrown", artist: "James Blake", coverUrl: "https://i.scdn.co/image/ab67616d0000b273", releaseDate: "2013-04-08", genres: ["Electronic", "Dubstep"], description: "Minimalist electronic album with emotional depth." },

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
