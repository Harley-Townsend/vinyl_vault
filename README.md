# Groovebox

A modern music album logging and discovery platform for vinyl enthusiasts and music lovers. Log your favorite albums, rate them with precision, connect with other music fans, and discover new music through your community.

## Features

**Album Logging** — Search and log albums with half-star ratings (0.5 increments), format selection (Vinyl, CD, Cassette, Digital, Streaming), and personal reviews.

**Social Community** — Follow other users, view their album logs, like and comment on reviews, and build a personalized feed from followed users.

**Statistics Dashboard** — Track your listening habits with genre breakdowns, average ratings, and recently logged albums.

**Profile Timeline** — View all your logged albums in a beautiful diary/timeline with filtering by date and rating.

**User Discovery** — Tap on any commenter's name to view their profile and follow them directly.

## Tech Stack

- **Frontend:** React Native with Expo SDK 54, TypeScript, NativeWind (Tailwind CSS)
- **Navigation:** Expo Router with tab-based UI
- **State Management:** React Context + AsyncStorage
- **Styling:** NativeWind v4 with custom theme tokens
- **Testing:** Vitest with 22+ unit tests

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Expo CLI

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

This starts both the Metro bundler and development server. Access the app at the provided URL or scan the QR code in Expo Go.

### Testing

```bash
pnpm test
```

## Project Structure

```
app/
  (tabs)/
    index.tsx          ← Home feed with album logs
    search.tsx         ← Album search with suggestions
    profile.tsx        ← User profile with diary timeline
    settings.tsx       ← App settings
  user-profile.tsx     ← Other user profiles with follow
  _layout.tsx          ← Root layout with providers

components/
  log-album-modal.tsx  ← Album logging modal
  half-star-rating.tsx ← Rating component
  screen-container.tsx ← SafeArea wrapper

lib/
  follow-context.tsx   ← Follow system state
  stats-context.tsx    ← Statistics calculations
  album-database.ts    ← 100+ album library

assets/images/
  icon.png             ← App icon (modern minimal design)
```

## Branding

**App Name:** Groovebox  
**Primary Color:** #0a7ea4 (Modern Blue)  
**Accent Color:** #FFD700 (Gold)  
**Logo:** Modern minimal design featuring a stylized box with vinyl record and sound bars

## Future Enhancements

- User discovery/search by username or shared genres
- Real-time notifications for follows, likes, and comments
- Album sharing via deep links and social media
- Review editing and deletion
- Playlist creation from logged albums
- Advanced filtering and sorting options

## License

Private project for Groovebox
