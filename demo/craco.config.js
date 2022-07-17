const CracoLessPlugin = require("craco-less");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// 配置文件说明文档：https://github.com/dilanx/craco/blob/master/packages/craco/README.md
module.exports = {
  webpack: {
    // alias: {},
    plugins: {
      /* Specify if plugin should be appended or prepended */
      /* An array of plugins */
      add: [
        new AntdDayjsWebpackPlugin(),
        // new BundleAnalyzerPlugin({ analyzerMode: "server" }),
      ],
      /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */
      // remove: [],
    },
    /* Any webpack configuration options: https://webpack.js.org/configuration */
    // configure: (webpackConfig, { env, paths }) => {
    //   return webpackConfig;
    // },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
