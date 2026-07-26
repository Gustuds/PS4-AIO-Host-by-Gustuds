console.log("UI.JS LOADED");
window.UI = {

    init: function () {

        const info = Firmware.getInfo();

        const logs = Logger.getLogs();

let logHtml = "";

logs.forEach(function(log){

    logHtml += `
        <p>[${log.time}] ${log.type}: ${log.message}</p>
    `;

});

        const app = document.getElementById("app");

        app.innerHTML = `
            <div class="dashboard">

                <h1>PS4 AIO HOST</h1>

                <br>

                <p><b>Console:</b> ${info.isPS4 ? "PS4" : "Not PS4"}</p>

                <p><b>Firmware:</b> ${info.firmware || "Unknown"}</p>

                <hr>

<h3>System Log</h3>

${logHtml}

                <p><b>Supported:</b> ${info.supported ? "YES" : "NO"}</p>
                <br>

<button id="start-jb">
    Start Jailbreak
</button>

<button id="settings-btn">
    Settings
</button>

<button id="logs-btn">
    Logs
</button>

            </div>
        `;
        const startBtn = document.getElementById("start-jb");

if (startBtn) {

    startBtn.onclick = async function () {

    Logger.info("Start button pressed.");

    try {

        const method = ExploitManager.getRecommended(
    Firmware.getInfo().firmware
);

await Launcher.launch(method);

    } catch (e) {

        Logger.error(e.message);
        console.error(e);

    }

};

}

    }

};