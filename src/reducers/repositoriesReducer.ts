import { IRepository } from '../common/types';
import { RepositoriesActionType } from '../actions/repositoriesActions';
import * as repositoriesActionTypes from '../actions/actionTypes/repositoriesActionTypes';

export interface IRepositoriesState {
  repositories: Array<IRepository> | null;
  currentPage: number;
  isFetching: boolean;
  error: string | null;
  totalCount: number;
  hasNextPage: boolean;
}

export const INITIAL_REPOSITORIES_STATE: IRepositoriesState = {
  repositories: null,
  currentPage: 1,
  isFetching: false,
  error: null,
  totalCount: 0,
  hasNextPage: false,
};

const repositoriesReducer = (
  state: IRepositoriesState = INITIAL_REPOSITORIES_STATE,
  action?: RepositoriesActionType,
) => {
  if (!action) {
    return INITIAL_REPOSITORIES_STATE;
  }

  switch (action.type) {
    case repositoriesActionTypes.FETCH_REPOSITORIES_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case repositoriesActionTypes.FETCH_REPOSITORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case repositoriesActionTypes.FETCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case repositoriesActionTypes.UPDATE_REPOSITORIES:
      const { repositories, totalCount, currentPage } = action.data;

      return {
        ...state,
        repositories,
        ...(totalCount ? { totalCount } : {}),
        ...(currentPage ? { currentPage } : {}),
      };
    case repositoriesActionTypes.PUSH_REPOSITORIES:
      const {
        repositories: newRepositories,
        totalCount: newTotalCount,
        currentPage: newCurrentPage,
      } = action.data;

      return {
        ...state,
        repositories: [...(state.repositories || []), ...newRepositories],
        ...(newTotalCount ? { totalCount: newTotalCount } : {}),
        ...(newCurrentPage ? { currentPage: newCurrentPage } : {}),
      };

    case repositoriesActionTypes.RESET_REPOSITORIES_STATE:
      return INITIAL_REPOSITORIES_STATE;
    default:
      return state;
  }
};

export default repositoriesReducer;
