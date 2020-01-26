import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { IRepository } from '../../common/types';
import * as repositoriesActions from '../../actions/repositoriesActions';
import searchReposApiHandler from '../../helpers/searchReposApiHandler';
import { IRepositoriesState } from '../../reducers/repositoriesReducer';

export interface IUseRepositoriesReturn {
  currentRepositoriesState: IRepositoriesState;
  searchRepos: (searchTerm: string) => Promise<void>;
  loadNextPage: () => Promise<void>;
}

const useRepositories = (): IUseRepositoriesReturn => {
  const dispatch = useDispatch();
  const currentRepositoriesState = useSelector(
    (state: RootState) => state.repositoriesReducers,
  );

  const wrapDispatchInUseCallback = (actionFunction: (props?: any) => any) =>
    useCallback(actionFunction, [dispatch]);

  const setRepositories = wrapDispatchInUseCallback(
    ({
      repositories,
      totalCount,
      currentPage,
      hasNextPage,
      searchTerm,
    }: {
      repositories: Array<IRepository>;
      totalCount?: number;
      currentPage?: number;
      hasNextPage?: boolean;
      searchTerm?: string;
    }) =>
      dispatch(
        repositoriesActions.updateRepositories({
          repositories,
          totalCount,
          currentPage,
          hasNextPage,
          searchTerm,
        }),
      ),
  );

  const pushRepositories = wrapDispatchInUseCallback(
    ({
      repositories,
      totalCount,
      currentPage,
      hasNextPage,
      searchTerm,
    }: {
      repositories: Array<IRepository>;
      totalCount?: number;
      currentPage?: number;
      hasNextPage?: boolean;
      searchTerm?: string;
    }) =>
      dispatch(
        repositoriesActions.pushRepositories({
          repositories,
          totalCount,
          currentPage,
          hasNextPage,
          searchTerm,
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
        hasNextPage: fetchResult.response?.hasNextPage,
        searchTerm: searchTerm,
      });

      finishFetching();
    } catch (error) {
      finishFetching('An error occurred during the request.');
    }
  };

  let isLoadingNextPage = false;

  const loadNextPage = async () => {
    try {
      const {
        searchTerm = '',
        currentPage = 1,
        hasNextPage,
      } = currentRepositoriesState;

      if (!searchTerm.trim() || !hasNextPage || isLoadingNextPage) {
        return;
      }

      isLoadingNextPage = true;

      const fetchResult = await searchReposApiHandler({
        searchTerm,
        page: currentPage + 1,
      });

      if (fetchResult.error) {
        console.log(fetchResult.error);
        return;
      }

      isLoadingNextPage = false;

      pushRepositories({
        repositories: fetchResult.response?.repositories || [],
        totalCount: fetchResult.response?.totalCount || 0,
        hasNextPage: fetchResult.response?.hasNextPage,
        searchTerm: searchTerm,
        currentPage: currentPage + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { currentRepositoriesState, searchRepos, loadNextPage };
};

export default useRepositories;
