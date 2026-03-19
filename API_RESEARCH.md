# Vinyl Vault - Music API Research & Data Models

## Music API Options

### 1. MusicBrainz API (Recommended)

**Pros:**
- Completely free and open-source
- No API key required (just need User-Agent header)
- Comprehensive music metadata: artists, albums, release dates, genres, labels
- Supports both XML and JSON responses
- Rate limit: 1 request per second (reasonable for app usage)
- No commercial restrictions for non-commercial use

**Cons:**
- Rate limited to 1 request/second
- Requires proper User-Agent string
- Data quality depends on community contributions

**Key Endpoints:**
- Search: `/ws/2/release?query=<query>` - Search for albums
- Lookup: `/ws/2/release/<mbid>?inc=<includes>` - Get detailed album info
- Browse: `/ws/2/release?artist=<artist_mbid>` - Browse artist's albums

**Data Available:**
- Album title, artist, release date, genres, labels
- Track listings, cover art (via Cover Art Archive)
- Relationships and linked entities

### 2. Last.fm API

**Pros:**
- Free API tier available
- Good for user listening history and scrobbling
- Album information and user ratings
- Social features built-in

**Cons:**
- Requires API key registration
- Rate limits on free tier
- Better for tracking user plays than metadata

**Key Endpoints:**
- `album.getInfo` - Get album information
- `album.search` - Search for albums
- `artist.getTopAlbums` - Get artist's top albums

### 3. TheAudioDB API

**Pros:**
- Free music database API
- Good album artwork and metadata
- No authentication required

**Cons:**
- Smaller database than MusicBrainz
- Less comprehensive metadata

---

## Recommended Architecture

**Primary API: MusicBrainz**
- Use for album search and metadata
- Reliable, free, comprehensive
- Cover Art Archive for album artwork

**Secondary: Last.fm (Optional)**
- User listening history tracking
- Social recommendations
- User ratings aggregation

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_picture_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Albums Table
```sql
CREATE TABLE albums (
  id UUID PRIMARY KEY,
  mbid VARCHAR(36) UNIQUE NOT NULL, -- MusicBrainz ID
  title VARCHAR(255) NOT NULL,
  artist_name VARCHAR(255) NOT NULL,
  release_date DATE,
  genres TEXT[], -- Array of genres
  label VARCHAR(255),
  cover_art_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### User Logs (Album Listening Entries)
```sql
CREATE TABLE user_logs (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  album_id UUID NOT NULL REFERENCES albums(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  listening_format VARCHAR(50), -- 'vinyl', 'cd', 'spotify', 'apple_music', etc.
  is_first_listen BOOLEAN DEFAULT FALSE,
  review_text TEXT,
  listened_at DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Reviews/Comments Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  log_id UUID NOT NULL REFERENCES user_logs(id),
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Likes Table
```sql
CREATE TABLE likes (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  log_id UUID NOT NULL REFERENCES user_logs(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, log_id)
);
```

### Follows Table
```sql
CREATE TABLE follows (
  id UUID PRIMARY KEY,
  follower_id UUID NOT NULL REFERENCES users(id),
  following_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);
```

### Favorite Albums Table
```sql
CREATE TABLE favorite_albums (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  album_id UUID NOT NULL REFERENCES albums(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, album_id)
);
```

---

## API Integration Strategy

### Frontend Flow:
1. User searches for album → Call MusicBrainz search endpoint
2. Display results with album info
3. User selects album → Fetch full details from MusicBrainz
4. User logs album → Save to backend database with rating, format, review
5. Backend stores album metadata and user log entry

### Caching Strategy:
- Cache album metadata locally (MusicBrainz data rarely changes)
- Cache user logs in AsyncStorage for offline access
- Sync with backend when online

### Rate Limiting Handling:
- Implement request queue to respect 1 req/sec limit
- Use exponential backoff for retries
- Show loading states during API calls

---

## Implementation Priority

1. **Phase 1**: Backend auth + database schema
2. **Phase 2**: MusicBrainz API integration for search
3. **Phase 3**: Frontend screens (search, album detail, log entry)
4. **Phase 4**: User profiles and social features
5. **Phase 5**: Polish and optimization
