import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import * as Icons from "phosphor-react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";

export default function CustomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const tabIcons: any = {
    index: (focused: boolean) => (
      <Icons.House
        size={30}
        color={focused ? colors.primary : colors.neutral400}
        weight={focused ? "fill" : "regular"}
      />
    ),
    statistics: (focused: boolean) => (
      <Icons.ChartBar
        size={30}
        color={focused ? colors.primary : colors.neutral400}
        weight={focused ? "fill" : "regular"}
      />
    ),
    wallet: (focused: boolean) => (
      <Icons.Wallet
        size={30}
        color={focused ? colors.primary : colors.neutral400}
        weight={focused ? "fill" : "regular"}
      />
    ),
    profile: (focused: boolean) => (
      <Icons.User
        size={30}
        color={focused ? colors.primary : colors.neutral400}
        weight={focused ? "fill" : "regular"}
      />
    ),
  };

  const filteredRoutes = state.routes.filter((r) => r.name !== "createExpense");
  const leftRoutes = filteredRoutes.slice(0, 2);
  const rightRoutes = filteredRoutes.slice(2);

  const renderTab = (route: any) => {
    const isFocused =
      state.index === state.routes.findIndex((r) => r.key === route.key);

    const onPress = () => {
      const event = navigation.emit({ type: "tabPress", target: route.key });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <TouchableOpacity
        key={route.key}
        onPress={onPress}
        style={styles.tabbarItem}
      >
        {tabIcons[route.name]?.(isFocused)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tabbar}>
      <View style={styles.sideTab}>{leftRoutes.map(renderTab)}</View>

      {/* Floating FAB */}
      <TouchableOpacity
        style={styles.floatingTabItem}
        onPress={() => navigation.navigate("createExpense")}
      >
        <Icons.PlusCircle size={40} weight="fill" color={colors.white} />
      </TouchableOpacity>

      <View style={styles.sideTab}>{rightRoutes.map(renderTab)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: Platform.OS === "ios" ? verticalScale(73) : verticalScale(60),
    backgroundColor: colors.neutral800,
    padding: 10,
  },
  sideTab: {
    flexDirection: "row",
    gap: verticalScale(80),
  },
  tabbarItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  floatingTabItem: {
    position: "absolute",
    left: 180,
    bottom: verticalScale(30),
    alignSelf: "center",
    backgroundColor: colors.primary,
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: verticalScale(30),
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 10,
  },
});
