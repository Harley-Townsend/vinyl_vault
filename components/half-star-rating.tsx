import { View, Text, Pressable } from "react-native";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

interface HalfStarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  editable?: boolean;
  size?: number;
}

export function HalfStarRating({ rating, onRate, editable = false, size = 24 }: HalfStarRatingProps) {
  const colors = useColors();

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= Math.floor(rating);
    const isHalf = Math.floor(rating) === i - 1 && rating % 1 !== 0;

    stars.push(
      <Pressable
        key={i}
        onPress={() => {
          if (editable && onRate) {
            onRate(i);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        }}
        disabled={!editable}
        style={{ marginRight: 2 }}
      >
        <View style={{ position: "relative", width: size, height: size }}>
          {/* Background empty star */}
          <Text
            style={{
              fontSize: size,
              color: colors.muted,
              position: "absolute",
              left: 0,
              top: 0,
            }}
          >
            ☆
          </Text>

          {/* Filled or half-filled star overlay */}
          {(isFilled || isHalf) && (
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: isFilled ? "100%" : "50%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Text
                style={{
                  fontSize: size,
                  color: colors.primary,
                }}
              >
                ★
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  }

  return <View style={{ flexDirection: "row", gap: 2 }}>{stars}</View>;
}
