# Vinyl Vault - Mobile App Interface Design

## Overview

Vinyl Vault is a music album logging and review app similar to Letterboxd but for music. Users can log albums they've listened to, rate them, specify listening format, write reviews, and customize their profiles. The app emphasizes discovery, community, and personal music curation.

---

## Screen List

1. **Home Feed** - Discover what others are listening to and logging
2. **Search & Discover** - Find albums by artist, title, or genre
3. **Album Detail** - View full album info, user reviews, and rating distribution
4. **Log Album** - Create a new listening log entry for an album
5. **My Profile** - View personal stats, favorite albums, and listening history
6. **Edit Profile** - Customize profile picture, bio, and favorite albums
7. **Settings** - App preferences, account settings, privacy
8. **Notifications** - Activity feed and social interactions
9. **My Ratings** - View all albums the user has rated/logged
10. **User Profile (Other)** - View another user's profile and activity

---

## Primary Content and Functionality

### 1. Home Feed
- **Content**: Scrollable list of recent album logs from followed users and community
- **Functionality**: 
  - Display album cover (thumbnail), artist name, album title, user who logged it, rating (stars), listening format icon
  - Tap to view full log entry and reviews
  - Like/comment on entries
  - Follow/unfollow users

### 2. Search & Discover
- **Content**: Search bar at top, filter options (genre, year, artist), trending albums grid
- **Functionality**:
  - Real-time search as user types
  - Filter by genre, release year, artist
  - Display album cards with cover art, artist, title
  - Tap to go to Album Detail

### 3. Album Detail
- **Content**: Large album cover, album metadata (artist, title, release date, genre, label), average rating, review count
- **Functionality**:
  - Display all user reviews/ratings for this album
  - Show listening format distribution (pie chart or bar chart)
  - "Log This Album" button to create new entry
  - View similar albums or artist's other albums

### 4. Log Album
- **Content**: Album cover (small), form fields for:
  - Rating (1-5 stars, interactive selector)
  - Listening format (dropdown: Vinyl, CD, Spotify, Apple Music, YouTube Music, etc.)
  - First time listening? (toggle)
  - Review text (optional, multi-line text input)
  - Date listened (date picker)
- **Functionality**:
  - Save log entry to database
  - Show success message and option to share or view album

### 5. My Profile
- **Content**: 
  - Profile picture (circular), username, bio
  - Stats: Total albums logged, average rating, favorite genres
  - "Favorite Albums" section (grid of 6-8 album covers)
  - Recent activity feed (last 10 logs)
- **Functionality**:
  - Tap profile picture to edit
  - Tap "Edit Profile" button to customize
  - Tap album in favorites to view detail
  - Swipe down to refresh activity

### 6. Edit Profile
- **Content**: 
  - Profile picture upload/camera option
  - Bio text input
  - Favorite albums picker (search and add up to 10)
  - Privacy settings (public/private profile)
- **Functionality**:
  - Upload custom profile picture
  - Save changes
  - Preview changes before saving

### 7. Settings
- **Content**: 
  - Account settings (email, password, logout)
  - Notification preferences (likes, comments, follows)
  - Dark/light mode toggle
  - About & version info
- **Functionality**:
  - Toggle notifications on/off
  - Change theme
  - Logout

### 8. Notifications
- **Content**: List of recent interactions (likes, comments, follows)
- **Functionality**:
  - Tap to navigate to relevant item
  - Mark as read
  - Clear all notifications

### 9. My Ratings
- **Content**: Filterable list/grid of all albums user has logged
- **Functionality**:
  - Sort by date, rating, artist
  - Filter by listening format
  - Tap to view/edit log entry

### 10. User Profile (Other)
- **Content**: Similar to My Profile but read-only
- **Functionality**:
  - Follow/unfollow button
  - View their favorite albums
  - View their recent activity

---

## Key User Flows

### Flow 1: Discover and Log an Album
1. User opens app → Home Feed
2. User sees album in feed or uses Search to find album
3. Tap album → Album Detail screen
4. Tap "Log This Album" button → Log Album screen
5. Select rating (stars), listening format, first time toggle, optional review
6. Tap "Save" → Success message
7. Option to view album detail or return to home

### Flow 2: Customize Profile
1. User taps Profile tab → My Profile
2. Tap "Edit Profile" → Edit Profile screen
3. Upload profile picture (camera or gallery)
4. Edit bio text
5. Add/remove favorite albums (search and select)
6. Tap "Save" → Return to My Profile with updates

### Flow 3: Explore Community
1. User opens app → Home Feed
2. Scroll through recent logs from other users
3. Tap user's name/picture → User Profile (Other)
4. Tap "Follow" button
5. View their favorite albums and recent activity
6. Return to home feed to see their future logs

### Flow 4: View Album Statistics
1. User searches for album → Album Detail
2. See average rating, total logs, listening format breakdown
3. Scroll to view all user reviews
4. Tap review to expand and read full text
5. Like/comment on reviews

---

## Color Choices

**Brand Colors for Vinyl Vault:**
- **Primary**: Deep Vinyl Black (#0F0F0F) - represents vinyl records
- **Accent**: Gold/Amber (#D4AF37) - premium, music industry feel
- **Background**: Off-white (#F5F5F5) light mode, Dark charcoal (#1A1A1A) dark mode
- **Success**: Warm Green (#2ECC71) - for positive actions
- **Error**: Warm Red (#E74C3C) - for destructive actions
- **Text Primary**: Near-black (#1C1C1C) light mode, Off-white (#F5F5F5) dark mode
- **Text Secondary**: Medium Gray (#7F8C8D) - for secondary text
- **Surface**: White (#FFFFFF) light mode, Dark gray (#2A2A2A) dark mode

**Visual Style:**
- Album covers are the hero element (large, prominent)
- Star ratings are gold/amber to match brand
- Listening format icons use simple, recognizable symbols
- Smooth transitions and subtle shadows for depth

---

## Technical Considerations

- **Portrait orientation only** (9:16 aspect ratio)
- **One-handed usage**: All interactive elements within thumb reach
- **Responsive lists**: Use FlatList for performance with large datasets
- **Image caching**: Album covers should be cached locally
- **Offline support**: Basic functionality works without internet (local logs)
- **Dark mode**: Full support with theme switching
