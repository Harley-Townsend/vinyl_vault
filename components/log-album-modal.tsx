import { Modal, Text, View, Pressable, TextInput, ScrollView, FlatList, Image, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
import { HalfStarRating } from "./half-star-rating";

export interface LogAlbumData {
  albumId: string;
  albumTitle: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  genres: string[];
  rating: number;
  format: string;
  review: string;
  isFirstTime: boolean;
}

interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  genres: string[];
}

interface LogAlbumModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: LogAlbumData) => void;
  initialData?: Partial<LogAlbumData>;
}

const FORMATS = ["Vinyl", "CD", "Cassette", "Digital", "Spotify", "Apple Music", "YouTube Music", "Other"];

// Mock album database
const ALBUM_DATABASE: Album[] = [
  {
    id: "1",
    title: "Midnights",
    artist: "Taylor Swift",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
    releaseDate: "2022-10-21",
    genres: ["Pop"],
  },
  {
    id: "2",
    title: "Rumours",
    artist: "Fleetwood Mac",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b27357df7ce0eac715cf70e519a7",
    releaseDate: "1977-02-04",
    genres: ["Rock"],
  },
  {
    id: "3",
    title: "Blinding Lights",
    artist: "The Weeknd",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273a3eff72f62782fb589a492f9",
    releaseDate: "2020-09-11",
    genres: ["Synthwave", "Electronic"],
  },
  {
    id: "4",
    title: "1989",
    artist: "Taylor Swift",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273",
    releaseDate: "2014-10-27",
    genres: ["Pop"],
  },
  {
    id: "5",
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273",
    releaseDate: "1973-03-01",
    genres: ["Rock", "Progressive Rock"],
  },
];

