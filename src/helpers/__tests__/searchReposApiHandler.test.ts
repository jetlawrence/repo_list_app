import searchReposApiHandler from '../searchReposApiHandler';

const mockResponse = {
  total_count: 141221,
  incomplete_results: false,
  items: [
    {
      id: 29028775,
      node_id: 'MDEwOlJlcG9zaXRvcnkyOTAyODc3NQ==',
      name: 'react-native',
      full_name: 'facebook/react-native',
      private: false,
      html_url: 'https://github.com/facebook/react-native',
      description: 'A framework for building native apps with React.',
      stargazers_count: 84391,
    },
    {
      id: 32948863,
      node_id: 'MDEwOlJlcG9zaXRvcnkzMjk0ODg2Mw==',
      name: 'awesome-react-native',
      full_name: 'jondot/awesome-react-native',
      private: false,
      description: 'Awesome react native',
      html_url: 'https://github.com/jondot/awesome-react-native',
      stargazers_count: 26373,
    },
  ],
};

describe('searchReposApiHandler', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('calls https://api.github.com/search/repositories', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await searchReposApiHandler({
      searchTerm: 'hello',
      page: 2,
    });

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'https://api.github.com/search/repositories?q=hello&page=2&per_page=50',
    );
  });

  it('returns formatted data with hasNextPage as true if next page will still have repositorie (given default 50 per page)', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await searchReposApiHandler({
      searchTerm: 'hello',
      page: 2,
    });

    expect(result).toEqual({
      response: {
        page: 2,
        totalCount: 141221,
        hasNextPage: true,
        repositories: [
          {
            id: 29028775,
            name: 'react-native',
            url: 'https://github.com/facebook/react-native',
            description: 'A framework for building native apps with React.',
            stargazersCount: 84391,
          },
          {
            id: 32948863,
            name: 'awesome-react-native',
            description: 'Awesome react native',
            url: 'https://github.com/jondot/awesome-react-native',
            stargazersCount: 26373,
          },
        ],
      },
    });
  });

  it('returns formatted data with hasNextPage as false if no more next page (given default 50 per page)', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await searchReposApiHandler({
      searchTerm: 'hello',
      page: 2826,
    });

    expect(result).toEqual({
      response: {
        page: 2826,
        totalCount: 141221,
        hasNextPage: false,
        repositories: [
          {
            id: 29028775,
            name: 'react-native',
            url: 'https://github.com/facebook/react-native',
            description: 'A framework for building native apps with React.',
            stargazersCount: 84391,
          },
          {
            id: 32948863,
            name: 'awesome-react-native',
            description: 'Awesome react native',
            url: 'https://github.com/jondot/awesome-react-native',
            stargazersCount: 26373,
          },
        ],
      },
    });
  });
});
