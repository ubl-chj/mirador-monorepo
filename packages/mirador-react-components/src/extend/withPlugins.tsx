import React, { Component } from 'react';
import { connect } from 'react-redux';
import curry from 'lodash/curry';
import { pluginStore } from '.';

/** Connect plugin component to state */
function connectPluginComponent(plugin) {
  return connect(plugin.mapStateToProps, plugin.mapDispatchToProps)(plugin.component);
}

/** withPlugins should be the innermost HOC */
function _withPlugins(targetName, TargetComponent): any {
  class PluginHoc extends Component {
    public static displayName = `WithPlugins(${targetName})`;
    public render() {
      const plugin = pluginStore.getPlugins().find(p => p.target === targetName);

      if (plugin && plugin.mode === 'delete') {
        return null;
      }
      if (plugin && plugin.mode === 'replace') {
        const PluginComponent = connectPluginComponent(plugin);
        return <PluginComponent {...this.props} />;
      }
      if (plugin && plugin.mode === 'add') {
        const PluginComponent = connectPluginComponent(plugin);
        return <TargetComponent {...this.props} PluginComponent={PluginComponent} />;
      }
      if (plugin && plugin.mode === 'wrap') {
        const PluginComponent = connectPluginComponent(plugin);
        return <PluginComponent {...this.props} TargetComponent={TargetComponent} />;
      }
      return <TargetComponent {...this.props} />;
    }
  }
  return PluginHoc;
}



/** withPlugins('MyComponent')(MyComponent) */
export const withPlugins = curry(_withPlugins);
