import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Repositories from './pages/Repositories';
import Issues from './pages/Issues';

const Routes = createAppContainer(createSwitchNavigator({
  Repositories,
  Issues,
}));

export default Routes;
