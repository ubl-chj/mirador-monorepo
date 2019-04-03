import App from './containers/App';
import { Provider } from 'react-redux';
import React from 'react';
import { pluginStore } from './extend';

export * from './components';

interface IMiradorComponent {
  plugins: any
  store: any
}

export const MiradorComponent = ({ store, plugins }) => {
  pluginStore.storePlugins(plugins);
  return (<Provider store={store}><App/></Provider>);
};

