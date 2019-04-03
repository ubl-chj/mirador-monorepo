import React, {ReactElement} from 'react';
import App from './containers/App';
import { Provider } from 'react-redux';
import { pluginStore } from './extend';

export * from './components';

interface IMiradorComponent {
  plugins: any
  store: any
}

export const MiradorComponent: React.FC<IMiradorComponent> = ({ store, plugins }): ReactElement => {
  pluginStore.storePlugins(plugins);
  return (<Provider store={store}><App/></Provider>);
};

