import { compose } from 'redux';
import { PrimaryWindow } from '../components/PrimaryWindow';
import { withPlugins } from '../extend';

const enhance = compose(
  withPlugins('PrimaryWindow'),
);

export default PrimaryWindow;
