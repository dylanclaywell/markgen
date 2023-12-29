const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development'

  const plugins = isDev
    ? [
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'src', 'docs'),
              to: path.resolve(__dirname, 'dist', 'docs'),
            },
            {
              from: path.resolve(__dirname, 'src', 'www'),
              to: path.resolve(__dirname, 'dist', 'www'),
            },
          ],
        }),
      ]
    : []

  return {
    entry: './src/main.ts',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'markgen.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins,
  }
}
