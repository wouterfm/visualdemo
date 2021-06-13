const socket = io("ws://51.195.119.204:5000");


// Query DOM
const graphic_bar_01 = document.getElementById('graphic_bar_01');
const graphic_bar_01_content = document.getElementById('graphic_bar_01_content');
const graphic_bar_01_enabled = document.getElementsByClassName('graphic_bar_01_enabled');
const graphic_bar_01_icon_phoner = document.getElementById('iconphoner');
const graphic_bar_02 = document.getElementById('graphic_bar_02');
const graphic_bar_02_content = document.getElementById('graphic_bar_02_content');
const graphic_bar_02_enabled = document.getElementsByClassName('graphic_bar_02_enabled');
const graphic_bar_02_icon_dj = document.getElementById('icondj');
const graphic_bar_03 = document.getElementById('graphic_bar_03');
const graphic_bar_03_content = document.getElementById('graphic_bar_03_content');
const graphic_bar_03_enabled = document.getElementsByClassName('graphic_bar_03_enabled');
const graphic_bar_03_iconnotify = document.getElementById('iconnotify');
const track = document.getElementById('track');
const artist = document.getElementById('artist');


// Graphic 01
socket.on('btn1_status_return', (state) => {
    if (state.btn1_status) {
        graphic_bar_01_content.innerHTML = state.btn1_text;
        graphic_bar_01_content.style.opacity = "100";
        graphic_bar_01_content.style.transform = "translateY(0px)";
        graphic_bar_01_icon_phoner.style.transform = "scale(1, 1)";
        graphic_bar_01.classList.add("graphic_bar_01_enabled");

    } else {
        graphic_bar_01_content.style.opacity = "0";
        graphic_bar_01_content.style.transform = "translateY(65px)";
        graphic_bar_01_icon_phoner.style.transform = "scale(0, 0)";
        graphic_bar_01.classList.remove("graphic_bar_01_enabled");
    }
});


// Graphic 02
socket.on('btn2_status_return', (state) => {
    if (state.btn2_status) {
        graphic_bar_02_content.innerHTML = state.btn2_text;
        graphic_bar_02_content.style.opacity = "100";
        graphic_bar_02_content.style.transform = "translateY(0px)";
        graphic_bar_02_icon_dj.style.transform = "scale(1, 1)";
        graphic_bar_02.classList.add("graphic_bar_01_enabled");

    } else {
        graphic_bar_02_content.style.opacity = "0";
        graphic_bar_02_content.style.transform = "translateY(65px)";
        graphic_bar_02_icon_dj.style.transform = "scale(0, 0)";
        graphic_bar_02.classList.remove("graphic_bar_01_enabled");
    }
});

// Graphic 03
socket.on('btn3_status_return', (state) => {
    if (state.btn3_status) {
        graphic_bar_03_content.innerHTML = state.btn3_text;
        graphic_bar_03_content.style.opacity = "100";
        graphic_bar_03_content.style.transform = "translateY(0px)";
        graphic_bar_03_iconnotify.style.transform = "scale(1, 1)";
        graphic_bar_03.classList.add("graphic_bar_03_enabled");

        setTimeout(() => {
            graphic_bar_03_content.style.opacity = "0";
            graphic_bar_03_content.style.transform = "translateY(65px)";
            graphic_bar_03_iconnotify.style.transform = "scale(0, 0)";
            graphic_bar_03.classList.remove("graphic_bar_03_enabled");
            socket.emit("btn3_transition_finished");
        }, state.notify_time);
    }
});

// Graphic 03 - interval

