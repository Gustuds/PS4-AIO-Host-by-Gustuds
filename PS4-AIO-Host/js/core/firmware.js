window.Firmware = (function () {
// Development mode (used only on localhost)
const DEV_MODE = true;
const DEV_FIRMWARE = "11.00";
    const supported = [
        "7.00",
        "7.01",
        "7.02",
        "7.50",
        "8.00",
        "8.01",
        "8.03",
        "8.50",
        "8.52",
        "9.00",
        "9.03",
        "9.04",
        "9.50",
        "9.51",
        "9.60",
        "10.00",
        "10.01",
        "10.50",
        "10.70",
        "10.71",
        "11.00",
        "11.02"
    ];

    function getUserAgent() {
        return navigator.userAgent;
    }

    function isPS4() {

    if (
        DEV_MODE &&
        (location.hostname === "localhost" ||
         location.hostname === "127.0.0.1")
    ) {

        return true;

    }

    return getUserAgent().indexOf("PlayStation 4") !== -1;

}

    function getFirmware() {

    // Development mode for PC
    if (
        DEV_MODE &&
        (location.hostname === "localhost" ||
         location.hostname === "127.0.0.1")
    ) {

        return DEV_FIRMWARE;

    }

    const ua = getUserAgent();

    const match = ua.match(
        /PlayStation\s*4[\/ ]+([0-9]+\.[0-9]+)/i
    );

    if (!match)
        return null;

    return match[1];

}

    function isSupported() {

        const fw = getFirmware();

        if (fw === null)
            return false;

        return supported.indexOf(fw) !== -1;

    }

    function getInfo() {

        return {

            isPS4: isPS4(),

            firmware: getFirmware(),

            supported: isSupported(),

            ua: getUserAgent()

        };

    }

    return {

        getInfo,

        isPS4,

        getFirmware,

        isSupported

    };

})();