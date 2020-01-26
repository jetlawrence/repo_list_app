import React, { useCallback } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, Text } from 'react-native';
import { logout } from '../../helpers/authHelper';
import { useDispatch } from 'react-redux';
import { resetRepositoriesState } from '../../actions/repositoriesActions';

const LogoutButton = React.memo(() => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const clearStateOnLogout = useCallback(() => {
    dispatch(resetRepositoriesState());
  }, [dispatch]);

  return (
    <Text
      style={styles.logoutButton}
      onPress={() => {
        clearStateOnLogout();
        logout();
        navigate('Auth');
      }}>
      Logout
    </Text>
  );
});

const styles = StyleSheet.create({
  logoutButton: {
    marginHorizontal: 5,
    color: 'blue',
  },
});

export default LogoutButton;
