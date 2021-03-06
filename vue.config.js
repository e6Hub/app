module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      nodeModulesPath: ['../../node_modules', './node_modules'],
      builderOptions: {
        appId: 'saektide.esix-hub.app',
        productName: 'e6Hub',
        // Windows
        win: {
          target: 'nsis',
          icon: './e6hub.ico'
        },
        nsis: {
          installerLanguages: 'en_US',
          installerIcon: './e6hub_ins.ico',
          uninstallerIcon: './e6hub_unins.ico',
          oneClick: false,
          runAfterFinish: false,
          allowToChangeInstallationDirectory: true
        },
        // Linux
        linux: {
          target: 'AppImage',
          synopsis: 'An e621/e926 client',
          category: 'Network',
          icon: './build/icons'
        },
        appImage: {
          artifactName: "e6hub-Linux-${arch}.AppImage"
        },
        publish: {
          provider: 'github',
          owner: 'e6Hub',
          repo: 'app'
        }
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
}