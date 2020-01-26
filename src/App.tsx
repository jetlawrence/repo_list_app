import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RepoListScreen from './screens/repoList/RepoListScreen';
import RepoDetailsScreen from './screens/repoDetails/RepoDetailsScreen';
import LoginScreen from './screens/login/LoginScreen';
import AuthLoadingScreen from './screens/authLoading/AuthLoadingScreen';

const AppStack = createStackNavigator({
  RepoList: RepoListScreen,
  RepoDetails: RepoDetailsScreen,
});
const AuthStack = createStackNavigator({
  Login: LoginScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
