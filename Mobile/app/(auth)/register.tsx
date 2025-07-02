import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
import axios from "@/utils/axiosInstance";
import * as ImagePicker from "expo-image-picker";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.IMAGE,

      allowsEditing: true,
      base64: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("profileImageUrl", {
        uri: image.uri,
        type: "image/jpeg",
        name: "profile.jpg",
      } as any);
    }

    try {
      const res = await axios.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        Alert.alert("Success", "Account created successfully");
        router.push("/(auth)/login");
      } else {
        Alert.alert("Error", res.data.message);
      }
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      Alert.alert(
        "Error",
        err.response?.data?.message || "Something went wrong"
      );
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
          <ScrollView>
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
                <TouchableOpacity onPress={pickImage}>
                  {image ? (
                    <Image source={{ uri: image.uri }} style={styles.avatar} />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Typo color={colors.black}>Select Photo</Typo>
                    </View>
                  )}
                </TouchableOpacity>
                <Input
                  placeholder="Enter your name"
                  value={fullName}
                  onChangeText={setFullName}
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

                <Button
                  loading={isLoading}
                  onPress={handleSubmit}
                  disabled={isLoading}
                >
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
