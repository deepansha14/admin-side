import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const Finances = () => {
  return (
    <View style={styles.center}>
      <Text>This is the Finances screen</Text>
      <Button title="Go to About Screen" onPress={() => console.log()} />
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

export default Finances;
