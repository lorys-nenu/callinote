//import liraries
import { useUser } from '@/stores/user';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const Login = () => {
  const loguser = useUser().setUser;
  const user = useUser().user;
  console.log("login", user);
  const logme = () => {
    console.log('logme');
    loguser({
      id: "1",
      name: 'Lorys', 
      email: 'lorys.aveneau@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    router.replace("/(app)");
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TouchableOpacity onPress={logme}>
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
  },
});

//make this component available to the app
export default Login;
