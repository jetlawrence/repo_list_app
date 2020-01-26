import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const InitialView = React.memo(() => (
  <View style={styles.mainContainer}>
    <Text>Type in search bar to search for Github repositories.</Text>
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InitialView;
