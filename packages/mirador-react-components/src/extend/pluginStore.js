let pluginStore = [];

/**
 *
 * @param plugins
 */
export function storePlugins(plugins) {
  pluginStore = plugins || [];
}

/**
 *
 * @returns {Array}
 */
export function getPlugins() {
  return pluginStore;
}
