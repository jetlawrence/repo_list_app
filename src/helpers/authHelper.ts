import AsyncStorage from '@react-native-community/async-storage';

export const USER_TOKEN_KEY = 'USER_TOKEN_KEY';

export const login = (email: string, password: string) =>
  AsyncStorage.setItem(USER_TOKEN_KEY, `${email}_${password}`);
export const logout = () => AsyncStorage.removeItem(USER_TOKEN_KEY);
