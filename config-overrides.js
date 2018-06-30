const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

/* config-overrides.js */
module.exports = function override (config, env) {
  config = rewireReactHotLoader(config, env);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#00c69b" },
  })(config, env);
  return config
}