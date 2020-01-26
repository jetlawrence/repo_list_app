import React from 'react';
import { IRepository } from '../../common/types';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import RepoListItem from './RepoListItem';

interface IProps {
  repositories: Array<IRepository>;
  onPressRepository?: (repository: IRepository) => any;
}

const RepoListView = React.memo((props: IProps) => (
  <View style={styles.mainContainer}>
    <FlatList<IRepository>
      data={props.repositories}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => (
        <RepoListItem
          repository={item}
          onPress={repository =>
            props.onPressRepository && props.onPressRepository(repository)
          }
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={<Text>No repositories found</Text>}
      contentContainerStyle={
        !props.repositories.length ? styles.emptyListContainer : null
      }
    />
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  },
});

export default RepoListView;
