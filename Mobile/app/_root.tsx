import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="./(tabs)" /> {/* এখানে তোমার tab navigator থাকবে */}
      <Stack.Screen name="createExpense" /> {/* আলাদা স্ক্রিন */}
    </Stack>
  );
}
