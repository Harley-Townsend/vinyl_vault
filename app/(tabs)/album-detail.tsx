import { ScrollView, Text, View, Pressable, Image, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { HalfStarRating } from "@/components/half-star-rating";
import * as Haptics from "expo-haptics";
import { useState } from "react";

interface AlbumReview {
  id: number;
  userName: string;
  rating: number;
  format: string;
  review: string;
  timestamp: string;
}

export default function AlbumDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse album data from route params
  const albumId = params.albumId as string;
  const album = {
    id: albumId,
    title: params.title as string,
    artist: params.artist as string,
    coverUrl: params.coverUrl as string,
    releaseDate: params.releaseDate as string,
    genres: (params.genres as string)?.split(",") || ["Unknown"],
    description: params.description as string || "No description available",
  };

  // Mock reviews for this album (in a real app, this would come from the backend)
  const [reviews] = useState<AlbumReview[]>([
    {
      id: 1,
      userName: "musiclover92",
      rating: 4.5,
      format: "Vinyl",
      review: "Amazing album! Love the production.",
      timestamp: "2h ago",
    },
    {
      id: 2,
      userName: "synthwave_fan",
      rating: 4,
      format: "Spotify",
      review: "Great synth-pop vibes throughout.",
      timestamp: "1h ago",
    },
  ]);

  // Calculate overall album rating
  const overallRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : 0;

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header with back button */}
        <View className="flex-row items-center gap-3 p-4 border-b border-border">
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, padding: 8, marginLeft: -8 }]}
          >
            <Text className="text-2xl">←</Text>
          </Pressable>
          <Text className="text-xl font-bold text-foreground flex-1" numberOfLines={1}>
            Album Info
          </Text>
        </View>

        {/* Album Cover */}
        <View className="p-6 items-center">
          {album.coverUrl ? (
            <Image
              source={{ uri: album.coverUrl }}
              style={{
                width: 220,
                height: 220,
                borderRadius: 12,
                backgroundColor: colors.border,
              }}
            />
          ) : (
            <View
              style={{
                width: 220,
                height: 220,
                borderRadius: 12,
                backgroundColor: colors.border,
              }}
            />
          )}
        </View>

        {/* Album Info */}
        <View className="px-6 pb-6">
          {/* Title */}
          <Text className="text-3xl font-bold text-foreground mb-2">{album.title}</Text>

          {/* Artist */}
          <Text className="text-lg text-muted mb-4">{album.artist}</Text>

          {/* Overall Rating */}
          <View className="mb-6 pb-6 border-b border-border">
            <Text className="text-xs text-muted font-semibold mb-2">OVERALL RATING</Text>
            <View className="flex-row items-center gap-3">
              <HalfStarRating rating={overallRating} size={28} />
              <Text className="text-lg font-bold text-foreground">{overallRating.toFixed(1)}</Text>
              <Text className="text-sm text-muted">({reviews.length} reviews)</Text>
            </View>
          </View>

          {/* Release Date */}
          {album.releaseDate && (
            <View className="mb-4">
              <Text className="text-xs text-muted font-semibold mb-1">RELEASE DATE</Text>
              <Text className="text-base text-foreground">
                {new Date(album.releaseDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          )}

          {/* Genres */}
          {album.genres && album.genres.length > 0 && (
            <View className="mb-4">
              <Text className="text-xs text-muted font-semibold mb-2">GENRES</Text>
              <View className="flex-row flex-wrap gap-2">
                {album.genres.map((genre, idx) => (
                  <View key={idx} className="bg-primary px-3 py-1 rounded-full">
                    <Text className="text-xs text-white font-semibold">{genre}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Description */}
          {album.description && (
            <View className="mb-6">
              <Text className="text-xs text-muted font-semibold mb-2">ABOUT</Text>
              <Text className="text-sm text-foreground leading-relaxed">{album.description}</Text>
            </View>
          )}


        </View>

        {/* Reviews Section */}
        <View className="px-6 pb-6">
          <Text className="text-xl font-bold text-foreground mb-4">Community Reviews</Text>
          {reviews.length > 0 ? (
            <FlatList
              data={reviews}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View className="bg-surface rounded-lg p-4 mb-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="font-semibold text-foreground">{item.userName}</Text>
                    <Text className="text-xs bg-primary px-2 py-1 rounded text-white">
                      {item.format}
                    </Text>
                  </View>
                  <View className="mb-2">
                    <HalfStarRating rating={item.rating} size={20} />
                  </View>
                  <Text className="text-sm text-foreground mb-2">{item.review}</Text>
                  <Text className="text-xs text-muted">{item.timestamp}</Text>
                </View>
              )}
            />
          ) : (
            <Text className="text-sm text-muted text-center py-4">No reviews yet. Be the first!</Text>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
