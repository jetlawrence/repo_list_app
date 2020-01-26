import IRepository from '../common/types/IRepository';

export const onRequestRepositories = () => {};
export const onRequestRepositoriesFailed = (error: string) => {};
export const onRequestRepositoriesSuccess = () => {};
export const updateRepositories = ({
  repositories,
  currentPage,
  totalCount,
}: {
  repositories: Array<IRepository>;
  currentPage?: number;
  totalCount?: number;
}) => {};
