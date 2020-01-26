import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { logout } from '../../helpers/authHelper';
import { NavigationInjectedProps } from 'react-navigation';

const RepoListScreen = () => (
  <SafeAreaView>
    <Text>RepoListScreen</Text>
  </SafeAreaView>
);

RepoListScreen.navigationOptions = ({
  navigation,
}: NavigationInjectedProps) => ({
  headerRight: () => (
    <Text
      style={styles.logoutButton}
      onPress={() => {
        logout();
        navigation.navigate('Auth');
      }}>
      Logout
    </Text>
  ),
});

const styles = StyleSheet.create({
  logoutButton: {
    marginHorizontal: 5,
    color: 'blue',
  },
});

export default RepoListScreen;
