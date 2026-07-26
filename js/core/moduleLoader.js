window.ModuleLoader = (function () {

    async function load(scriptPath) {

        return new Promise((resolve, reject) => {

            const script = document.createElement("script");

            script.async = false;
            script.defer = true;
            script.src = scriptPath;

            script.onload = () => {

                Logger.info("Loaded module: " + scriptPath);

                resolve();

            };

            script.onerror = () => {

                Logger.error("Failed to load: " + scriptPath);

                reject();

            };

            document.head.appendChild(script);

        });

    }

    return {

        load

    };

})();