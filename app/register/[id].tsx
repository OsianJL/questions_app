import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña')
});

// Add this interface after the schema
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log('Registro exitoso:', data);
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

      <Text>Confirmar Contraseña:</Text>
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, marginBottom: 10 }}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Confirme su contraseña"
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
      {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>}

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ backgroundColor: 'blue', padding: 10, marginTop: 20 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
