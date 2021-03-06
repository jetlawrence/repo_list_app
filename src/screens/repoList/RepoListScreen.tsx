import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Platform,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import debounce from 'lodash.debounce';
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';
import RepoListView from './RepoListView';
import InitialView from './InitialView';
import useRepositories from './useRepositories';
import LogoutButton from './LogoutButton';

const RepoListScreen: NavigationStackScreenComponent = props => {
  const {
    currentRepositoriesState,
    searchRepos,
    loadNextPage,
  } = useRepositories();
  const {
    isFetching,
    error,
    repositories,
    hasNextPage,
  } = currentRepositoriesState;

  const searchReposDebounced = debounce(searchRepos, 800);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.searchBar}>
        <TextInput
          autoCapitalize="none"
          placeholder="Search for repository"
          onChangeText={searchReposDebounced}
        />
      </View>
      {isFetching ? (
        <LoadingView />
      ) : error ? (
        <ErrorView />
      ) : repositories ? (
        <RepoListView
          repositories={repositories}
          onPressRepository={repository =>
            props.navigation.push('RepoDetails', { repository })
          }
          hasNextPage={hasNextPage}
          onLoadNextPage={loadNextPage}
        />
      ) : (
        <InitialView />
      )}
    </SafeAreaView>
  );
};

RepoListScreen.navigationOptions = () => ({
  headerRight: () => <LogoutButton />,
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
    paddingHorizontal: 20,
    paddingVertical: Platform.OS == 'ios' ? 20 : 0,
    justifyContent: 'center',
  },
});

export default RepoListScreen;
