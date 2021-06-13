// SocketHost
const socket = io("ws://51.195.119.204:5000");

// Query DOM
const btn1_show = document.getElementById('btn1');
const btn1_insert = document.getElementById('btn1_insert');
const btn2_show = document.getElementById('btn2');
const btn2_insert = document.getElementById('btn2_insert');
const btn3_show = document.getElementById('btn3');
const btn3_insert = document.getElementById('btn3_insert');
const notify_time_1 = document.getElementById('notify_time_1');
const notify_time_2 = document.getElementById('notify_time_2');
const notify_time_3 = document.getElementById('notify_time_3');
const notify_time_settings_save = document.getElementById('notify_time_settings_save');
const reset_states_txt = document.getElementById('reset_states_txt');
const notify_interval_value = document.getElementById('notify_interval_value');
const btn_notify_interval_value_save = document.getElementById('btn_notify_interval_value_save');
const btn_notify_interval_enabled = document.getElementById('btn_notify_interval_enabled');


// Button 01
notify_time_settings_save.addEventListener('click', () => socket.emit('testjuh'));
btn1_show.addEventListener('click', () => socket.emit('btn1_clicked', btn1_insert.value));


socket.on("btn1_status_return", (state) => {
    if (state.btn1_status) {
        btn1_insert.value = state.btn1_text;
        btn1_show.innerHTML = 'Hide';
        btn1_show.classList.add('hidden');
    } else {
        btn1_show.innerHTML = 'Show';
        btn1_show.classList.remove('hidden');
    }
});


// Button 02
btn2_show.addEventListener('click', () => socket.emit('btn2_clicked', btn2_insert.value));

socket.on("btn2_status_return", (state) => {
    if (state.btn2_status) {
        btn2_insert.value = state.btn2_text;
        btn2_show.innerHTML = 'Hide';
        btn2_show.classList.add('hidden');
    } else {
        btn2_show.innerHTML = 'Show';
        btn2_show.classList.remove('hidden');
    }
});



// Button 03
btn3_show.addEventListener('click', () => socket.emit('btn3_clicked', btn3_insert.value));

socket.on("btn3_status_return", (state) => {
    if (state.btn3_status) {
        btn3_insert.value = state.btn3_text;
        btn3_show.innerHTML = 'Pending...';
        btn3_show.classList.add('pending');
    } else {
        if (state.notify_interval_status) {
            btn3_insert.value = state.btn3_text;
            btn3_show.innerHTML = 'Pending...';
            btn3_show.classList.add('pending');
        } else {
            btn3_insert.value = "";
            btn3_show.innerHTML = 'Show';
            btn3_show.classList.remove('pending');
        }
    }
});



// Error 
socket.on("return_error", () => {
    alert("Oops! Text is empty, or other element is already active...");
});


// Catch state on reload
socket.on('state', (state) => {
    if (state.btn1_status) {
        btn1_insert.value = state.btn1_text;
        btn1_show.innerHTML = 'Hide';
        btn1_show.classList.add('hidden');
    } else {
        btn1_insert.value = "";
        btn1_show.innerHTML = 'Show';
        btn1_show.classList.remove('hidden');
    }

    if (state.btn2_status) {
        btn2_insert.value = state.btn2_text;
        btn2_show.innerHTML = 'Hide';
        btn2_show.classList.add('hidden');
    } else {
        btn2_insert.value = "";
        btn2_show.innerHTML = 'Show';
        btn2_show.classList.remove('hidden');
    }

    if (state.btn3_status) {
        btn3_insert.value = state.btn3_text;
        btn3_show.innerHTML = 'Pending...';
        btn3_show.classList.add('pending');
    } else {
        if (state.notify_interval_status) {
            btn3_insert.value = state.btn3_text;
            btn3_show.innerHTML = 'Pending...';
            btn3_show.classList.add('pending');
        } else {
            btn3_insert.value = "";
            btn3_show.innerHTML = 'Show';
            btn3_show.classList.remove('pending');
        }
    }
    notify_time_1.checked = state.notify_time_1_status;
    notify_time_2.checked = state.notify_time_2_status;
    notify_time_3.checked = state.notify_time_3_status;

    if (state.notify_interval_status) {
        btn_notify_interval_value_save.innerHTML = 'Stop interval';
        btn_notify_interval_value_save.classList.add('hidden');
        notify_interval_value.style.display = "none";
        btn_notify_interval_enabled.style.display = "block";
        btn3_insert.value = state.btn3_text;
        notify_interval_value.value = state.notify_interval_time;
        btn_notify_interval_enabled.innerHTML = "Interval is on " + state.notify_interval_time + "ms";
    } else {
        btn_notify_interval_value_save.innerHTML = 'Set interval';
        btn_notify_interval_value_save.classList.remove('hidden');
        notify_interval_value.style.display = "block";
        btn_notify_interval_enabled.style.display = "none";
        notify_interval_value.input = state.notify_interval_time;
    }
});




// Notify Time Settings 
notify_time_settings_save.addEventListener('click', () => {
    if (notify_time_1.checked) {
        socket.emit('notify_time_01_true');
    }
    if (notify_time_2.checked) {
        socket.emit('notify_time_02_true');
    }
    if (notify_time_3.checked) {
        socket.emit('notify_time_03_true');
    }

});

socket.on("notify_time_status_return", (state) => {
    notify_time_1.checked = state.notify_time_1_status;
    notify_time_2.checked = state.notify_time_2_status;
    notify_time_3.checked = state.notify_time_3_status;
});

socket.on("btn3_transition_finished", () => {
    btn3_show.innerHTML = "Show"
    btn3_show.classList.remove('pending');
});

reset_states_txt.addEventListener('click', () => {
    if (confirm('Are you sure? This operation will clear everything.')) {
        socket.emit('reset_all');
    } else {}
});


btn_notify_interval_value_save.addEventListener('click', () => {
    if (confirm('Are you sure? This operation will make changes to the interval.')) {
        socket.emit('btn_notify_interval_value_save_check_status', notify_interval_value.value, btn3_insert.value);
    } else {}
});

socket.on("btn_notify_interval_value_too_low", () => {
    alert("Input value too low. Minimum is 5 seconds (5000ms).")
});

socket.on("btn_notify_interval_value_save_check_return", (state) => {
    if (state.notify_interval_status) {
        btn_notify_interval_value_save.innerHTML = 'Stop interval';
        btn_notify_interval_value_save.classList.add('hidden');
        notify_interval_value.style.display = "none";
        btn_notify_interval_enabled.style.display = "block";
        btn_notify_interval_enabled.innerHTML = "Interval is on " + state.notify_interval_time + "ms";
        btn3_insert.value = state.btn3_text;
        btn3_show.innerHTML = 'Pending...';
        btn3_show.classList.add('pending');


    } else {
        btn_notify_interval_value_save.innerHTML = 'Set interval';
        btn_notify_interval_value_save.classList.remove('hidden');
        notify_interval_value.style.display = "block";
        btn_notify_interval_enabled.style.display = "none";
        notify_interval_value.input = state.notify_interval_time;
        btn3_insert.value = "";
        btn3_show.innerHTML = 'Show';
        btn3_show.classList.remove('pending');

    }

});