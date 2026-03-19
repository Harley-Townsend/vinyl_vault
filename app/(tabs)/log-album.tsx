import { ScrollView, Text, View, Pressable, TextInput, Image, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import * as Haptics from "expo-haptics";

const LISTENING_FORMATS = [
  { id: "vinyl", label: "Vinyl Record" },
  { id: "cd", label: "CD" },
  { id: "spotify", label: "Spotify" },
  { id: "apple_music", label: "Apple Music" },
  { id: "youtube_music", label: "YouTube Music" },
  { id: "tidal", label: "Tidal" },
  { id: "amazon_music", label: "Amazon Music" },
  { id: "bandcamp", label: "Bandcamp" },
  { id: "soundcloud", label: "SoundCloud" },
];

export default function LogAlbumScreen() {
  const router = useRouter();
  const { albumData } = useLocalSearchParams();
  const [album, setAlbum] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [listeningFormat, setListeningFormat] = useState("spotify");
  const [isFirstListen, setIsFirstListen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [listenedAt, setListenedAt] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createLogMutation = trpc.logs.create.useMutation();

  useEffect(() => {
    if (albumData) {
      try {
        const parsedAlbum = JSON.parse(albumData as string);
        setAlbum(parsedAlbum);
      } catch (error) {
        console.error("Failed to parse album data:", error);
      }
    }
  }, [albumData]);

  const handleSubmit = async () => {
    if (!album) return;

    try {
      setIsSubmitting(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      await createLogMutation.mutateAsync({
        albumId: album.id,
        rating,
        listeningFormat,
        isFirstListen,
        reviewText: reviewText || undefined,
        listenedAt: new Date(listenedAt),
      });

      // Show success and navigate back
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.navigate({ pathname: "/(tabs)" } as any);
    } catch (error) {
      console.error("Failed to create log:", error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!album) {
    return (
      <ScreenContainer className="flex items-center justify-center">
        <ActivityIndicator size="large" color="#D4AF37" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 border-b border-border">
          <Pressable onPress={() => router.back()}>
            <Text className="text-primary text-lg">← Back</Text>
          </Pressable>
          <Text className="text-2xl font-bold text-foreground mt-3">Log Album</Text>
        </View>

        {/* Album Preview */}
        <View className="px-6 py-6 border-b border-border">
          <View className="flex-row gap-4">
            <Image
              source={{ uri: album.coverUrl }}
              className="w-24 h-24 rounded-lg"
              resizeMode="cover"
            />
            <View className="flex-1 justify-center">
              <Text className="text-lg font-semibold text-foreground">{album.title}</Text>
              <Text className="text-sm text-muted mt-1">{album.artist}</Text>
              <Text className="text-xs text-muted mt-2">{album.year}</Text>
            </View>
          </View>
        </View>

        {/* Form */}
        <View className="px-6 py-6 gap-6">
          {/* Rating */}
          <View>
            <Text className="text-lg font-semibold text-foreground mb-3">Your Rating</Text>
            <View className="flex-row gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable
                  key={star}
                  onPress={() => {
                    setRating(star);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <Text className={`text-4xl ${star <= rating ? "text-primary" : "text-border"}`}>
                    ★
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text className="text-sm text-muted mt-2">{rating} out of 5 stars</Text>
          </View>

          {/* Listening Format */}
          <View>
            <Text className="text-lg font-semibold text-foreground mb-3">How did you listen?</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="gap-2 -mx-6 px-6"
            >
              {LISTENING_FORMATS.map((format) => (
                <Pressable
                  key={format.id}
                  onPress={() => {
                    setListeningFormat(format.id);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                  className={`px-4 py-2 rounded-full ${
                    listeningFormat === format.id ? "bg-primary" : "bg-surface border border-border"
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      listeningFormat === format.id ? "text-background" : "text-foreground"
                    }`}
                  >
                    {format.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* First Listen Toggle */}
          <View>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">First Time Listening?</Text>
              <Pressable
                onPress={() => {
                  setIsFirstListen(!isFirstListen);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                className={`w-12 h-7 rounded-full items-center justify-center ${
                  isFirstListen ? "bg-primary" : "bg-surface border border-border"
                }`}
              >
                <Text className={isFirstListen ? "text-background" : "text-foreground"}>
                  {isFirstListen ? "✓" : "○"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Date Listened */}
          <View>
            <Text className="text-lg font-semibold text-foreground mb-2">When did you listen?</Text>
            <TextInput
              value={listenedAt}
              onChangeText={setListenedAt}
              placeholder="YYYY-MM-DD"
              className="bg-surface text-foreground px-4 py-3 rounded-lg border border-border"
            />
          </View>

          {/* Review Text */}
          <View>
            <Text className="text-lg font-semibold text-foreground mb-2">Your Review (Optional)</Text>
            <TextInput
              value={reviewText}
              onChangeText={setReviewText}
              placeholder="Share your thoughts about this album..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              className="bg-surface text-foreground px-4 py-3 rounded-lg border border-border"
              textAlignVertical="top"
            />
            <Text className="text-xs text-muted mt-1">{reviewText.length}/500</Text>
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={({ pressed }) => [
              { opacity: pressed ? 0.8 : 1 },
              isSubmitting && { opacity: 0.5 },
            ]}
            className="bg-primary px-6 py-4 rounded-lg items-center"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text className="text-background font-semibold text-lg">Log Album</Text>
            )}
          </Pressable>

          {/* Cancel Button */}
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="px-6 py-3 rounded-lg items-center border border-border"
          >
            <Text className="text-foreground font-semibold">Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
