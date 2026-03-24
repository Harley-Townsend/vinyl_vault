import { ScrollView, Text, View, TextInput, Pressable, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as Haptics from "expo-haptics";

export default function LoginScreen() {
  const colors = useColors();
  const { login, signup } = useAuth();
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (isSignup) {
        await signup(email, password, name);
        Alert.alert("Success", "Account created! Welcome to Vinyl Vault.");
      } else {
        await login(email, password);
        Alert.alert("Success", "Logged in successfully!");
      }

      // Navigate to home
      router.replace("/(tabs)");
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      Alert.alert("Error", message);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = isSignup ? email && password && name && password.length >= 8 : email && password;

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="flex-1 justify-center">
          {/* Logo/Title */}
          <View className="items-center mb-8">
            <Text className="text-5xl font-bold text-primary mb-2">🎵</Text>
            <Text className="text-3xl font-bold text-foreground">Vinyl Vault</Text>
            <Text className="text-muted mt-2">{isSignup ? "Create Account" : "Welcome Back"}</Text>
          </View>

          {/* Form */}
          <View className="gap-4 mb-6">
            {isSignup && (
              <View>
                <Text className="text-sm font-semibold text-foreground mb-2">Full Name</Text>
                <TextInput
                  placeholder="Enter your name"
                  placeholderTextColor={colors.muted}
                  value={name}
                  onChangeText={setName}
                  className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                  editable={!loading}
                />
              </View>
            )}

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Email</Text>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor={colors.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                editable={!loading}
              />
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Password</Text>
              <TextInput
                placeholder={isSignup ? "At least 8 characters" : "Enter your password"}
                placeholderTextColor={colors.muted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                editable={!loading}
              />
              {isSignup && password && password.length < 8 && (
                <Text className="text-xs text-error mt-1">Password must be at least 8 characters</Text>
              )}
            </View>
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={handleSubmit}
            disabled={!isFormValid || loading}
            style={({ pressed }) => [
              {
                opacity: !isFormValid || loading ? 0.5 : pressed ? 0.8 : 1,
              },
            ]}
            className="bg-primary rounded-lg py-4 mb-4"
          >
            <Text className="text-white font-bold text-center text-lg">
              {loading ? "Loading..." : isSignup ? "Create Account" : "Login"}
            </Text>
          </Pressable>

          {/* Toggle Signup/Login */}
          <View className="flex-row justify-center items-center gap-2">
            <Text className="text-muted">{isSignup ? "Already have an account?" : "Don't have an account?"}</Text>
            <Pressable
              onPress={() => {
                setIsSignup(!isSignup);
                setEmail("");
                setPassword("");
                setName("");
              }}
              disabled={loading}
            >
              <Text style={{ color: colors.primary }} className="font-bold">
                {isSignup ? "Login" : "Sign Up"}
              </Text>
            </Pressable>
          </View>

          {/* Info Text */}
          <View className="mt-8 p-4 bg-surface rounded-lg border border-border">
            <Text className="text-xs text-muted text-center">
              {isSignup
                ? "Create an account to start logging your favorite albums and connecting with other music lovers."
                : "Login to your Vinyl Vault account to continue."}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
