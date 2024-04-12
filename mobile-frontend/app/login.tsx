import { useState } from 'react';
import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@/app/components/Text';
import theme from '@/constants/theme';
import useLogin from '@/hooks/useLogin';
import Input from './components/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin()

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (error: any) {
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Input 
        placeholder="Email" 
        onChangeText={setEmail}
        value={email}
        label="Email"
        autoCapitalize='none'
        />
      <Input 
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        label="Password"
        autoCapitalize='none'
       />
       {error && <Text style={{color: "red"}}>{error}</Text>}
      <TouchableOpacity onPress={handleLogin}>
        <Text>Log me</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.black,
    width: '100%',
  }
});

//make this component available to the app
export default Login;
