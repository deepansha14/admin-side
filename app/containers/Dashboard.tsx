import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the Dashboard screen</Text>
      <Button
        title="Go to Products Screen"
        onPress={() => navigation.navigate("Products")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Dashboard;
