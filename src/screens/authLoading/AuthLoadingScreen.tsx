import React, { useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

const AuthLoadingScreen: NavigationStackScreenComponent = props => {
  useEffect(() => {
    props.navigation.navigate('Auth');
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
