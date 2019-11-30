module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeModulesPath: ['../../node_modules', './node_modules'],
            builderOptions: {
                appId: "saektide.esix-hub.app",
                productName: "e6Hub",
                win: {
                    target: ["nsis"],
                    icon: "./e6h.ico"
                },
                nsis: {
                    installerLanguages: "en_US",
                    installerIcon: "./e6h_ins.ico",
                    uninstallerIcon: "./e6h_unins.ico",
                    oneClick: false,
                    runAfterFinish: false,
                    allowToChangeInstallationDirectory: true
                },
                publish: {
                    provider: "github",
                    owner: "e6Hub",
                    repo: "app"
                }
            }
        }
    }
}