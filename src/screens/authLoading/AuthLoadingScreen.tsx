import React, { useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { isLoggedIn } from '../../helpers/authHelper';

const AuthLoadingScreen: NavigationStackScreenComponent = props => {
  useEffect(() => {
    const navigateToNextScreen = async (): Promise<void> => {
      const loggedIn = await isLoggedIn();

      if (!loggedIn) {
        props.navigation.navigate('Auth');
        return;
      }

      props.navigation.navigate('App');
    };

    navigateToNextScreen();
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLoadingScreen;
