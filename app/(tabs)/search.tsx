import { ScrollView, Text, View, FlatList, ActivityIndicator, Pressable, TextInput, Image } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { searchAlbums, type AlbumSearchResult } from "@/lib/musicbrainz";

// Fallback mock data for albums
const MOCK_ALBUMS: AlbumSearchResult[] = [
  {
    id: "1",
    mbid: "12c6b89c-b246-4171-b32b-b97f168128d3",
    title: "The Dark Side of the Moon",
    artistName: "Pink Floyd",
    releaseDate: "1973-03-01",
    genres: ["Progressive Rock", "Psychedelic Rock"],
    coverArtUrl: "https://via.placeholder.com/150/4a4a4a/ffffff?text=Dark+Side",
  },
  {
    id: "2",
    mbid: "9e444147-36ab-4a74-b1cb-2577b395e713",
    title: "Abbey Road",
    artistName: "The Beatles",
    releaseDate: "1969-09-26",
    genres: ["Rock", "Pop"],
    coverArtUrl: "https://via.placeholder.com/150/8b7355/ffffff?text=Abbey+Road",
  },
  {
    id: "3",
    mbid: "f3c8a853-8d74-4539-a91f-2408a126e77d",
    title: "Rumours",
    artistName: "Fleetwood Mac",
    releaseDate: "1977-02-04",
    genres: ["Rock", "Pop Rock"],
    coverArtUrl: "https://via.placeholder.com/150/d4a574/000000?text=Rumours",
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState<AlbumSearchResult[]>(MOCK_ALBUMS);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const genres = ["Rock", "Pop", "Jazz", "Hip-Hop", "Electronic", "Classical"];

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim().length < 2) {
        setFilteredAlbums(MOCK_ALBUMS);
        return;
      }

      try {
        setIsSearching(true);
        const results = await searchAlbums(searchQuery, 20);

        let filtered = results;
        if (selectedGenre) {
          filtered = filtered.filter((album) =>
            album.genres?.includes(selectedGenre)
          );
        }

        setFilteredAlbums(filtered.length > 0 ? filtered : MOCK_ALBUMS);
      } catch (error) {
        console.error("Search error:", error);
        setFilteredAlbums(MOCK_ALBUMS);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedGenre]);

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">Search Albums</Text>
        </View>

        {/* Search Bar */}
        <View className="px-6 py-4 border-b border-border">
          <TextInput
            placeholder="Search by album or artist..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="bg-surface text-foreground px-4 py-3 rounded-lg border border-border"
          />
          {searchQuery.trim().length > 0 && searchQuery.trim().length < 2 && (
            <Text className="text-xs text-warning mt-2">Type at least 2 characters to search</Text>
          )}
        </View>

        {/* Genre Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-6 py-3 border-b border-border"
        >
          {genres.map((genre) => (
            <Pressable
              key={genre}
              onPress={() => {
                setSelectedGenre(selectedGenre === genre ? null : genre);
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              className={`mr-3 px-4 py-2 rounded-full ${
                selectedGenre === genre ? "bg-primary" : "bg-surface border border-border"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedGenre === genre ? "text-background" : "text-foreground"
                }`}
              >
                {genre}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Albums List */}
        {filteredAlbums.length === 0 && !isSearching ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
            <View className="flex-1 items-center justify-center">
              <Text className="text-lg font-semibold text-foreground">No albums found</Text>
              <Text className="text-sm text-muted mt-2 text-center">
                Try searching with different keywords or filters.
              </Text>
            </View>
          </ScrollView>
        ) : isSearching ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text className="text-muted mt-2">Searching MusicBrainz...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredAlbums}
            keyExtractor={(item) => item.mbid}
            renderItem={({ item }) => (
              <AlbumCard
                album={item}
                onPress={() => {
                  router.navigate({
                    pathname: "/(tabs)/log-album",
                    params: { albumId: item.id, albumData: JSON.stringify(item) },
                  } as any);
                }}
              />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

function AlbumCard({ album, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      className="px-6 py-4 border-b border-border"
    >
      <View className="flex-row gap-4">
        {/* Album Cover */}
        <View className="w-20 h-20 bg-surface rounded-lg overflow-hidden">
          {album.coverArtUrl ? (
            <Image
              source={{ uri: album.coverArtUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full items-center justify-center bg-border">
              <Text className="text-xs text-muted">No Art</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View className="flex-1 justify-center">
          <Text className="text-base font-semibold text-foreground" numberOfLines={2}>
            {album.title}
          </Text>
          <Text className="text-sm text-muted mt-1">{album.artistName}</Text>
          {album.releaseDate && (
            <Text className="text-xs text-muted mt-2">
              {new Date(album.releaseDate).getFullYear()}
            </Text>
          )}

          {/* Genres */}
          {album.genres && album.genres.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mt-2">
              {album.genres.slice(0, 2).map((genre: string) => (
                <Text key={genre} className="text-xs bg-surface px-2 py-1 rounded text-muted">
                  {genre}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Arrow */}
        <View className="justify-center">
          <Text className="text-primary text-lg">→</Text>
        </View>
      </View>
    </Pressable>
  );
}
