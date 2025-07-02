import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import axios from "@/utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password required"),
});

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.replace("/(tabs)");
      }
    };
    checkToken();
  }, []);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/auth/login", data);

      if (res.data.success) {
        await AsyncStorage.setItem("token", res.data.token);
        Alert.alert("Login Success", res.data.message);
        router.replace("/(tabs)");
      } else {
        Alert.alert("Login Failed", res.data.message);
      }
    } catch (error: any) {
      console.error("Login error:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      Alert.alert("Error", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <BackButton iconSize={28} />
              <View style={{ gap: 5, marginTop: spacingY._20 }}>
                <Typo size={30} fontWeight={"800"}>
                  Hey
                </Typo>
                <Typo size={30} fontWeight={"800"}>
                  Welcome Back
                </Typo>
              </View>

              <View style={styles.form}>
                <Typo size={16} color={colors.textLight}>
                  Login now to track all your expense
                </Typo>

                {/* Email Input */}
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Input
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        value={value}
                        onChangeText={onChange}
                        icon={
                          <Icons.At
                            size={verticalScale(26)}
                            color={colors.neutral300}
                            weight="fill"
                          />
                        }
                      />
                      {errors.email && (
                        <Text style={styles.errorText}>
                          {errors.email.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* Password Input */}
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Input
                        placeholder="Enter your password"
                        secureTextEntry
                        value={value}
                        onChangeText={onChange}
                        icon={
                          <Icons.Lock
                            size={verticalScale(24)}
                            color={colors.neutral300}
                            weight="fill"
                          />
                        }
                      />
                      {errors.password && (
                        <Text style={styles.errorText}>
                          {errors.password.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                <Typo
                  size={14}
                  color={colors.text}
                  style={{ alignSelf: "flex-end" }}
                >
                  Forgot Password?
                </Typo>

                <Button loading={isLoading} onPress={handleSubmit(onSubmit)}>
                  <Typo fontWeight={"700"} color={colors.neutral900}>
                    Login
                  </Typo>
                </Button>
              </View>

              <View style={styles.footer}>
                <Typo style={styles.footerText} size={15}>
                  Don’t have an account?
                </Typo>
                <Pressable onPress={() => router.navigate("/(auth)/register")}>
                  <Typo size={15} fontWeight={"700"} color={colors.primary}>
                    Sign up
                  </Typo>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  errorText: {
    color: "red",
    fontSize: 13,
    marginTop: -15,
    marginBottom: 5,
    marginLeft: 10,
  },
});
