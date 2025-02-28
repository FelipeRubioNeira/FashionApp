module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-transform-typescript-metadata',
      ["inline-import", { "extensions": [".sql"] }],
      ['babel-plugin-module-resolver', {
        "root": [
          "./app"
        ],
        "alias": {
          "@": "./app"
        }
      }]

    ] // <-- add this
  };
};
