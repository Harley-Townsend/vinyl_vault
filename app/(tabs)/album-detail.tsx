import { ScrollView, Text, View, Pressable, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { HalfStarRating } from "@/components/half-star-rating";
import * as Haptics from "expo-haptics";

export default function AlbumDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse album data from route params
  const album = {
    id: params.id as string,
    title: params.title as string,
    artist: params.artist as string,
    coverUrl: params.coverUrl as string,
    releaseDate: params.releaseDate as string,
    genre: params.genre as string || "Unknown",
    description: params.description as string || "No description available",
    rating: params.rating ? parseFloat(params.rating as string) : 0,
    format: params.format as string || "Unknown",
  };

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
            Album Details
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

          {/* Rating */}
          <View className="flex-row items-center gap-3 mb-6">
            <HalfStarRating rating={album.rating} size={28} />
            <Text className="text-sm text-muted font-semibold">{album.rating.toFixed(1)}</Text>
          </View>

          {/* Format Badge */}
          {album.format && (
            <View className="mb-6">
              <Text className="bg-primary px-3 py-1 rounded-full text-white text-xs font-semibold inline-block">
                {album.format}
              </Text>
            </View>
          )}

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

          {/* Genre */}
          {album.genre && (
            <View className="mb-4">
              <Text className="text-xs text-muted font-semibold mb-1">GENRE</Text>
              <Text className="text-base text-foreground">{album.genre}</Text>
            </View>
          )}

          {/* Description */}
          {album.description && (
            <View className="mb-6">
              <Text className="text-xs text-muted font-semibold mb-2">ABOUT</Text>
              <Text className="text-sm text-foreground leading-relaxed">{album.description}</Text>
            </View>
          )}

          {/* Log Album Button */}
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              // TODO: Open log album modal with this album pre-filled
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            className="bg-primary rounded-lg py-3 items-center mt-4"
          >
            <Text className="text-white font-semibold text-base">Log This Album</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
