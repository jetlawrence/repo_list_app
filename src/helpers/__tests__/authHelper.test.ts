import { login, logout, isLoggedIn } from '../authHelper';
import AsyncStorage from '@react-native-community/async-storage';

describe('authHelper', () => {
  it('calls AsyncStorage.setItem to save (fake) user token on login', () => {
    login('test@mail.com', 'pass123');

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'USER_TOKEN_KEY',
      expect.any(String),
    );
  });
  it('calls AsyncStorage.removeItem to remove saved user token on logout', () => {
    logout();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('USER_TOKEN_KEY');
  });
  it('isLoggedIn calls AsyncStorage.getItem with USER_TOKEN_KEY as parameter', () => {
    isLoggedIn();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('USER_TOKEN_KEY');
  });
  it('isLoggedIn returns true if AsyncStorage has saved user token key', () => {
    jest.mock('@react-native-community/async-storage', () => ({
      getItem: (key: string) => key === 'USER_TOKEN_KEY',
    }));

    expect(isLoggedIn()).toBe(true);
  });
  it('isLoggedIn returns false if AsyncStorage has not saved user token key', () => {
    jest.mock('@react-native-community/async-storage', () => ({
      getItem: (key: string) => !(key === 'USER_TOKEN_KEY'),
    }));

    expect(isLoggedIn()).toBe(false);
  });
});
