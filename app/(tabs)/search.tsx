import { ScrollView, Text, View, Pressable, Image, TextInput, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import * as Haptics from "expo-haptics";

// Mock album data
const mockAlbums = [
  {
    id: 1,
    title: "Midnights",
    artist: "Taylor Swift",
    year: 2022,
    genre: "Pop",
    coverUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Rumours",
    artist: "Fleetwood Mac",
    year: 1977,
    genre: "Rock",
    coverUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
    genre: "Progressive Rock",
    coverUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    genre: "Rock",
    coverUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    genre: "Pop",
    coverUrl: "https://via.placeholder.com/150",
  },
];

export default function SearchScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const genres = ["All", "Pop", "Rock", "Jazz", "Hip-Hop", "Classical", "Electronic"];

  const filteredAlbums = mockAlbums.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || selectedGenre === "All" || album.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <ScreenContainer className="p-0">
      <FlatList
        data={filteredAlbums}
        keyExtractor={(item) => item.id.toString()}
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
                source={{ uri: item.coverUrl }}
                style={{ width: "100%", height: 150, backgroundColor: colors.border }}
              />
              <View className="p-3">
                <Text className="text-sm font-bold text-foreground" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-xs text-muted mt-1" numberOfLines={1}>
                  {item.artist}
                </Text>
                <Text className="text-xs text-muted mt-1">{item.year}</Text>
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

            <Text className="text-sm text-muted mb-3">{filteredAlbums.length} albums found</Text>
          </View>
        }
        scrollEnabled={true}
      />
    </ScreenContainer>
  );
}
