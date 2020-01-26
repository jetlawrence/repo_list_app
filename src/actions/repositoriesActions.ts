import IRepository from '../common/types/IRepository';
import * as repositoriesActionTypes from './actionTypes/repositoriesActionTypes';

interface IFetchRepositoriesRequestAction {
  type: typeof repositoriesActionTypes.FETCH_REPOSITORIES_REQUEST;
}

interface IFetchRepositoriesFailureAction {
  type: typeof repositoriesActionTypes.FETCH_REPOSITORIES_FAILURE;
  error: string;
}

interface IFetchRepositoriesSuccessAction {
  type: typeof repositoriesActionTypes.FETCH_REPOSITORIES_SUCCESS;
}

interface IRepositoriesActionData {
  repositories: Array<IRepository>;
  totalCount?: number;
  currentPage?: number;
  hasNextPage?: boolean;
  searchTerm?: string;
}

interface IUpdateRepositoriesAction {
  type: typeof repositoriesActionTypes.UPDATE_REPOSITORIES;
  data: IRepositoriesActionData;
}

interface IResetRepositoriesStateAction {
  type: typeof repositoriesActionTypes.RESET_REPOSITORIES_STATE;
}

interface IPushRepositoriesAction {
  type: typeof repositoriesActionTypes.PUSH_REPOSITORIES;
  data: IRepositoriesActionData;
}

export type RepositoriesActionType =
  | IFetchRepositoriesRequestAction
  | IFetchRepositoriesFailureAction
  | IFetchRepositoriesSuccessAction
  | IUpdateRepositoriesAction
  | IResetRepositoriesStateAction
  | IPushRepositoriesAction;

export const onRequestRepositories = (): IFetchRepositoriesRequestAction => {
  return {
    type: repositoriesActionTypes.FETCH_REPOSITORIES_REQUEST,
  };
};
export const onRequestRepositoriesFailed = (
  error: string,
): IFetchRepositoriesFailureAction => {
  return {
    type: repositoriesActionTypes.FETCH_REPOSITORIES_FAILURE,
    error,
  };
};
export const onRequestRepositoriesSuccess = (): IFetchRepositoriesSuccessAction => {
  return {
    type: repositoriesActionTypes.FETCH_REPOSITORIES_SUCCESS,
  };
};

export const updateRepositories = ({
  repositories,
  currentPage,
  totalCount,
  hasNextPage,
  searchTerm,
}: IRepositoriesActionData): IUpdateRepositoriesAction => {
  return {
    type: repositoriesActionTypes.UPDATE_REPOSITORIES,
    data: {
      repositories,
      currentPage,
      totalCount,
      hasNextPage,
      searchTerm,
    },
  };
};

export const pushRepositories = ({
  repositories,
  currentPage,
  totalCount,
  hasNextPage,
  searchTerm,
}: IRepositoriesActionData): IPushRepositoriesAction => {
  return {
    type: repositoriesActionTypes.PUSH_REPOSITORIES,
    data: {
      repositories,
      currentPage,
      totalCount,
      hasNextPage,
      searchTerm,
    },
  };
};

export const resetRepositoriesState = (): IResetRepositoriesStateAction => {
  return {
    type: repositoriesActionTypes.RESET_REPOSITORIES_STATE,
  };
};
