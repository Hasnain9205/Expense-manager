<<<<<<< HEAD
import { StyleSheet, Text, View } from "react-native";
import React from "react";
=======
import { Alert, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
>>>>>>> 7d73703 (Added Custom Tabs)
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
<<<<<<< HEAD

const Login = () => {
=======
import * as Icons from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const handleSubmit = async () => {
  //   if (!email || !password) {
  //     Alert.alert("Login", "Please enter your both email and password");
  //     await router.push("../(tabs)");
  //     return;
  //   }
  //   console.log("email", email);
  //   console.log("email", password);
  // };
>>>>>>> 7d73703 (Added Custom Tabs)
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Hey
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Welcome Back
          </Typo>
<<<<<<< HEAD

          <View style={styles.form}>
            <Typo size={16} color={colors.textLight}>
              Login now to track all your expense
            </Typo>
            <Input />
          </View>
=======
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLight}>
            Login now to track all your expense
          </Typo>
          <Input
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Input
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            icon={
              <Icons.Lock
                size={verticalScale(24)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
            Forgot Password?
          </Typo>
          <Button loading={isLoading} onPress={() => router.push("../(tabs)")}>
            <Typo fontWeight={"700"} color={colors.neutral900}>
              Login
            </Typo>
          </Button>
        </View>
        <View style={styles.footer}>
          <Typo style={styles.footerText} size={15}>
            Don’t have an account?{" "}
          </Typo>
          <Pressable onPress={() => router.navigate("/(auth)/register")}>
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Sign up
            </Typo>
          </Pressable>
>>>>>>> 7d73703 (Added Custom Tabs)
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },

  form: {
    gap: spacingY._20,
  },
<<<<<<< HEAD
=======
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
>>>>>>> 7d73703 (Added Custom Tabs)
});
