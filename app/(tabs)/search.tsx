import { ScrollView, Text, View, Pressable, Image, TextInput, FlatList, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
import { searchAlbums, type Album } from "@/lib/musicbrainz-service";

// Default albums to show
const defaultAlbums: Album[] = [
  {
    id: "1",
    mbid: "1",
    title: "Midnights",
    artistName: "Taylor Swift",
    releaseDate: "2022",
    genres: ["Pop"],
    coverArtUrl: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    mbid: "2",
    title: "Rumours",
    artistName: "Fleetwood Mac",
    releaseDate: "1977",
    genres: ["Rock"],
    coverArtUrl: "https://via.placeholder.com/150",
  },
];

export default function SearchScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [albums, setAlbums] = useState<Album[]>(defaultAlbums);
  const [loading, setLoading] = useState(false);

  const genres = ["All", "Pop", "Rock", "Jazz", "Hip-Hop", "Classical", "Electronic"];

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const performSearch = async () => {
        setLoading(true);
        try {
          const results = await searchAlbums(searchQuery, 20);
          setAlbums(results.length > 0 ? results : defaultAlbums);
        } catch (error) {
          console.error("Search error:", error);
          setAlbums(defaultAlbums);
        } finally {
          setLoading(false);
        }
      };

      const timer = setTimeout(performSearch, 500);
      return () => clearTimeout(timer);
    } else {
      setAlbums(defaultAlbums);
    }
  }, [searchQuery]);

  const filteredAlbums = albums.filter((album) => {
    const matchesGenre = !selectedGenre || selectedGenre === "All" || album.genres?.includes(selectedGenre);
    return matchesGenre;
  });

  return (
    <ScreenContainer className="p-0">
      <FlatList
        data={filteredAlbums}
        keyExtractor={(item) => item.mbid}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, flex: 1 }]}
          >
            <View className="bg-surface rounded-lg overflow-hidden">
              <Image
                source={{ uri: item.coverArtUrl || "https://via.placeholder.com/150" }}
                style={{ width: "100%", height: 150, backgroundColor: colors.border }}
              />
              <View className="p-3">
                <Text className="text-sm font-bold text-foreground" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-xs text-muted mt-1" numberOfLines={1}>
                  {item.artistName}
                </Text>
                <Text className="text-xs text-muted mt-1">{item.releaseDate?.substring(0, 4)}</Text>
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

            {loading && (
              <View className="flex-row items-center gap-2 mb-3">
                <ActivityIndicator size="small" color={colors.primary} />
                <Text className="text-sm text-muted">Searching...</Text>
              </View>
            )}
            <Text className="text-sm text-muted mb-3">{filteredAlbums.length} albums found</Text>
          </View>
        }
        scrollEnabled={true}
      />
    </ScreenContainer>
  );
}
