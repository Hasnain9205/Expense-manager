import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Typo from "@/components/Typo";
import Button from "@/components/Button";
import { colors, spacingX } from "@/constants/theme";
import Animated, { FadeIn } from "react-native-reanimated";
import ScreenWrapper from "@/components/ScreenWrapper";

const Register = () => {
  return (
    <ScreenWrapper>
      <Text>Lets get Started</Text>
      <Text>Create an account to tract an expense</Text>
      <TextInput />
      <TextInput />
      <TextInput />
      <Animated.View
        entering={FadeIn.duration(500).delay(200).springify().damping(12)}
        style={styles.buttonContainer}
      >
        <Button onPress={() => router.push("/(auth)/register")}>
          <Typo size={22} color={colors.neutral900} fontWeight={"600"}>
            Sign Up
          </Typo>
        </Button>
      </Animated.View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
