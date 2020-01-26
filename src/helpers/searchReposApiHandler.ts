import { IApiRequestResult, IRepository } from '../common/types';

export interface IRepoListRequestrResult {
  page: number;
  totalCount: number;
  repositories: Array<IRepository>;
}

const searchReposApiHandler = async ({
  searchTerm,
  page = 1,
}: {
  searchTerm: string;
  page?: number;
}): Promise<IApiRequestResult<IRepoListRequestrResult>> => {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURI(
        searchTerm,
      )}&page=${page}&per_page=50`,
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
      },
    };
  } catch (error) {
    return {
      error: 'An error occurred during request.',
    };
  }
};

export default searchReposApiHandler;