socket.on("btn_notify_interval_value_save_check_return", (state) => {
    if (state.notify_interval_status) {
        interval1 = setInterval(() => {
            graphic_bar_03_content.innerHTML = state.btn3_text;
            graphic_bar_03_content.style.opacity = "100";
            graphic_bar_03_content.style.transform = "translateY(0px)";
            graphic_bar_03_iconnotify.style.transform = "scale(1, 1)";
            graphic_bar_03.classList.add("graphic_bar_03_enabled");

            setTimeout(() => {
                graphic_bar_03_content.style.opacity = "0";
                graphic_bar_03_content.style.transform = "translateY(65px)";
                graphic_bar_03_iconnotify.style.transform = "scale(0, 0)";
                graphic_bar_03.classList.remove("graphic_bar_03_enabled");
            }, state.notify_time);
        }, Number(state.notify_interval_time) + Number(state.notify_time));
    } else {
        graphic_bar_03_content.style.opacity = "0";
        graphic_bar_03_content.style.transform = "translateY(65px)";
        graphic_bar_03_iconnotify.style.transform = "scale(0, 0)";
        graphic_bar_03.classList.remove("graphic_bar_03_enabled");
        clearInterval(interval1)

    };
});



// Catch state on reload
socket.on('state', (state) => {

    if (state.btn1_status) {
        graphic_bar_01_content.innerHTML = state.btn1_text;
        graphic_bar_01_content.style.opacity = "100";
        graphic_bar_01_content.style.transform = "translateY(0px)";
        graphic_bar_01_icon_phoner.style.transform = "scale(1, 1)";
        graphic_bar_01.classList.add("graphic_bar_01_enabled");

    } else {
        graphic_bar_01_content.style.opacity = "0";
        graphic_bar_01_content.style.transform = "translateY(65px)";
        graphic_bar_01_icon_phoner.style.transform = "scale(0, 0)";
        graphic_bar_01.classList.remove("graphic_bar_01_enabled");
    }

    if (state.btn2_status) {
        graphic_bar_02_content.innerHTML = state.btn2_text;
        graphic_bar_02_content.style.opacity = "100";
        graphic_bar_02_content.style.transform = "translateY(0px)";
        graphic_bar_02_icon_dj.style.transform = "scale(1, 1)";
        graphic_bar_02.classList.add("graphic_bar_02_enabled");

    } else {
        graphic_bar_02_content.style.opacity = "0";
        graphic_bar_02_content.style.transform = "translateY(65px)";
        graphic_bar_02_icon_dj.style.transform = "scale(0, 0)";
        graphic_bar_02.classList.remove("graphic_bar_02_enabled");
    }

    if (state.btn3_status) {
        graphic_bar_03_content.innerHTML = state.btn3_text;
        graphic_bar_03_content.style.opacity = "100";
        graphic_bar_03_content.style.transform = "translateY(0px)";
        graphic_bar_03_iconnotify.style.transform = "scale(1, 1)";
        graphic_bar_03.classList.add("graphic_bar_03_enabled");

        setTimeout(() => {
            graphic_bar_03_content.style.opacity = "0";
            graphic_bar_03_content.style.transform = "translateY(65px)";
            graphic_bar_03_iconnotify.style.transform = "scale(0, 0)";
            graphic_bar_03.classList.remove("graphic_bar_03_enabled");
        }, state.notify_time);
    } else {
        graphic_bar_03_content.style.opacity = "0";
        graphic_bar_03_content.style.transform = "translateY(65px)";
        graphic_bar_03_iconnotify.style.transform = "scale(0, 0)";
        graphic_bar_03.classList.remove("graphic_bar_03_enabled");
    }
    if (state.notify_interval_status) {
        graphic_bar_03_content.innerHTML = "Interval Enabled...";
        graphic_bar_03_content.style.opacity = "100";
        graphic_bar_03_content.style.transform = "translateY(0px)";
        graphic_bar_03_iconnotify.style.transform = "scale(1, 1)";
        graphic_bar_03.classList.add("graphic_bar_03_enabled");

    } else {
        graphic_bar_03_content.style.opacity = "0";
        graphic_bar_03_content.style.transform = "translateY(65px)";
        graphic_bar_03_iconnotify.style.transform = "scale(0, 0)";
        graphic_bar_03.classList.remove("graphic_bar_03_enabled");

    };
});