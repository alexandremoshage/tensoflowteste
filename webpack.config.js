const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',  // Ponto de entrada correto
  output: {
    path: path.resolve(__dirname, 'dist'),  // Diretório de saída
    filename: 'main.js',  // Nome do arquivo JS gerado
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'),  // Certifique-se de que o diretório está correto
    open: true,  // Abre o navegador automaticamente
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // O arquivo HTML de entrada
    }),
  ],
};
