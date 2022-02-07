const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

module.exports = {
    "entry": "index.js",
    /* ... */
    plugins: [
        new GoogleFontsPlugin({
            fonts: [
                { family: "Noto Sans JP", variants: [ "300", "700" ]},
                { family: "Yusei Magic"},
           /*ここにフォントを追加していく．もちろん上のRobotoとSourse sans proは消してよい*/
            ]
            /* ...options */
        })
    ]
}