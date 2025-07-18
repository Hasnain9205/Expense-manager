import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { InputProps } from "@/types";
import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";

const Input = (props: InputProps) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.icon && props.icon}
      <TextInput
        {...props}
        style={[styles.input, props.inputStyle]}
        placeholder={props.placeholder}
        placeholderTextColor={colors.neutral400}
        ref={props.inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(65),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: verticalScale(14),
    color: colors.white,
  },
});
