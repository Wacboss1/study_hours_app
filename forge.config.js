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
        {
            name: "@electron-forge/maker-zip",
            platforms: [
                "darwin"
            ]
        },
        {
            name: "@electron-forge/maker-deb",
            config: {}
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {}
        }
    ],
    hooks:{
        prePackage: async (forgeConfig, platform, arch) => {
            child_process.execSync("pyinstaller src/Backend/backend.spec " +
                "--distpath src/Backend/dist --workpath src/Backend/build")
            child_process.execSync("npm run build")
        }
    }
}