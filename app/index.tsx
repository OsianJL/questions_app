import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import CustomButton from "../components/CustumButton";

export default function Home() {
  const router = useRouter();

  let userId = 6;

  return (
    <>
      <StatusBar style="auto" />
      <ImageBackground
        source={require("../assets/question_app_splash_screen.png")}
        style={styles.image}
        resizeMode="cover"
        imageStyle={{ opacity: 0.7 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Registrate o inicia sesion</Text>
          <CustomButton
            title="Registrate"
            onPress={() =>
              router.push({
                pathname: "register/[id]",
                params: { id: userId },
              })
            }
          ></CustomButton>
          <CustomButton
            title="inicia sesion"
            onPress={() =>
              router.push({
                pathname: "login/[id]",
                params: { id: userId },
              })
            }
          ></CustomButton>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ee5822",
    opacity: 0.8,
    height: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 20,
    color: "#000",
  },
});
