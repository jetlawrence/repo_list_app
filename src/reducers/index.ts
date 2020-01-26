import { combineReducers } from 'redux';
import repositoriesReducers from './repositoriesReducer';

const rootReducer = combineReducers({
  repositoriesReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
