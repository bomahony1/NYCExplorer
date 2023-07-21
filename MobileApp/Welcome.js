import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Image
          source={require("./assets/welcome.jpg")}
          style={styles.welcomeImage}
        />
        <Text style={styles.text}>Welcome to Buzzin NYC.</Text>
        <Text style={styles.text}>
          Discover NYC's Best: Your Ultimate Trip Planner & Business Predictor!
        </Text>
        <Button
          title="Get Started"
          onPress={() => {
            // Handle the button press here
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeImage: {
    width: 200,
    height: 200,
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Welcome;
