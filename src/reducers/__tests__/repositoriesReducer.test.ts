import repositoriesReducer, {
  INITIAL_REPOSITORIES_STATE,
} from '../repositoriesReducer';
import {
  onRequestRepositories,
  onRequestRepositoriesFailed,
  onRequestRepositoriesSuccess,
  updateRepositories,
} from '../../actions/repositoriesActions';

describe('repositoriesReducer', () => {
  it('returns initial state', () => {
    expect(repositoriesReducer(undefined, {})).toEqual(
      INITIAL_REPOSITORIES_STATE,
    );
  });

  it('handles FETCH_REPOSITORIES_REQUEST', () => {
    expect(repositoriesReducer(undefined, onRequestRepositories())).toEqual({
      ...INITIAL_REPOSITORIES_STATE,
      isFetching: true,
      error: null,
    });

    it('handles setting state of isFetching from false to true and error to null', () => {
      expect(
        repositoriesReducer(
          {
            ...INITIAL_REPOSITORIES_STATE,
            isFetching: false,
            error: '',
          },
          onRequestRepositories(),
        ),
      ).toEqual({
        ...INITIAL_REPOSITORIES_STATE,
        isFetching: true,
        error: null,
      });
    });
  });

  it('handles FETCH_REPOSITORIES_FAILURE', () => {
    expect(
      repositoriesReducer(undefined, onRequestRepositoriesFailed('Error')),
    ).toEqual({
      ...INITIAL_REPOSITORIES_STATE,
      isFetching: false,
      error: 'Error',
    });

    it('handles setting state of isFetching from true to false and setting of error', () => {
      expect(
        repositoriesReducer(
          {
            ...INITIAL_REPOSITORIES_STATE,
            isFetching: false,
            error: '',
          },
          onRequestRepositoriesFailed('Error'),
        ),
      ).toEqual({
        ...INITIAL_REPOSITORIES_STATE,
        isFetching: false,
        error: 'Error',
      });
    });
  });

  it('handles FETCH_REPOSITORIES_SUCCESS', () => {
    expect(
      repositoriesReducer(undefined, onRequestRepositoriesSuccess()),
    ).toEqual({
      ...INITIAL_REPOSITORIES_STATE,
      isFetching: false,
      error: null,
    });

    it('handles setting state of isFetching from true to false and setting of error to null', () => {
      expect(
        repositoriesReducer(
          {
            ...INITIAL_REPOSITORIES_STATE,
            isFetching: true,
            error: 'Error',
          },
          onRequestRepositoriesSuccess(),
        ),
      ).toEqual({
        ...INITIAL_REPOSITORIES_STATE,
        isFetching: false,
        error: null,
      });
    });
  });

  it('handles UPDATE_REPOSITORIES', () => {
    const mockData = {
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

    const mockData2 = {
      repositories: [
        {
          id: 2,
          name: 'Repo2',
          description: 'A repo2',
          stargazersCount: 2,
          url: 'www.yahoo.com',
        },
      ],
      totalCount: 9,
      currentPage: 4,
    };

    expect(
      repositoriesReducer(undefined, updateRepositories(mockData)),
    ).toEqual({
      ...INITIAL_REPOSITORIES_STATE,
      ...mockData,
    });

    it('handles updating repositories by replacing old repositories with new repositories', () => {
      expect(
        repositoriesReducer(
          {
            ...INITIAL_REPOSITORIES_STATE,
            ...mockData,
          },
          updateRepositories(mockData2),
        ),
      ).toEqual({
        ...INITIAL_REPOSITORIES_STATE,
        ...mockData2,
      });
    });
  });
});
