import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';

import App from './App';

import store from '../app/src/redux';

    const ReduxApp = () => (
      <Provider store={store}>
        <App />
      </Provider>
    );
registerRootComponent(ReduxApp);
