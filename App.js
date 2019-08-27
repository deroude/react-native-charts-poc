import { createStackNavigator, createAppContainer } from 'react-navigation';
import VictoryDemo from "./VictoryDemo";
import WrapperDemo from "./WrapperDemo";
import HomeScreen from './Home';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Victory: { screen: VictoryDemo },
  Wrapper: { screen: WrapperDemo },
});

const App = createAppContainer(MainNavigator);

export default App;