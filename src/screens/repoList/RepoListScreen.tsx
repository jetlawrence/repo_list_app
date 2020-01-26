import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TextInput } from 'react-native';
import { logout } from '../../helpers/authHelper';
import { NavigationInjectedProps } from 'react-navigation';

const RepoListScreen = () => (
  <SafeAreaView style={styles.mainContainer}>
    <View style={styles.searchBar}>
      <TextInput autoCapitalize="none" placeholder="Search for repository" />
    </View>
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
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchBar: {
    width: '90%',
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: StyleSheet.hairlineWidth,
    margin: 20,
    padding: 20,
    justifyContent: 'center',
  },
  logoutButton: {
    marginHorizontal: 5,
    color: 'blue',
  },
});

export default RepoListScreen;
