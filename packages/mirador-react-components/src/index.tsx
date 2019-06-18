import React, {ReactElement} from 'react';
import App from './containers/App';

export * from './components';
export * from './custom-components';

interface IMiradorComponent {
  plugins: any
  store: any
}

export const MiradorComponent: React.FC<IMiradorComponent> = (): ReactElement => {
  return (<App/>);
};

