import React, { useContext, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustumButton';
import { useRouter } from 'expo-router';
import { loginUser } from '../api/api';
import { AuthContext } from '../../context/AuthContext';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

interface FormData {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setToken } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa email y contraseña.');
      return;
    }
    try {
      const data = await loginUser(email, password);
      // Suponemos que la respuesta tiene la propiedad access_token
      setToken(data.access_token);
      Alert.alert('Éxito', 'Inicio de sesión exitoso.');
      // Redirige a la pantalla principal (por ejemplo, FeedScreen)
      router.push({
        pathname: "profile/[id]",
        // params: { token: userId },
      })
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
            placeholder="Ingrese su email"
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

      <Text>Contraseña:</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, marginBottom: 10 }}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Ingrese su contraseña"
              secureTextEntry={secureTextEntry}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <Icon name={secureTextEntry ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
      <View style={styles.linkContainer}>
        <Text style={styles.link} onPress={() => router.push('/passwordReset')}>
          ¿Olvidaste tu contraseña?
        </Text>
      </View>
      <CustomButton
            title="Log in"
            onPress={handleSubmit(handleLogin)}
          ></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#0077CC",
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  linkContainer: {
    marginTop: 10,
    alignItems: "center"
  },
  link: {
    color: "#0077CC",
    textDecorationLine: "underline"
  }
});

export default LoginScreen;

