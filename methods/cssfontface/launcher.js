window.CSSFontFaceLauncher = (function () {

    async function launch(method = "lapse") {

        Logger.info("Launching CSSFontFace...");
        Logger.info("Method: " + method);

        window.exploitChain = method;

        await ModuleLoader.load("methods/cssfontface/adapter.js");

        await CSSFontFaceAdapter.launch();
    }

    return {

        launch

    };

})();