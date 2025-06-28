import { StyleSheet, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { HeaderProps } from "@/types";

const Header = ({ title = "", leftIcon, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

      <View style={styles.titleContainer}>
        <Typo size={22} fontWeight="600" style={{ textAlign: "center" }}>
          {title}
        </Typo>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  leftIcon: {
    paddingHorizontal: 16,
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    pointerEvents: "none",
  },
});
