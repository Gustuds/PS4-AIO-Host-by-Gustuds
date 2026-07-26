window.Launcher = (function () {

    async function launch(method) {

        Logger.info("Launcher entered.");

        if (!method) {

            Logger.error("No compatible exploit found.");
            return;

        }

        Logger.info("Method ID: " + method.id);

        const loaderPath =
            "methods/" +
            method.id +
            "/" +
            method.loader;

        Logger.info("Loading: " + loaderPath);

        await ModuleLoader.load(loaderPath);

        Logger.info("Launcher script loaded.");

        const launcherName =
            method.name.replace(/\s/g, "") + "Launcher";

        Logger.info("Looking for " + launcherName);

        if (window[launcherName]) {

            Logger.info("Executing launcher...");

            await window[launcherName].launch();

            Logger.info("Launcher finished.");

        } else {

            Logger.error("Launcher not found.");

        }

    }

    return {
        launch
    };

})();