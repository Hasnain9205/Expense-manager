import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { Image } from "react-native";
import { verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import Button from "@/components/Button";

const EditProfile = () => {
  const user = {
    name: "Md. Hasnain Ahmed",
    email: "hasnain@example.com",
    avatar: require("./../assets/images/welcome2-removebg-preview (1).png"),
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Update Profile" />
        <BackButton iconSize={20} />
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.avatarWarp}>
          <Image source={user.avatar} style={styles.avatar} />
          <TouchableOpacity style={styles.editPhoto}>
            <Icons.Pencil weight="fill" size={20} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Typo>Name</Typo>
          <Input value={user.name} />
        </View>
        <Button style={styles.updateButton}>
          <Typo fontWeight={600} color={colors.neutral800}>
            Update
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacingY._10,
    paddingHorizontal: spacingX._30,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  avatarWarp: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: "white",
  },
  editPhoto: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: 2,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
    paddingBottom: spacingY._20,
  },
  form: {
    marginTop: verticalScale(30),
    gap: verticalScale(20),
  },
  updateButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
