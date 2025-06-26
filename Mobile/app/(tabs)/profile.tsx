import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import Typo from "@/components/Typo";
import { spacingX, spacingY, colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";

const Profile = () => {
  const router = useRouter();

  const user = {
    name: "Md. Hasnain Ahmed",
    email: "hasnain@example.com",
    avatar: require("../../assets/images/welcome2-removebg-preview (1).png"),
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" style={styles.header} />

        {/* Profile Info Section */}
        <View style={styles.profileContainer}>
          <Image source={user.avatar} style={styles.avatar} />

          <Typo size={24} fontWeight="700" style={styles.name}>
            {user.name}
          </Typo>
          <Typo size={16} color={colors.textLight}>
            {user.email}
          </Typo>

          <View style={styles.editContainer}>
            <TouchableOpacity
              onPress={() => router.push("/editProfile")}
              style={styles.editRow}
            >
              <View style={styles.editProfile}>
                <View style={styles.iconBox}>
                  <Icons.User size={24} weight="fill" color={colors.white} />
                </View>
                <Typo style={styles.editText}>Edit Profile</Typo>
              </View>
              <Icons.CaretRight size={24} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editRow}>
              <View style={styles.editProfile}>
                <View style={[styles.iconBox, { backgroundColor: "green" }]}>
                  <Icons.Gear size={24} weight="fill" color={colors.white} />
                </View>
                <Typo style={styles.editText}>Settings</Typo>
              </View>
              <Icons.CaretRight size={24} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editRow}>
              <View style={styles.editProfile}>
                <View style={[styles.iconBox, { backgroundColor: "gray" }]}>
                  <Icons.Lock size={24} weight="fill" color={colors.white} />
                </View>
                <Typo style={styles.editText}>Privacy Policy</Typo>
              </View>
              <Icons.CaretRight size={24} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editRow}>
              <View style={styles.editProfile}>
                <View style={[styles.iconBox, { backgroundColor: "red" }]}>
                  <Icons.SignOut size={24} weight="fill" color={colors.white} />
                </View>
                <Typo style={styles.editText}>Logout</Typo>
              </View>
              <Icons.CaretRight size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  header: {
    marginVertical: spacingY._10,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: verticalScale(30),
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacingY._10,
  },
  name: {
    marginBottom: 6,
  },
  editButton: {
    marginTop: spacingY._15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 25,
  },
  editContainer: {
    marginTop: 20,
    width: "100%",
  },
  editRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  editProfile: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  iconBox: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 10,
  },
  editText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
