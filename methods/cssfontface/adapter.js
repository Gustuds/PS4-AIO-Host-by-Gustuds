window.CSSFontFaceAdapter = (function () {

    const BASE = "methods/cssfontface/files/public/";

    function fixPath(path) {

        if (
            path.startsWith("src/") ||
            path.startsWith("includes/")
        ) {
            return BASE + path;
        }

        return path;
    }

    async function launch() {

        console.log("Host =", Host);

        Logger.info("Loading CSSFontFace main.js...");

        let code = await Host.loadText(BASE + "src/main.js");

        Logger.info("Patching CSSFontFace...");

        //
        // заменяем ВСЕ пути
        //
        code = code.replaceAll(
            'load_script("',
            'load_script("' + BASE
        );

        //
        // и динамический exploitChain
        //
        code = code.replace(
            'load_script(`src/${exploitChain}.js`)',
            'load_script(`' + BASE + 'src/${exploitChain}.js`)'
        );

        //
        // вставляем отладку прямо внутрь doJb()
        //
        code = code.replace(
            'async function doJb() {',
            `
            async function doJb() {

                console.log("doJb entered");

                const oldLoad = load_script;

                load_script = async function(src, ...args){

                    console.log("LOAD:", src);

                    const r = await oldLoad(src, ...args);

                    console.log("DONE:", src);

                    return r;
                };
            `
        );

        //
        // выводим исключения
        //
        code = code.replace(
            "logger.error(e.stack);",
            `
            logger.error(e.stack);
            console.error(e);
            throw e;
            `
        );

        Host.execute(code);

        console.log("window.doJb =", window.doJb);
        console.log("typeof doJb =", typeof doJb);

        Logger.info("CSSFontFace patched.");

        if (typeof doJb !== "function") {

            Logger.error("doJb not found");

            return;
        }

        Logger.info("Starting CSSFontFace...");

        try {

            let consoleBox = document.getElementById("console");

if (!consoleBox) {
    consoleBox = document.createElement("pre");
    consoleBox.id = "console";

    Object.assign(consoleBox.style, {
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        background: "#000",
        color: "#00ff00",
        padding: "10px",
        margin: "0",
        overflow: "auto",
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
        fontSize: "18px",
        zIndex: "999999"
    });

    document.body.appendChild(consoleBox);
}

            await doJb();

            console.log("doJb finished");

        } catch (e) {

            console.error("doJb crashed", e);

        }
    }

    return {

        launch,
        fixPath

    };

})();
