import React, { useCallback } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TextInput } from 'react-native';
import { logout } from '../../helpers/authHelper';
import { NavigationInjectedProps } from 'react-navigation';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import debounce from 'lodash.debounce';
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';
import RepoListView from './RepoListView';
import InitialView from './InitialView';
import useRepositories from './useRepositories';

const RepoListScreen: NavigationStackScreenComponent = props => {
  const { currentRepositoriesState, searchRepos } = useRepositories();
  const { isFetching, error, repositories } = currentRepositoriesState;

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
        />
      ) : (
        <InitialView />
      )}
    </SafeAreaView>
  );
};

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
