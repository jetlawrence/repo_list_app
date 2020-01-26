import { IRepository } from '../common/types';
import { RepositoriesActionType } from '../actions/repositoriesActions';

export interface IRepositoriesState {
  repositories: Array<IRepository> | null;
  currentPage: number;
  isFetching: boolean;
  error: string | null;
  totalCount: number;
}

export const INITIAL_REPOSITORIES_STATE: IRepositoriesState = {
  repositories: null,
  currentPage: 1,
  isFetching: false,
  error: null,
  totalCount: 0,
};

const repositoriesReducer = (
  state: IRepositoriesState = INITIAL_REPOSITORIES_STATE,
  action: RepositoriesActionType | {},
) => {};

export default repositoriesReducer;
