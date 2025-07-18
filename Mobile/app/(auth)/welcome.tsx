import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import Animated, { FadeIn } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Shadow } from "react-native-shadow-2";

const welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/*login button & image*/}
        <View>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            style={styles.loginButton}
          >
            <Typo fontWeight={"500"}>Sign in</Typo>
          </TouchableOpacity>
          <Animated.Image
            entering={FadeIn.duration(2000)}
            source={require("../../assets/images/welcome2-removebg-preview (1).png")}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>
        {/*footer*/}

        <Shadow
          distance={50}
          offset={[0, -5]}
          startColor="rgba(255, 255, 255, 0.15)"
          finalColor="transparent"
          radius={50}
          corners={{ topStart: true, topEnd: true }}
          style={{ width: "100%" }}
        >
          <View style={styles.footer}>
            <Animated.View
              entering={FadeIn.duration(1000).springify().damping(12)}
              style={{ alignItems: "center" }}
            >
              <Typo size={30} fontWeight={"800"}>
                Always take control
              </Typo>
              <Typo size={30} fontWeight={"800"}>
                of your finances
              </Typo>
            </Animated.View>
            <Animated.View
              entering={FadeIn.duration(500).delay(100).springify().damping(12)}
              style={{ alignItems: "center", gap: 2 }}
            >
              <Typo size={17} color={colors.textLight}>
                Finances must be arranged to set a better
              </Typo>
              <Typo size={17} color={colors.textLight}>
                lifestyle in future
              </Typo>
            </Animated.View>
            <Animated.View
              entering={FadeIn.duration(500).delay(200).springify().damping(12)}
              style={styles.buttonContainer}
            >
              <Button onPress={() => router.push("/(auth)/register")}>
                <Typo size={22} color={colors.neutral900} fontWeight={"600"}>
                  Get Started
                </Typo>
              </Button>
            </Animated.View>
          </View>
        </Shadow>
      </View>
    </ScreenWrapper>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },

  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral800,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
