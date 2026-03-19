import { ScrollView, Text, View, Pressable, TextInput, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";

export default function EditProfileScreen() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: profile } = trpc.profiles.getProfile.useQuery(
    { userId: user?.id || 0 },
    { enabled: isAuthenticated && !!user?.id }
  );

  const updateProfileMutation = trpc.profiles.updateProfile.useMutation();

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || "");
      setIsPublic(profile.isPublic !== false);
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      await updateProfileMutation.mutateAsync({
        bio: bio || undefined,
        isPublic,
      });

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.navigate({ pathname: "/(tabs)/profile" } as any);
    } catch (error) {
      console.error("Failed to update profile:", error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="flex items-center justify-center">
        <Text className="text-foreground">Not authenticated</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView>
        {/* Header */}
        <View className="px-6 py-4 border-b border-border">
          <Pressable onPress={() => router.back()}>
            <Text className="text-primary text-lg">← Back</Text>
          </Pressable>
          <Text className="text-2xl font-bold text-foreground mt-3">Edit Profile</Text>
        </View>

        {/* Form */}
        <View className="px-6 py-6 gap-6">
          {/* Profile Picture */}
          <View>
            <Text className="text-lg font-semibold text-foreground mb-3">Profile Picture</Text>
            <View className="w-24 h-24 bg-primary rounded-full items-center justify-center">
              <Text className="text-4xl">👤</Text>
            </View>
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              className="mt-3 px-4 py-2 bg-surface border border-border rounded-lg"
            >
              <Text className="text-foreground font-semibold text-sm">Upload Photo</Text>
            </Pressable>
            <Text className="text-xs text-muted mt-2">
              Feature coming soon. Upload via the web app.
            </Text>
          </View>

          {/* Bio */}
          <View>
            <Text className="text-lg font-semibold text-foreground mb-2">Bio</Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about your music taste..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              maxLength={200}
              className="bg-surface text-foreground px-4 py-3 rounded-lg border border-border"
              textAlignVertical="top"
            />
            <Text className="text-xs text-muted mt-1">{bio.length}/200</Text>
          </View>

          {/* Privacy */}
          <View>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">Public Profile</Text>
              <Pressable
                onPress={() => {
                  setIsPublic(!isPublic);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                className={`w-12 h-7 rounded-full items-center justify-center ${
                  isPublic ? "bg-primary" : "bg-surface border border-border"
                }`}
              >
                <Text className={isPublic ? "text-background" : "text-foreground"}>
                  {isPublic ? "✓" : "○"}
                </Text>
              </Pressable>
            </View>
            <Text className="text-xs text-muted mt-2">
              {isPublic
                ? "Your profile is visible to other users"
                : "Your profile is private"}
            </Text>
          </View>

          {/* Save Button */}
          <Pressable
            onPress={handleSave}
            disabled={isSubmitting}
            style={({ pressed }) => [
              { opacity: pressed ? 0.8 : 1 },
              isSubmitting && { opacity: 0.5 },
            ]}
            className="bg-primary px-6 py-4 rounded-lg items-center mt-4"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text className="text-background font-semibold text-lg">Save Changes</Text>
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
