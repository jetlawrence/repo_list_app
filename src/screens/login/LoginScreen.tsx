import React, { useRef, useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  Button,
} from 'react-native';
import { login } from '../../helpers/authHelper';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

const LoginScreen: NavigationStackScreenComponent = props => {
  const passwordInputRef = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(false);

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [email, password]);

  const onLogin = async (): Promise<void> => {
    await login(email, password);
    props.navigation.navigate('App');
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <View style={styles.loginInputContainer}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="email address"
          onChangeText={setEmail}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          returnKeyType="next"
        />
      </View>
      <View style={styles.loginInputContainer}>
        <TextInput
          ref={passwordInputRef}
          autoCapitalize="none"
          placeholder="password"
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.loginButtonContainer}>
        <Button
          disabled={loginDisabled}
          title="Login"
          onPress={() => onLogin()}
        />
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
