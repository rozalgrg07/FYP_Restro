import React from "react";
import { StyleSheet, View } from "react-native";
import Screen from "../components/Screen/Screen";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import TabView from "../components/TabView/TabView";

const Home = () => {
  return (
    <Screen>
      <SearchHeader />
      <View>
        <View style={styles.categories}>
          <SectionTitle title="Categories" />
          <TabView />
        </View>
      </View>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  categories: {
    height: 730,
  },
});


