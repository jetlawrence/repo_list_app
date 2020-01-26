import React, { useCallback } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TextInput } from 'react-native';
import { logout } from '../../helpers/authHelper';
import { NavigationInjectedProps } from 'react-navigation';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { IRepository } from '../../common/types';
import * as repositoriesActions from '../../actions/repositoriesActions';
import searchReposApiHandler from '../../helpers/searchReposApiHandler';
import debounce from 'lodash.debounce';
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';
import RepoListView from './RepoListView';
import InitialView from './InitialView';

const RepoListScreen: NavigationStackScreenComponent = props => {
  const dispatch = useDispatch();
  const currentRepositoriesState = useSelector(
    (state: RootState) => state.repositoriesReducers,
  );

  const { isFetching, error, repositories } = currentRepositoriesState;

  const wrapDispatchInUseCallback = (actionFunction: (props?: any) => any) =>
    useCallback(actionFunction, [dispatch]);

  const setRepositories = wrapDispatchInUseCallback(
    ({
      repositories,
      totalCount,
      currentPage,
    }: {
      repositories: Array<IRepository>;
      totalCount?: number;
      currentPage?: number;
    }) =>
      dispatch(
        repositoriesActions.updateRepositories({
          repositories,
          totalCount,
          currentPage,
        }),
      ),
  );

  const startFetching = wrapDispatchInUseCallback(() =>
    dispatch(repositoriesActions.onRequestRepositories()),
  );

  const finishFetching = wrapDispatchInUseCallback((error?: string) =>
    dispatch(
      error
        ? repositoriesActions.onRequestRepositoriesFailed(error)
        : repositoriesActions.onRequestRepositoriesSuccess(),
    ),
  );

  const searchRepos = async (searchTerm: string = '') => {
    try {
      if (!searchTerm.trim()) {
        setRepositories({ repositories: null });
        return;
      }

      startFetching();

      const fetchResult = await searchReposApiHandler({ searchTerm });

      if (fetchResult.error) {
        finishFetching(fetchResult.error);

        return;
      }

      setRepositories({
        repositories: fetchResult.response?.repositories || [],
        totalCount: fetchResult.response?.totalCount || 0,
      });

      finishFetching();
    } catch (error) {
      finishFetching('An error occurred during the request.');
    }
  };

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
