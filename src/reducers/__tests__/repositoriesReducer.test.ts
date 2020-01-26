import repositoriesReducer, {
  INITIAL_REPOSITORIES_STATE,
} from '../repositoriesReducer';
import {
  onRequestRepositories,
  onRequestRepositoriesFailed,
  onRequestRepositoriesSuccess,
  updateRepositories,
  resetRepositoriesState,
} from '../../actions/repositoriesActions';

describe('repositoriesReducer', () => {
  it('returns initial state', () => {
    expect(repositoriesReducer(undefined)).toEqual(INITIAL_REPOSITORIES_STATE);
  });

  describe('FETCH_REPOSITORIES_REQUEST', () => {
    it('handles FETCH_REPOSITORIES_REQUEST', () => {
      expect(repositoriesReducer(undefined, onRequestRepositories())).toEqual({
        ...INITIAL_REPOSITORIES_STATE,
        isFetching: true,
        error: null,
      });
    });

    it('handles setting state of isFetching from false to true and error to null during FETCH_REPOSITORIES_REQUEST', () => {
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

  describe('FETCH_REPOSITORIES_FAILURE', () => {
    it('handles FETCH_REPOSITORIES_FAILURE', () => {
      expect(
        repositoriesReducer(undefined, onRequestRepositoriesFailed('Error')),
      ).toEqual({
        ...INITIAL_REPOSITORIES_STATE,
        isFetching: false,
        error: 'Error',
      });
    });

    it('handles setting state of isFetching from true to false and setting of error during FETCH_REPOSITORIES_FAILURE', () => {
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

  describe('FETCH_REPOSITORIES_SUCCESS', () => {
    it('handles FETCH_REPOSITORIES_SUCCESS', () => {
      expect(
        repositoriesReducer(undefined, onRequestRepositoriesSuccess()),
      ).toEqual({
        ...INITIAL_REPOSITORIES_STATE,
        isFetching: false,
        error: null,
      });
    });

    it('handles setting state of isFetching from true to false and setting of error to null during FETCH_REPOSITORIES_SUCCESS', () => {
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

  describe('UPDATE_REPOSITORIES', () => {
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

    const mockData3 = {
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
    };

    it('handles UPDATE_REPOSITORIES', () => {
      expect(
        repositoriesReducer(undefined, updateRepositories(mockData)),
      ).toEqual({
        ...INITIAL_REPOSITORIES_STATE,
        ...mockData,
      });
    });

    it('handles PUSH_REPOSITORIES by pushing repositories to already existing repositories state', () => {
      expect(
        repositoriesReducer(
          {
            ...INITIAL_REPOSITORIES_STATE,
            ...mockData,
          },
          updateRepositories(mockData3),
        ),
      ).toEqual({
        ...INITIAL_REPOSITORIES_STATE,
        ...mockData,
        repositories: [...mockData.repositories, mockData3],
      });
    });

    it('handles updating repositories by replacing old repositories with new repositories during UPDATE_REPOSITORIES', () => {
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

    it('handles RESET_REPOSITORIES_STATE and resets state to initial state', () => {
      expect(
        repositoriesReducer(
          {
            ...INITIAL_REPOSITORIES_STATE,
            ...mockData,
          },
          resetRepositoriesState(),
        ),
      ).toEqual(INITIAL_REPOSITORIES_STATE);
    });
  });
});
