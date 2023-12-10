import {AppRegistry} from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import store from '../app/src/redux';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

const ReduxApp = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

AppRegistry.registerComponent(appName, () => ReduxApp);
