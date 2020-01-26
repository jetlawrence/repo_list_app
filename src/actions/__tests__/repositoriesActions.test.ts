import * as repositoriesActionTypes from '../actionTypes/repositoriesActionTypes';
import * as repositoriesActions from '../repositoriesActions';
import IRepository from '../../common/types/IRepository';

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
      },
    };

    expect(repositoriesActions.updateRepositories(repositoriesData)).toEqual(
      expectedAction,
    );
  });
});
