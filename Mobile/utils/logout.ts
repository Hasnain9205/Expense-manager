// utils/logout.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const logout = async () => {
  await AsyncStorage.clear();
  router.replace("/(auth)/login");
};
