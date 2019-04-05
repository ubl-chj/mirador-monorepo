import React, {useContext} from 'react';
import {ModernMosaicWindowContext} from 'react-mosaic-component';
import PrimaryWindow from '../../containers/window/PrimaryWindow';
import { Window } from '../window/Window';
import WindowTopBar from '../../containers/window/WindowTopBar';
import { shallow } from 'enzyme';
const context = useContext(ModernMosaicWindowContext);

/** create wrapper */
function createWrapper(props, context?: any) {
  return shallow(
    <Window
      window={window}
      {...props}
    />,
    { context },
  );
}

describe('Window', () => {
  let wrapper;
  const window = {
    height: 400,
    id: 123,
    maximized: false,
    width: 400,
    x: 2700,
    y: 2700,
  };
  it('should render nothing, if provided with no window data', () => {
    wrapper = shallow(<Window focusWindow={null} label={null} manifest={null} window={null} workspaceType={null} />);
    expect(wrapper.find('.mirador-window')).toHaveLength(0);
  });
  it('should render outer element', () => {
    wrapper = createWrapper({ window });
    expect(wrapper.find('.mirador-window')).toHaveLength(1);
  });
  it('should render <WindowTopBar>', () => {
    wrapper = createWrapper({ window });
    expect(wrapper.find(WindowTopBar)).toHaveLength(1);
  });
  it('should render <PrimaryWindow>', () => {
    wrapper = createWrapper({ window });
    expect(wrapper.find(PrimaryWindow)).toHaveLength(1);
  });
  describe('when workspaceType is mosaic', () => {
    it('calls the context mosaicWindowActions connectDragSource method to make WindowTopBar draggable', () => {
      const connectDragSource = jest.fn(component => component);
      wrapper = createWrapper({ window, workspaceType: 'mosaic' }, { mosaicWindowActions: { connectDragSource } });
      expect(wrapper.find(WindowTopBar)).toHaveLength(1);
      expect(connectDragSource).toHaveBeenCalled();
    });
  });
});
