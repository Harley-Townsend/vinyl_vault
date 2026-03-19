import { ScrollView, Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import * as Haptics from "expo-haptics";

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const colors = useColors();

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView>
        {/* Header */}
        <View className="px-6 py-4 border-b border-border">
          <Pressable onPress={() => router.back()}>
            <Text className="text-primary text-lg">← Back</Text>
          </Pressable>
          <Text className="text-2xl font-bold text-foreground mt-3">Settings</Text>
        </View>

        {/* Appearance */}
        <View className="px-6 py-6 border-b border-border">
          <Text className="text-lg font-semibold text-foreground mb-4">Appearance</Text>

          <View className="flex-row items-center justify-between p-4 bg-surface rounded-lg border border-border">
            <View>
              <Text className="text-foreground font-semibold">Dark Mode</Text>
              <Text className="text-xs text-muted mt-1">
                {isDarkMode ? "Enabled" : "Disabled"}
              </Text>
            </View>
            <Pressable
              onPress={handleThemeToggle}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              className={`w-12 h-7 rounded-full items-center justify-center ${
                isDarkMode ? "bg-primary" : "bg-surface border border-border"
              }`}
            >
              <Text className={isDarkMode ? "text-background" : "text-foreground"}>
                {isDarkMode ? "✓" : "○"}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Notifications */}
        <View className="px-6 py-6 border-b border-border">
          <Text className="text-lg font-semibold text-foreground mb-4">Notifications</Text>

          <View className="gap-3">
            <SettingToggle label="Likes" description="Notify when someone likes your log" defaultValue={true} />
            <SettingToggle label="Comments" description="Notify when someone comments" defaultValue={true} />
            <SettingToggle label="Follows" description="Notify when someone follows you" defaultValue={true} />
          </View>
        </View>

        {/* About */}
        <View className="px-6 py-6 border-b border-border">
          <Text className="text-lg font-semibold text-foreground mb-4">About</Text>

          <View className="gap-3">
            <SettingItem label="App Version" value="1.0.0" />
            <SettingItem label="Build" value="001" />
          </View>
        </View>

        {/* Links */}
        <View className="px-6 py-6 border-b border-border">
          <Text className="text-lg font-semibold text-foreground mb-4">Links</Text>

          <View className="gap-2">
            <SettingLink label="Privacy Policy" />
            <SettingLink label="Terms of Service" />
            <SettingLink label="Contact Us" />
          </View>
        </View>

        {/* Danger Zone */}
        <View className="px-6 py-6">
          <Text className="text-lg font-semibold text-error mb-4">Danger Zone</Text>

          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="p-4 bg-error/10 border border-error rounded-lg items-center"
          >
            <Text className="text-error font-semibold">Clear Cache</Text>
          </Pressable>

          <Text className="text-xs text-muted mt-4 text-center">
            Vinyl Vault v1.0.0 • Made with ♪ for music lovers
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function SettingToggle({ label, description, defaultValue }: any) {
  const [enabled, setEnabled] = useState(defaultValue);

  return (
    <View className="flex-row items-center justify-between p-4 bg-surface rounded-lg border border-border">
      <View className="flex-1">
        <Text className="text-foreground font-semibold">{label}</Text>
        <Text className="text-xs text-muted mt-1">{description}</Text>
      </View>
      <Pressable
        onPress={() => {
          setEnabled(!enabled);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        className={`w-12 h-7 rounded-full items-center justify-center ${
          enabled ? "bg-primary" : "bg-surface border border-border"
        }`}
      >
        <Text className={enabled ? "text-background" : "text-foreground"}>
          {enabled ? "✓" : "○"}
        </Text>
      </Pressable>
    </View>
  );
}

function SettingItem({ label, value }: any) {
  return (
    <View className="flex-row items-center justify-between p-4 bg-surface rounded-lg border border-border">
      <Text className="text-foreground font-semibold">{label}</Text>
      <Text className="text-muted">{value}</Text>
    </View>
  );
}

function SettingLink({ label }: any) {
  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      className="p-4 bg-surface rounded-lg border border-border flex-row items-center justify-between"
    >
      <Text className="text-primary font-semibold">{label}</Text>
      <Text className="text-primary text-lg">→</Text>
    </Pressable>
  );
}
