import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { loginUser, registerUser } from '../services/authService';

export default function LoginScreen({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [login, setLogin] = useState('');
  const [clave, setClave] = useState('');
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setNombre('');
    setApellido('');
    setTelefono('');
    setLogin('');
    setClave('');
  };

  const handleLogin = async () => {
    if (!login.trim() || !clave.trim()) {
      Alert.alert('Validación', 'Debes ingresar usuario y contraseña.');
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(login.trim(), clave.trim());
      const token = response?.token;
      if (!token) {
        throw new Error('No se recibió token');
      }

      setLogin('');
      setClave('');
      onLogin(token);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Credenciales inválidas o error del servidor.';
      Alert.alert('Error de inicio de sesión', message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!nombre.trim() || !apellido.trim() || !login.trim() || !clave.trim()) {
      Alert.alert('Validación', 'Completa nombre, apellido, usuario y contraseña.');
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: telefono.trim(),
        login: login.trim(),
        clave: clave.trim(),
      });

      clearForm();
      if (response?.token) {
        onLogin(response.token);
      } else {
        setIsRegistering(false);
        Alert.alert('Registro completado', 'Ya puedes iniciar sesión con tu cuenta.');
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'No se pudo crear la cuenta. Verifica los datos e inténtalo de nuevo.';
      Alert.alert('Error de registro', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.card}>
        <Text style={styles.logo}>Gestión Proyectos</Text>
        <Text style={styles.title}>{isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}</Text>
        <Text style={styles.subtitle}>
          {isRegistering ? 'Regístrate para empezar a gestionar tus proyectos.' : 'Accede con tu usuario y contraseña.'}
        </Text>

        {isRegistering ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#9aa0a6"
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="words"
              returnKeyType="next"
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor="#9aa0a6"
              value={apellido}
              onChangeText={setApellido}
              autoCapitalize="words"
              returnKeyType="next"
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono (opcional)"
              placeholderTextColor="#9aa0a6"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
              returnKeyType="next"
            />
          </>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#9aa0a6"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#9aa0a6"
          value={clave}
          onChangeText={setClave}
          secureTextEntry
          returnKeyType="done"
        />

        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.disabledButton]}
          onPress={isRegistering ? handleRegister : handleLogin}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? (isRegistering ? 'Registrando...' : 'Iniciando...') : (isRegistering ? 'Crear cuenta' : 'Entrar')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.modeButton}
          onPress={() => {
            clearForm();
            setIsRegistering(!isRegistering);
          }}
          disabled={loading}
        >
          <Text style={styles.modeButtonText}>
            {isRegistering ? 'Ya tengo una cuenta · Iniciar sesión' : '¿No tienes cuenta? · Regístrate'}
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    color: '#7dd3fc',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.7,
  },
  modeButton: {
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 4,
  },
  modeButtonText: {
    color: '#7dd3fc',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
