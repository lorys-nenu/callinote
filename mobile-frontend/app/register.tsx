import { useState } from 'react';
import { Link, router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@/app/components/Text';
import theme from '@/constants/theme';
import useRegister from '@/hooks/useRegister';
import Input from './components/Input';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error } = useRegister()

  const handleLogin = async () => {
    try {
      await register({ email, password });
      if (!error) router.push('/');
    } catch (error: any) {
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <Text>Register</Text>
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
        <Text>Sign In</Text>
      </TouchableOpacity>
      <Link href="/login" asChild replace>
        <TouchableOpacity>
          <Text>Already an account ? Log in</Text>
        </TouchableOpacity>
      </Link>
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
export default Register;
