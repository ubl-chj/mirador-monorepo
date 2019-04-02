import { PrimaryWindow } from '../components';
import { compose } from 'redux';
import { withPlugins } from '../extend';

const enhance = compose(
  withPlugins('PrimaryWindow'),
);

export default enhance(PrimaryWindow);
