import React from 'react';
import { SafeAreaView, Button, View, StyleSheet, Linking } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { IRepository } from '../../common/types';
import RepoDetailsComponent from './RepoDetailsComponent';

const RepoDetailsScreen: NavigationStackScreenComponent = props => {
  const repository: IRepository = props.navigation.getParam('repository');

  if (!repository) {
    return null;
  }

  const onGoToRepo = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Failed to open url: ' + url);
      }
    });
  };

  return (
    <SafeAreaView>
      <RepoDetailsComponent repository={repository} />
      {repository.url && (
        <View style={styles.goToRepoButtonContainer}>
          <Button
            title="Go to repo"
            onPress={() => onGoToRepo(repository.url)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  goToRepoButtonContainer: {
    margin: 10,
  },
});

export default RepoDetailsScreen;
