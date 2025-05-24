import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    //const auth = getAuth();
    try {
      if (!email || !password) {
        Alert.alert('Please enter both email and password');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signed up as:', userCredential.user.email);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Signup failed', error.message);
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput placeholder="email" value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}
