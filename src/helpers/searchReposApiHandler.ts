import { IApiRequestResult, IRepository } from '../common/types';
import mockSearchReposApiResponse from './mockSearchReposApiResponse';

export interface IRepoListRequestrResult {
  page: number;
  totalCount: number;
  repositories: Array<IRepository>;
  hasNextPage: boolean;
}

const searchReposApiHandler = async ({
  searchTerm,
  page = 1,
}: {
  searchTerm: string;
  page?: number;
}): Promise<IApiRequestResult<IRepoListRequestrResult>> => {
  try {
    const PER_PAGE_COUNT = 50;
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURI(
        searchTerm,
      )}&page=${page}&per_page=${PER_PAGE_COUNT}`,
    );

    const responseJson = await response.json();

    if (!responseJson || responseJson['errors'] || !responseJson['items']) {
      return {
        error: 'An error occurred during request.',
      };
    }

    const totalCount = responseJson['total_count'] || 0;

    return {
      response: {
        page,
        totalCount,
        repositories: responseJson['items'].map((item: any) => ({
          id: item['id'],
          name: item['name'] || '',
          description: item['description'] || '',
          stargazersCount: item['stargazers_count'] || 0,
          url: item['html_url'] || '',
        })),
        hasNextPage: Math.ceil(totalCount / PER_PAGE_COUNT) > page,
      },
    };
  } catch (error) {
    return {
      error: 'An error occurred during request.',
    };
  }
};

export default searchReposApiHandler;
