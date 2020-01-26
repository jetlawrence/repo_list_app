import * as repositoriesActionTypes from '../actionTypes/repositoriesActionTypes';
import * as repositoriesActions from '../repositoriesActions';

describe('repositoriesActions', () => {
  it('should create an action for start of request of repositories', () => {
    const expectedAction = {
      type: repositoriesActionTypes.FETCH_REPOSITORIES_REQUEST,
    };

    expect(repositoriesActions.onRequestRepositories()).toEqual(expectedAction);
  });

  it('should create an action for failure of request of repositories', () => {
    const expectedAction = {
      type: repositoriesActionTypes.FETCH_REPOSITORIES_FAILURE,
      error: 'Error',
    };

    expect(repositoriesActions.onRequestRepositoriesFailed('Error')).toEqual(
      expectedAction,
    );
  });

  it('should create an action for success of request of repositories', () => {
    const expectedAction = {
      type: repositoriesActionTypes.FETCH_REPOSITORIES_SUCCESS,
    };

    expect(repositoriesActions.onRequestRepositoriesSuccess()).toEqual(
      expectedAction,
    );
  });

  it('should create an action for updating repositories', () => {
    const repositoriesData = {
      repositories: [
        {
          id: 1,
          name: 'Repo',
          description: 'A repo',
          stargazersCount: 1,
          url: 'www.google.com',
        },
      ],
      totalCount: 10,
      currentPage: 5,
      hasNextPage: true,
      searchTerm: 'Repo',
    };

    const expectedAction = {
      type: repositoriesActionTypes.UPDATE_REPOSITORIES,
      data: {
        repositories: [
          {
            id: 1,
            name: 'Repo',
            description: 'A repo',
            stargazersCount: 1,
            url: 'www.google.com',
          },
        ],
        totalCount: 10,
        currentPage: 5,
        hasNextPage: true,
        searchTerm: 'Repo',
      },
    };

    expect(repositoriesActions.updateRepositories(repositoriesData)).toEqual(
      expectedAction,
    );
  });

  it('should create an action for pushing repositories to state', () => {
    const expectedAction = {
      type: repositoriesActionTypes.PUSH_REPOSITORIES,
      data: {
        repositories: [
          {
            id: 3,
            name: 'Repo3',
            description: 'A repo3',
            stargazersCount: 3,
            url: 'www.google3.com',
          },
        ],
        totalCount: 10,
        currentPage: 6,
        hasNextPage: false,
        searchTerm: 'Repo',
      },
    };

    expect(
      repositoriesActions.pushRepositories({
        repositories: [
          {
            id: 3,
            name: 'Repo3',
            description: 'A repo3',
            stargazersCount: 3,
            url: 'www.google3.com',
          },
        ],
        totalCount: 10,
        currentPage: 6,
        hasNextPage: false,
        searchTerm: 'Repo',
      }),
    ).toEqual(expectedAction);
  });

  it('should create an action for resetting of repositories state', () => {
    const expectedAction = {
      type: repositoriesActionTypes.RESET_REPOSITORIES_STATE,
    };

    expect(repositoriesActions.resetRepositoriesState()).toEqual(
      expectedAction,
    );
  });
});
