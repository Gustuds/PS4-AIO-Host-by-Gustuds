window.Host = (function () {

    async function loadScript(path) {

        return new Promise((resolve, reject) => {

            const script = document.createElement("script");

            script.src = path;

            script.onload = resolve;
            script.onerror = reject;

            document.head.appendChild(script);

        });

    }

    async function loadText(path) {

        const response = await fetch(path);

        return await response.text();

    }

    function execute(code) {

        (0, eval)(code);

    }

    return {

        loadScript,
        loadText,
        execute

    };

})();