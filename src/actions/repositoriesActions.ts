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

interface IUpdateRepositoriesAction {
  type: typeof repositoriesActionTypes.UPDATE_REPOSITORIES;
  data: {
    repositories: Array<IRepository>;
    totalCount?: number;
    currentPage?: number;
  };
}

interface IResetRepositoriesStateAction {
  type: typeof repositoriesActionTypes.RESET_REPOSITORIES_STATE;
}

interface IPushRepositoriesAction {
  type: typeof repositoriesActionTypes.PUSH_REPOSITORIES;
  data: {
    repositories: Array<IRepository>;
    totalCount?: number;
    currentPage?: number;
  };
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
}: {
  repositories: Array<IRepository>;
  currentPage?: number;
  totalCount?: number;
}): IUpdateRepositoriesAction => {
  return {
    type: repositoriesActionTypes.UPDATE_REPOSITORIES,
    data: {
      repositories,
      currentPage,
      totalCount,
    },
  };
};

export const resetRepositoriesState = (): IResetRepositoriesStateAction => {
  return {
    type: repositoriesActionTypes.RESET_REPOSITORIES_STATE,
  };
};

export const pushRepositories = ({
  repositories,
  currentPage,
  totalCount,
}: {
  repositories: Array<IRepository>;
  currentPage?: number;
  totalCount?: number;
}): IPushRepositoriesAction => {
  return {
    type: repositoriesActionTypes.PUSH_REPOSITORIES,
    data: {
      repositories,
      currentPage,
      totalCount,
    },
  };
};
