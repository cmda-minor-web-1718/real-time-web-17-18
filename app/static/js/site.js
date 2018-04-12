(function() {
    const sendMessage = document.getElementById('send_message');
    const messageInput = document.getElementById('message_input');
    const chatWindow = document.getElementById('messages');

    const changeRoom = document.getElementById('change_room');
    const roomInput = document.getElementById('room_input');

    const tempUser = document.querySelector(".tempUser");
    const loginTempUser = document.querySelector(".loginTempUser");

    var socket = io();
 
    loginTempUser.addEventListener("click", function(e) {
        socket.emit('login temp user', {
            username : tempUser.value
        })
        document.querySelector("#tempaccount").style.display = 'none'
        e.preventDefault()
    })

    sendMessage.addEventListener("click", (function() {
        console.log(messageInput.value)
        socket.emit('new message', {
            message : messageInput.value
        })
    }))


    changeRoom.addEventListener("click", function() {
        console.log('test')
        socket.emit('change room', {
            room : roomInput.value
        })
    })

    socket.on('user left', function(data) {
        let mItem = document.createElement("li")
        let userJoined = document.createElement("p")
        userJoined.textContent = `${data.user} left!`   
        mItem.appendChild(userJoined)
        chatWindow.appendChild(mItem)
    })

    socket.on('user joined', function(data) {
        let mItem = document.createElement("li")
        let userJoined = document.createElement("p")
        userJoined.textContent = `${data.user} joined`   
        mItem.appendChild(userJoined)
        chatWindow.appendChild(mItem)

    })

    socket.on("new message", function(data) {
        console.log(data.message)
        let mItem = document.createElement("li")
        let p = document.createElement("p")

        p.textContent = data.user + ': ' + data.message
        mItem.appendChild(p)
        chatWindow.appendChild(mItem)

    })


})()