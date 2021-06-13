// Express
const express = require('express');
const app = express();
const path = require('path');
const e = require('express');

// Socket
const server = require('http').Server(app);
const socket = require("socket.io");
const io = socket(server);

// XML / JS Parser 
let convert = require('xml-js');
let parseString = require('xml2js').parseString;
xmlparser = require('express-xml-bodyparser');

// General 

app.use('/static', express.static(path.join(__dirname, '/static')));




// Global state
const state = {
    btn1_status: false,
    btn1_text: "",
    btn2_status: false,
    btn2_text: "",
    btn3_status: false,
    btn3_text: "",
    notify_time_1_status: false,
    notify_time_2_status: false,
    notify_time_3_status: false,
    notify_time: 0,
    notify_interval_time: 0,
    notify_interval_status: false,
}

// Nowplaying state
const nowplaying = {
    artist: "artist",
    title: "title",
    changed: false,

}


//Make connection with clients

io.on("connection", (socket) => {
    console.log(`New connection with id: ${socket.id}, and IP ${socket.handshake.address}`);
    socket.emit("state", state);
    io.sockets.emit("nowplaying", nowplaying);



    // Button 01 & Graphic 01 
    socket.on("btn1_clicked", (btn1_text_input) => {
        if (state.btn1_status) {
            state.btn1_status = false;
            state.btn1_text = "";
        } else {
            if ((btn1_text_input == 0) || (state.btn2_status) || (state.btn3_status) || (state.notify_interval_status)) {
                socket.emit('return_error');
            } else {
                state.btn1_status = true;
                state.btn1_text = btn1_text_input;
            }
        }
        io.sockets.emit('btn1_status_return', state)
    });



    // Button 02 & Graphic 02
    socket.on("btn2_clicked", (btn2_text_input) => {
        if (state.btn2_status) {
            state.btn2_status = false;
            state.btn2_text = "";
        } else {
            if ((btn2_text_input == 0) || (state.btn1_status) || (state.btn3_status) || (state.notify_interval_status)) {
                socket.emit('return_error');
            } else {
                state.btn2_status = true;
                state.btn2_text = btn2_text_input;
            }
        }
        io.sockets.emit('btn2_status_return', state)
    });


    // Button 03 & Graphic 03
    socket.on("btn3_clicked", (btn3_text_input) => {
        if (state.btn3_status) {} else {
            if ((btn3_text_input == 0) || (state.btn1_status) || (state.btn2_status) || (state.notify_interval_status)) {
                socket.emit('return_error');
            } else {
                state.btn3_status = true;
                state.btn3_text = btn3_text_input;
            }
            io.sockets.emit('btn3_status_return', state);
        }
    });


    // Receive emit from notify time settings
    socket.on("notify_time_01_true", (data) => {
        state.notify_time_1_status = true;
        state.notify_time_2_status = false;
        state.notify_time_3_status = false;
        state.notify_time = 5000;
        io.sockets.emit('notify_time_status_return', state);
    });

    socket.on("notify_time_02_true", () => {
        state.notify_time_1_status = false;
        state.notify_time_2_status = true;
        state.notify_time_3_status = false;
        state.notify_time = 10000;
        io.sockets.emit('notify_time_status_return', state);
    });

    socket.on("notify_time_03_true", () => {
        state.notify_time_1_status = false;
        state.notify_time_2_status = false;
        state.notify_time_3_status = true;
        state.notify_time = 20000;
        io.sockets.emit('notify_time_status_return', state);
    });

    socket.on("btn3_transition_finished", () => {
        state.btn3_status = false;
        io.sockets.emit('btn3_transition_finished');
    });

    socket.on("reset_all", () => {
        state.btn3_status = false;
        io.sockets.emit('btn3_transition_finished');
    });

    socket.on("btn_notify_interval_value_save_check_status", (notify_interval_value, notify_txt) => {

        if ((notify_txt == 0) || (state.btn1_status) || (state.btn2_status) || (state.btn3_status)) {
            socket.emit('return_error');
        } else {
            if (state.notify_interval_status) {
                state.notify_interval_status = false;
                state.notify_interval_time = "";
                state.btn3_status = false;
            } else {
                if (notify_interval_value < 4999) {
                    socket.emit('btn_notify_interval_value_too_low');
                } else {
                    state.notify_interval_status = true;
                    state.notify_interval_time = notify_interval_value;
                    state.btn3_text = notify_txt;
                }
            };
            io.sockets.emit('btn_notify_interval_value_save_check_return', state);
        }
    });
});


// Send to dashboard
app.get('/dashboard', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/html/dashboard.html'));
});

// Send to Index
app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/html/visualradio.html'));
});


// App setup
server.listen(5000, () => {
    console.log("Listening for requests on port 5000");
});