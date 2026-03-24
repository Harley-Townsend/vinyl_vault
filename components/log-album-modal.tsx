import { Modal, View, Text, TextInput, Pressable, ScrollView, Switch, GestureResponderEvent } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import * as Haptics from "expo-haptics";

export interface LogAlbumData {
  albumTitle: string;
  artist: string;
  rating: number;
  format: string;
  review: string;
  isFirstTime: boolean;
}

interface LogAlbumModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: LogAlbumData) => void;
  initialData?: Partial<LogAlbumData>;
}

const FORMATS = ["Vinyl", "CD", "Cassette", "Digital", "Spotify", "Apple Music", "YouTube Music", "Other"];

export function LogAlbumModal({ visible, onClose, onSubmit, initialData }: LogAlbumModalProps) {
  const colors = useColors();

  const [albumTitle, setAlbumTitle] = useState(initialData?.albumTitle || "");
  const [artist, setArtist] = useState(initialData?.artist || "");
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [format, setFormat] = useState(initialData?.format || "Spotify");
  const [review, setReview] = useState(initialData?.review || "");
  const [isFirstTime, setIsFirstTime] = useState(initialData?.isFirstTime ?? true);

  const handleSubmit = () => {
    if (!albumTitle || !artist || rating === 0) {
      alert("Please fill in all required fields");
      return;
    }

    onSubmit({
      albumTitle,
      artist,
      rating,
      format,
      review,
      isFirstTime,
    });

    // Reset form
    setAlbumTitle("");
    setArtist("");
    setRating(0);
    setFormat("Spotify");
    setReview("");
    setIsFirstTime(true);

    onClose();
  };

  // Improved star rating with larger tap targets
  const StarRatingPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= Math.floor(rating);
      const isHalf = i - 0.5 <= rating && rating < i;

      stars.push(
        <Pressable
          key={i}
          onPress={() => {
            setRating(i);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={{ marginRight: 12, paddingHorizontal: 8, paddingVertical: 8 }}
        >
          <Text style={{ fontSize: 48 }}>
            {isFilled ? "★" : isHalf ? "⯨" : "☆"}
          </Text>
        </Pressable>
      );
    }
    return <View className="flex-row justify-center">{stars}</View>;
  };

  // Quick rating buttons for easier selection
  const QuickRatingButtons = () => {
    const ratings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    return (
      <View className="flex-row flex-wrap gap-2 justify-center">
        {ratings.map((r) => (
          <Pressable
            key={r}
            onPress={() => {
              setRating(r);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={({ pressed }) => [
              {
                backgroundColor: rating === r ? colors.primary : colors.surface,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            className="px-3 py-2 rounded-lg border border-border"
          >
            <Text
              style={{
                color: rating === r ? "#fff" : colors.foreground,
              }}
              className="font-semibold text-sm"
            >
              {r}★
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={{ backgroundColor: colors.background }} className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center p-4 border-b border-border">
          <Text className="text-xl font-bold text-foreground">Log Album</Text>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <Text className="text-2xl">✕</Text>
          </Pressable>
        </View>

        {/* Form */}
        <ScrollView className="flex-1 p-4">
          <View className="gap-4">
            {/* Album Title */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Album Title *</Text>
              <TextInput
                placeholder="e.g., Midnights"
                placeholderTextColor={colors.muted}
                value={albumTitle}
                onChangeText={setAlbumTitle}
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              />
            </View>

            {/* Artist */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Artist *</Text>
              <TextInput
                placeholder="e.g., Taylor Swift"
                placeholderTextColor={colors.muted}
                value={artist}
                onChangeText={setArtist}
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              />
            </View>

            {/* Rating - Large Star Picker */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-3">Rating * (Tap a star)</Text>
              <StarRatingPicker />
              {rating > 0 && (
                <Text className="text-center text-lg text-primary font-bold mt-2">
                  {rating.toFixed(1)} / 5.0 ⭐
                </Text>
              )}
            </View>

            {/* Quick Rating Buttons */}
            <View>
              <Text className="text-xs font-semibold text-muted mb-2">Or select quickly:</Text>
              <QuickRatingButtons />
            </View>

            {/* Format */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">How did you listen?</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
                {FORMATS.map((f) => (
                  <Pressable
                    key={f}
                    onPress={() => setFormat(f)}
                    style={({ pressed }) => [
                      {
                        backgroundColor: format === f ? colors.primary : colors.surface,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                    className="px-4 py-2 rounded-full border border-border"
                  >
                    <Text
                      style={{
                        color: format === f ? "#fff" : colors.foreground,
                      }}
                      className="font-semibold text-sm"
                    >
                      {f}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* First Time */}
            <View className="flex-row justify-between items-center bg-surface p-4 rounded-lg border border-border">
              <Text className="text-sm font-semibold text-foreground">First time listening?</Text>
              <Switch value={isFirstTime} onValueChange={setIsFirstTime} />
            </View>

            {/* Review */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Review (optional)</Text>
              <TextInput
                placeholder="What did you think about this album?"
                placeholderTextColor={colors.muted}
                value={review}
                onChangeText={setReview}
                multiline
                numberOfLines={4}
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>

        {/* Footer Buttons */}
        <View className="flex-row gap-3 p-4 border-t border-border">
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, flex: 1 }]}
            className="bg-surface border border-border rounded-lg py-3"
          >
            <Text className="text-foreground font-semibold text-center">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={handleSubmit}
            disabled={!albumTitle || !artist || rating === 0}
            style={({ pressed }) => [
              {
                opacity: !albumTitle || !artist || rating === 0 ? 0.5 : pressed ? 0.8 : 1,
                flex: 1,
              },
            ]}
            className="bg-primary rounded-lg py-3"
          >
            <Text className="text-white font-semibold text-center">Log Album</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
