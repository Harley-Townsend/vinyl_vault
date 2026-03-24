import { ScrollView, Text, View, Pressable, Image, FlatList, TextInput, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
import { ALBUM_DATABASE, searchAlbums, getAlbumsByGenre } from "@/lib/album-database";

interface Album {
  id: string;
  title: string;
  artist: string;
  releaseDate?: string;
  coverUrl: string;
  genres?: string[];
}

export default function SearchScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setLoading(true);
      setError(null);
      
      try {
        // Search local album database
        const results = searchAlbums(searchQuery);
        
        setAlbums(results);
        if (results.length === 0) {
          setError("No albums found. Try a different search.");
        }
      } catch (err) {
        console.error("Search error:", err);
        setError("Error searching albums. Please try again.");
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    } else {
      setAlbums([]);
      setError(null);
    }
  }, [searchQuery]);

  // Show featured albums when no search query
  const displayAlbums = searchQuery.trim().length === 0 ? ALBUM_DATABASE.slice(0, 12) : albums;

  return (
    <ScreenContainer className="p-0">
      <FlatList
        data={displayAlbums}
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
              {item.coverUrl ? (
                <Image
                  source={{ uri: item.coverUrl }}
                  style={{ width: "100%", height: 150, backgroundColor: colors.border }}
                />
              ) : (
                <View style={{ width: "100%", height: 150, backgroundColor: colors.border }} />
              )}
              <View className="p-3">
                <Text className="text-sm font-bold text-foreground" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-xs text-muted mt-1" numberOfLines={1}>
                  {item.artist}
                </Text>
                {item.releaseDate && (
                  <Text className="text-xs text-muted mt-1">{item.releaseDate.substring(0, 4)}</Text>
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

            {/* Loading State */}
            {loading && (
              <View className="flex-row items-center gap-2 mb-4">
                <ActivityIndicator size="small" color={colors.primary} />
                <Text className="text-sm text-muted">Searching albums...</Text>
              </View>
            )}

            {/* Error State */}
            {error && !loading && (
              <Text className="text-sm text-error mb-4">{error}</Text>
            )}

            {/* Results Count */}
            {!loading && searchQuery.trim().length > 0 && albums.length > 0 && (
              <Text className="text-sm text-muted mb-4">
                {albums.length} albums found
              </Text>
            )}

            {/* Initial State - Show Featured Albums */}
            {searchQuery.trim().length === 0 && (
              <Text className="text-sm text-muted mb-4">
                Featured Albums
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
