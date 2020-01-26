import React from 'react';
import { IRepository } from '../../common/types';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const RepoDetailsComponent = React.memo(
  ({ repository }: { repository: IRepository }) => {
    return (
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.repositoryName}>{repository.name}</Text>
        <Text style={styles.stargazersCount}>
          {'\u2605' + ` ${repository.stargazersCount}`}
        </Text>
        {repository.description && (
          <View style={styles.repositoryDescriptionContainer}>
            <Text style={styles.repositoryDescription}>
              {repository.description}
            </Text>
          </View>
        )}
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  repositoryName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  stargazersCount: {
    fontSize: 20,
  },
  repositoryDescriptionContainer: {
    marginVertical: 10,
  },
  repositoryDescription: {
    fontSize: 15,
  },
});

export default RepoDetailsComponent;
