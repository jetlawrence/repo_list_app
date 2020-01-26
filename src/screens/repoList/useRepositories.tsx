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

  return { currentRepositoriesState, searchRepos };
};

export default useRepositories;
