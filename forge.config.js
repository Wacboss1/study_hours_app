const child_process = require("child_process");

module.exports = {
    packagerConfig: {
        extraResource: [
            "src/Backend/dist/backend"
        ]
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "electron_quick_start"
            }
        },
        // Only use on mac
        // {
        //     name: '@electron-forge/maker-dmg',
        //     config: {
        //       background: './assets/dmg-background.png',
        //       format: 'ULFO'
        //     }
        // },
        {
            name: "@electron-forge/maker-zip",
            platforms: [
                "darwin"
            ]
        }
    ],
    hooks:{
        generateAssets: async (forgeConfig, platform, arch) => {   
            child_process.execSync("pyinstaller src/Backend/backend.spec" +
                " --distpath src/Backend/dist -y --workpath src/Backend/build")
            child_process.execSync("npm run build")
        }
    }
}