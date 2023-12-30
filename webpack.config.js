const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development'

  const copyPluginPatterns = [
    {
      from: path.resolve(__dirname, 'src', 'assets'),
      to: path.resolve(__dirname, 'dist', 'assets'),
    },
  ]

  if (isDev) {
    copyPluginPatterns.push(
      ...[
        {
          from: path.resolve(__dirname, 'src', 'docs'),
          to: path.resolve(__dirname, 'dist', 'docs'),
        },
      ],
    )
  }

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
          options: {
            sources: false,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'markgen.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
      new CopyPlugin({
        patterns: copyPluginPatterns,
      }),
    ],
  }
}
