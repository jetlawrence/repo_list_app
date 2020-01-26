import { IRepository } from '../common/types';

export interface IRepositoriesState {
  repositories: Array<IRepository> | null;
  currentPage: number;
  isFetching: boolean;
  error: string | null;
  totalCount: number;
}
