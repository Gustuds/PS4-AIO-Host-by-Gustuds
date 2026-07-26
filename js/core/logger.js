window.Logger = (function () {

    const logs = [];

    function add(type, message) {

        const time = new Date().toLocaleTimeString();

        logs.push({
            time: time,
            type: type,
            message: message
        });

        console.log("[" + type + "]", message);

    }

    function info(message) {
        add("INFO", message);
    }

    function warn(message) {
        add("WARN", message);
    }

    function error(message) {
        add("ERROR", message);
    }

    function getLogs() {
        return logs;
    }

    return {

        info,

        warn,

        error,

        getLogs

    };

})();