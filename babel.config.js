module.exports = function (api) {
   api.cache(true);
   return {
      presets: ['babel-preset-expo'],
      plugins: [
         [
            'module-resolver',
            {
               alias: {
                  '@screens': './src/screens',
                  '@components': './src/components',
                  '@models': './src/models',
                  '@typings': './src/typings',
                  '@routes': './src/routes',
                  '@constants': './src/constants',
                  '@utils': './src/utils',
               },
            },
         ],
      ],
   };
};
