import { login, logout } from '../authHelper';
import AsyncStorage from '@react-native-community/async-storage';

describe('authHelper', () => {
  it('calls AsyncStorage.setItem to save (fake) user token on login', () => {
    login('test@mail.com', 'pass123');

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'USER_TOKEN',
      expect.any(String),
    );
  });
  it('calls AsyncStorage.removeItem to remove saved user token on logout', () => {
    logout();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('USER_TOKEN');
  });
});
