import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ErrorView = React.memo(() => (
  <View style={styles.mainContainer}>
    <Text>An error occured</Text>
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ErrorView;
