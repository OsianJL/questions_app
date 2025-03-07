import React, { useContext, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, AuthContext } from "../context/AuthContext";

// Componente que actúa como guarda de rutas protegidas
function ProtectedStack() {
  const { token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      // Si no hay token, redirige a la pantalla de login
      router.replace("/");
    }
  }, [token]);

  // Mientras se verifica la autenticación, puedes mostrar un indicador de carga
  // if (!token) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#29cc00" animating={true} />
  //     </View>
  //   );
  // }

  return (
    <Stack>
      {/* Rutas protegidas: solo se renderizan si el usuario está autenticado */}
      <Stack.Screen
        name="profile/[id]"
        options={{
          headerShown: false,
        }}
      />
      {/* Puedes agregar aquí más pantallas protegidas */}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* Puedes definir rutas públicas (por ejemplo, login, register) fuera del ProtectedStack */}
      <Stack>
        <Stack.Screen
          name="login/[id]"
          options={{
            headerTitle: "Log in",
            headerStyle: { backgroundColor: "#ee5822" },
          }}
        />
        <Stack.Screen
          name="register/[id]"
          options={{
            headerTitle: "Sign up",
            headerStyle: { backgroundColor: "#ee5822" },
          }}
        />
      </Stack>
      {/* Rutas protegidas */}
      <ProtectedStack />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
