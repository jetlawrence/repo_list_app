import React from 'react';
import {
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <View style={styles.loginInputContainer}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="email address"
        />
      </View>
      <View style={styles.loginInputContainer}>
        <TextInput
          autoCapitalize="none"
          placeholder="password"
          secureTextEntry
        />
      </View>
      <View style={styles.loginButtonContainer}>
        <Button title="Login" onPress={() => {}} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginInputContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#00008b',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    margin: 20,
    padding: 20,
    justifyContent: 'center',
  },
  loginButtonContainer: {
    margin: 5,
  },
});

export default LoginScreen;
