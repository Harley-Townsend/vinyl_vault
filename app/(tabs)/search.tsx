import { ScrollView, Text, View, Pressable, Image, TextInput, FlatList, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
import { searchItunesAlbums, type ItunesAlbum } from "@/lib/itunes-service";
import { searchLibrary, getFeaturedAlbums, getAllGenres, type LibraryAlbum } from "@/lib/music-library";

type Album = ItunesAlbum | (LibraryAlbum & { id: string });

export default function SearchScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [albums, setAlbums] = useState<Album[]>(getFeaturedAlbums(20).map((a, i) => ({ ...a, id: `lib-${i}` })));
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    setGenres(["All", ...getAllGenres()]);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const performSearch = async () => {
        setLoading(true);
        try {
          // First try iTunes API
          const itunesResults = await searchItunesAlbums(searchQuery, 30);
          
          if (itunesResults.length > 0) {
            setAlbums(itunesResults);
          } else {
            // Fallback to local library
            const libraryResults = searchLibrary(searchQuery);
            setAlbums(libraryResults.map((a, i) => ({ ...a, id: `lib-${i}` })));
          }
        } catch (error) {
          console.error("Search error:", error);
          // Fallback to local library on error
          const libraryResults = searchLibrary(searchQuery);
          setAlbums(libraryResults.map((a, i) => ({ ...a, id: `lib-${i}` })));
        } finally {
          setLoading(false);
        }
      };

      const timer = setTimeout(performSearch, 500);
      return () => clearTimeout(timer);
    } else {
      // Show featured albums when no search
      setAlbums(getFeaturedAlbums(20).map((a, i) => ({ ...a, id: `lib-${i}` })));
    }
  }, [searchQuery]);

  const filteredAlbums = selectedGenre && selectedGenre !== "All"
    ? albums.filter((album) => "genre" in album && album.genre === selectedGenre)
    : albums;

  return (
    <ScreenContainer className="p-0">
      <FlatList
        data={filteredAlbums}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, flex: 1 }]}
          >
            <View className="bg-surface rounded-lg overflow-hidden shadow-sm">
              <Image
                source={{ uri: "coverArtUrl" in item ? item.coverArtUrl : item.coverUrl }}
                style={{ width: "100%", height: 150, backgroundColor: colors.border }}
                defaultSource={require("@/assets/images/icon.png")}
              />
              <View className="p-3">
                <Text className="text-sm font-bold text-foreground" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-xs text-muted mt-1" numberOfLines={1}>
                  {"artistName" in item ? item.artistName : item.artist}
                </Text>
                {"releaseDate" in item && item.releaseDate && (
                  <Text className="text-xs text-muted mt-1">{item.releaseDate.substring(0, 4)}</Text>
                )}
                {"year" in item && item.year && (
                  <Text className="text-xs text-muted mt-1">{item.year}</Text>
                )}
              </View>
            </View>
          </Pressable>
        )}
        ListHeaderComponent={
          <View className="p-4 pb-2">
            <Text className="text-3xl font-bold text-foreground mb-4">Search Albums</Text>

            {/* Search Input */}
            <TextInput
              placeholder="Search by album or artist..."
              placeholderTextColor={colors.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground mb-4"
            />

            {/* Genre Filter */}
            {genres.length > 0 && (
              <>
                <Text className="text-sm font-semibold text-foreground mb-2">Genre</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                  {genres.map((genre) => (
                    <Pressable
                      key={genre}
                      onPress={() => setSelectedGenre(genre === "All" ? null : genre)}
                      style={({ pressed }) => [
                        {
                          backgroundColor:
                            (genre === "All" && !selectedGenre) || selectedGenre === genre
                              ? colors.primary
                              : colors.surface,
                          opacity: pressed ? 0.8 : 1,
                        },
                      ]}
                      className="px-4 py-2 rounded-full mr-2 border border-border"
                    >
                      <Text
                        style={{
                          color:
                            (genre === "All" && !selectedGenre) || selectedGenre === genre
                              ? "#fff"
                              : colors.foreground,
                        }}
                        className="text-sm font-semibold"
                      >
                        {genre}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </>
            )}

            {/* Loading State */}
            {loading && (
              <View className="flex-row items-center gap-2 mb-4">
                <ActivityIndicator size="small" color={colors.primary} />
                <Text className="text-sm text-muted">Searching...</Text>
              </View>
            )}

            {/* Results Count */}
            {!loading && (
              <Text className="text-sm text-muted mb-4">
                {filteredAlbums.length} albums found
              </Text>
            )}

            {/* Empty State */}
            {!loading && searchQuery.trim().length > 2 && filteredAlbums.length === 0 && (
              <Text className="text-sm text-muted text-center py-8">
                No albums found. Try a different search.
              </Text>
            )}

            {/* Initial State */}
            {searchQuery.trim().length === 0 && (
              <Text className="text-sm text-muted text-center py-2">
                Featuring popular albums...
              </Text>
            )}
          </View>
        }
        scrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}
