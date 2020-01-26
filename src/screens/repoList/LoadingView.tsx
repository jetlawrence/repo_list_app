import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const LoadingView = React.memo(() => (
  <View style={styles.mainContainer}>
    <ActivityIndicator size="large" />
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingView;
