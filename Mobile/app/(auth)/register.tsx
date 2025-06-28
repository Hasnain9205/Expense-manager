import { Alert, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (!name || !email || !password) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Let's
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            get Started
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLight}>
            Create an account to tract an expense
          </Typo>
          <Input
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            icon={
              <Icons.User
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
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

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={"700"} color={colors.neutral900}>
              Sign Up
            </Typo>
          </Button>
        </View>
        <View style={styles.footer}>
          <Typo style={styles.footerText} size={15}>
            Already have an account ?
          </Typo>
          <Pressable onPress={() => router.navigate("/(auth)/login")}>
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Login
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },

  form: {
    gap: spacingY._20,
  },
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
});
