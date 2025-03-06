import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register/[id]"
          options={{
            headerTitle: "Sign up",
            headerStyle: {
              backgroundColor: "#ee5822",
            },
          }}
        />
        <Stack.Screen
          name="login/[id]"
          options={{
            headerTitle: "Log in",
            headerStyle: {
              backgroundColor: "#ee5822",
            },
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
