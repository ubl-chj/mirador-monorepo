import React from 'react';
import { getPlugins } from './pluginStore';

// withPlugins must be the innermost HOC to match the name of the target component

/**
 *
 * @param TargetComponent
 */
export const withPlugins = TargetComponent => class HOC extends React.Component {
  /**
   *
   * @returns {*}
   */
  render() {
    const plugin = getPlugins().find(p => p.target === TargetComponent.name);
    console.log(TargetComponent.name);
    if (!plugin) {
      return (<TargetComponent {...this.props} />);
    }
    if (plugin.modus === 'remove') {
      return null;
    }
    if (plugin.modus === 'replace') {
      return React.createElement(plugin.component, { ...this.props });
    }
    if (plugin.modus === 'add') {
      return (<TargetComponent {...this.props} PluginComponent={plugin.component} />);
    }
    return null;
  }
};
