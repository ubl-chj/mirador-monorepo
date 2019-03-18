import React from 'react';
import curry from 'lodash/curry';
import { connect } from 'react-redux';
import { pluginStore } from '.';

/** withPlugins should be the innermost HOC */
const _withPlugins = (targetName, TargetComponent) => { // eslint-disable-line no-underscore-dangle
  const PluginHoc = (props) => {
    const connectPluginComponent = (plugin) => {
      return connect(plugin.mapStateToProps, plugin.mapDispatchToProps)(plugin.component);
    }
    const plugin = pluginStore.getPlugins().find(p => p.target === targetName);

    if (plugin && plugin.mode === 'delete') {
      return null;
    }
    if (plugin && plugin.mode === 'replace') {
      const PluginComponent = connectPluginComponent(plugin);
      return <PluginComponent {...props} />;
    }
    if (plugin && plugin.mode === 'add') {
      const PluginComponent = connectPluginComponent(plugin);
      return <TargetComponent {...props} PluginComponent={PluginComponent} />;
    }
    if (plugin && plugin.mode === 'wrap') {
      const PluginComponent = connectPluginComponent(plugin);
      return <PluginComponent {...props} TargetComponent={TargetComponent} />;
    }
    return <TargetComponent {...props} />;
  }

  PluginHoc.displayName = `WithPlugins(${targetName})`;
  return PluginHoc;
}

/** withPlugins('MyComponent')(MyComponent) */
export const withPlugins = curry(_withPlugins);
