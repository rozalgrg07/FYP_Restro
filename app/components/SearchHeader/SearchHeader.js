import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { colors } from "../../theme/colors";
import Input from "../Input/Input";

const ICON_SIZE = 25;

const SearchHeader = () => {
  return (
    <View style={styles.header}>
      {/* Profile Icon */}
      <TouchableOpacity onPress={() => {}} style={styles.profile}>
        <Ionicons
          name="person-outline"
          color={colors.primary}
          size={ICON_SIZE}
        />
      </TouchableOpacity>

      {/* Logo in the Middle */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/logo.png")} // Add your logo path here
          style={styles.logo}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          LeftIconComponent={
            <Feather name="search" color={colors.dark} size={ICON_SIZE} />
          }
          placeholder="Search"
          RightIconComponent={
            <SimpleLineIcons
              name="microphone"
              color={colors.dark}
              size={ICON_SIZE}
            />
          }
        />
      </View>

      {/* Notifications Icon */}
      <TouchableOpacity onPress={() => {}} style={styles.notifications}>
        <Ionicons
          name="notifications-outline"
          color={colors.primary}
          size={ICON_SIZE}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribute elements evenly
  },
  profile: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center", // Center logo horizontally
  },
  logo: {
    width: 100, // Adjust based on your logo size
    height: 40, // Adjust based on your logo size
    resizeMode: "contain", // Ensure the logo maintains its aspect ratio
  },
  searchContainer: {
    flex: 3, // Make the search bar larger than the other items
  },
  notifications: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