export function LogAlbumModal({ visible, onClose, onSubmit, initialData }: LogAlbumModalProps) {
  const colors = useColors();

  const [step, setStep] = useState<"search" | "details">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const [rating, setRating] = useState(initialData?.rating || 0);
  const [format, setFormat] = useState(initialData?.format || "Spotify");
  const [review, setReview] = useState(initialData?.review || "");
  const [isFirstTime, setIsFirstTime] = useState(initialData?.isFirstTime ?? true);

  // Search albums when query changes
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = ALBUM_DATABASE.filter(
        (album) =>
          album.title.toLowerCase().includes(query) ||
          album.artist.toLowerCase().includes(query)
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setStep("details");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSubmit = () => {
    if (!selectedAlbum || rating === 0) {
      alert("Please select an album and rate it");
      return;
    }

    onSubmit({
      albumId: selectedAlbum.id,
      albumTitle: selectedAlbum.title,
      artist: selectedAlbum.artist,
      coverUrl: selectedAlbum.coverUrl,
      releaseDate: selectedAlbum.releaseDate,
      genres: selectedAlbum.genres,
      rating,
      format,
      review,
      isFirstTime,
    });

    // Reset form
    setStep("search");
    setSearchQuery("");
    setSelectedAlbum(null);
    setRating(0);
    setFormat("Spotify");
    setReview("");
    setIsFirstTime(true);

    onClose();
  };

  const handleBack = () => {
    if (step === "details") {
      setStep("search");
      setSelectedAlbum(null);
      setRating(0);
      setReview("");
    } else {
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        {/* Header - Lowered for mobile accessibility */}
        <View className="flex-row items-center justify-between p-6 pb-8 border-b border-border">
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            className="px-3 py-3"
          >
            <Text className="text-base font-semibold text-primary">
              {step === "details" ? "Back" : "Cancel"}
            </Text>
          </Pressable>
          <Text className="text-xl font-bold text-foreground">
            {step === "search" ? "Find Album" : "Log Album"}
          </Text>
          <View className="w-12" />
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
          {step === "search" ? (
            // Search Step
            <View className="flex-1 p-4">
              {/* Search Input */}
              <TextInput
                placeholder="Search by album or artist..."
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground mb-4"
                style={{ color: colors.foreground }}
              />

              {/* Loading State */}
              {isSearching && (
                <View className="flex-1 items-center justify-center">
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              )}

              {/* Search Results */}
              {!isSearching && searchResults.length > 0 && (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => handleSelectAlbum(item)}
                      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                      className="flex-row gap-3 bg-surface rounded-lg p-3 mb-3"
                    >
                      <Image
                        source={{ uri: item.coverUrl }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 6,
                          backgroundColor: colors.border,
                        }}
                      />
                      <View className="flex-1 justify-center">
                        <Text className="font-semibold text-foreground text-sm">{item.title}</Text>
                        <Text className="text-xs text-muted">{item.artist}</Text>
                        <View className="flex-row gap-1 mt-1 flex-wrap">
                          {item.genres.map((genre, idx) => (
                            <Text key={idx} className="text-xs bg-primary px-2 py-0.5 rounded text-white">
                              {genre}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </Pressable>
                  )}
                />
              )}

              {/* Empty State */}
              {!isSearching && searchQuery.trim().length > 0 && searchResults.length === 0 && (
                <View className="flex-1 items-center justify-center">
                  <Text className="text-muted text-center">No albums found</Text>
                </View>
              )}

              {/* Initial State */}
              {searchQuery.trim().length === 0 && (
                <View className="flex-1 items-center justify-center">
                  <Text className="text-muted text-center">Search for an album to get started</Text>
                </View>
              )}
            </View>
          ) : (
            // Details Step
            <View className="p-4">
              {selectedAlbum && (
                <>
                  {/* Album Preview */}
                  <View className="items-center mb-6">
                    <Image
                      source={{ uri: selectedAlbum.coverUrl }}
                      style={{
                        width: 140,
                        height: 140,
                        borderRadius: 8,
                        backgroundColor: colors.border,
                        marginBottom: 12,
                      }}
                    />
                    <Text className="text-2xl font-bold text-foreground text-center mb-1">
                      {selectedAlbum.title}
                    </Text>
                    <Text className="text-base text-muted text-center">{selectedAlbum.artist}</Text>
                  </View>

                  {/* Rating Section */}
                  <View className="mb-6 pb-6 border-b border-border">
                    <Text className="text-sm font-semibold text-muted mb-3">YOUR RATING</Text>
                    <View className="flex-row justify-center mb-3">
                      <HalfStarRating rating={rating} onRate={setRating} editable size={32} />
                    </View>
                    <View className="flex-row justify-center gap-2 flex-wrap">
                      {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((r) => (
                        <Pressable
                          key={r}
                          onPress={() => {
                            setRating(r);
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          }}
                          style={({ pressed }) => [
                            { opacity: pressed ? 0.7 : 1 },
                            rating === r && { backgroundColor: colors.primary },
                            rating !== r && { backgroundColor: colors.surface },
                          ]}
                          className="px-3 py-2 rounded-full border border-border"
                        >
                          <Text
                            className={rating === r ? "text-white font-semibold" : "text-foreground"}
                          >
                            {r}★
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  {/* Format Section */}
                  <View className="mb-6 pb-6 border-b border-border">
                    <Text className="text-sm font-semibold text-muted mb-3">HOW DID YOU LISTEN?</Text>
                    <View className="flex-row flex-wrap gap-2">
                      {FORMATS.map((f) => (
                        <Pressable
                          key={f}
                          onPress={() => {
                            setFormat(f);
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          }}
                          style={({ pressed }) => [
                            { opacity: pressed ? 0.7 : 1 },
                            format === f && { backgroundColor: colors.primary },
                            format !== f && { backgroundColor: colors.surface },
                          ]}
                          className="px-3 py-2 rounded-full border border-border"
                        >
                          <Text className={format === f ? "text-white font-semibold text-xs" : "text-foreground text-xs"}>
                            {f}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  {/* Review Section */}
                  <View className="mb-6 pb-6 border-b border-border">
                    <Text className="text-sm font-semibold text-muted mb-2">YOUR REVIEW</Text>
                    <TextInput
                      placeholder="Share your thoughts... (optional)"
                      placeholderTextColor={colors.muted}
                      value={review}
                      onChangeText={setReview}
                      multiline
                      numberOfLines={4}
                      className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                      style={{ color: colors.foreground, textAlignVertical: "top" }}
                    />
                  </View>

                  {/* First Time Listening */}
                  <View className="mb-6 pb-6 border-b border-border">
                    <Pressable
                      onPress={() => {
                        setIsFirstTime(!isFirstTime);
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }}
                      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                      className="flex-row items-center gap-3"
                    >
                      <View
                        className={`w-6 h-6 rounded border-2 items-center justify-center ${
                          isFirstTime ? "bg-primary border-primary" : "border-border"
                        }`}
                      >
                        {isFirstTime && <Text className="text-white font-bold text-sm">✓</Text>}
                      </View>
                      <Text className="text-foreground">First time listening</Text>
                    </Pressable>
                  </View>

                  {/* Submit Button */}
                  <Pressable
                    onPress={handleSubmit}
                    style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                    className="bg-primary rounded-lg py-3 items-center mb-4"
                  >
                    <Text className="text-white font-semibold text-base">Log Album</Text>
                  </Pressable>
                </>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
