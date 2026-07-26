document.addEventListener("DOMContentLoaded", async () => {

    Logger.info("PS4 Host started.");

    const info = Firmware.getInfo();

    Logger.info(
    `Console: ${info.isPS4 ? "PS4" : "Not PS4"}`
);
    Logger.info(`Firmware: ${info.firmware || "Unknown"}`);

    await ExploitManager.load();

    UI.init();

});