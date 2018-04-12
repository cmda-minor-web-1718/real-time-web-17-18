(function() {
    const sendMessage = document.getElementById('send_message');
    const messageInput = document.getElementById('message_input');
    const chatWindow = document.getElementById('messages');
    const userWindow = document.getElementById('users');
    const roomsWindow = document.getElementById('rooms');
    
    const changeRoom = document.getElementById('change_room');
    const roomInput = document.getElementById('room_input');

    const tempUser = document.querySelector(".tempUser");
    const loginTempUser = document.querySelector(".loginTempUser");

    const currentRoom = document.querySelector("#current_room");
    

  
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

    socket.on('setup user client', function(data) {
        console.log('test')
        currentRoom.innerHTML = 'Current room ' + data.room
    })

    socket.on('user joined', function(data) {
        let mItem = document.createElement("li")
        let userJoined = document.createElement("p")
        userJoined.textContent = `${data.user} joined`   
        mItem.appendChild(userJoined)
        chatWindow.appendChild(mItem)
    })

    socket.on('update roomlist', function(data){
        roomsWindow.innerHTML = ''
        let roomsTitle = document.createElement("p")
        roomsTitle.textContent =  Object.keys(data.rooms).length + ' Rooms active'
        roomsWindow.appendChild(roomsTitle)
        for(room of Object.keys(data.rooms)){   
            let roomItem = document.createElement("li")
            let roomName = document.createElement("a")
            roomName.textContent = `${room}`   
            roomName.addEventListener('click', function(event) {
                socket.emit('change room', {
                    room : event.target.innerHTML
                })
            })
            roomItem.appendChild(roomName)
            roomsWindow.appendChild(roomItem)
        }
    })

    socket.on('update userlist', function(data){
        console.log(data.activeUsers)   
        userWindow.innerHTML = ''
        let usersTitle = document.createElement("p")
        usersTitle.textContent = data.activeUsers.length + ' Online users'
        userWindow.appendChild(usersTitle)
        for(user of data.activeUsers){
            let mItem = document.createElement("li")
            let userJoined = document.createElement("p")
            userJoined.textContent = `${user} `   
            mItem.appendChild(userJoined)
            userWindow.appendChild(mItem)
           
        }
       
    })

    socket.on('profane message', function(data){
        let mItem = document.createElement("li")
        let p = document.createElement("p")

        p.textContent = data.message + ' ' + data.cusswords
        mItem.appendChild(p)
        chatWindow.appendChild(mItem)
    })
    socket.on("new message", function(data) {
        console.log(data.message)
        let mItem = document.createElement("li")
        let p = document.createElement("p")
        let userDiv = document.createElement("div")
        userDiv.textContent = data.user + ' '
        console.log(String(data.user_color))
        userDiv.style.color = String(data.user_color)
        p.appendChild(userDiv)
        t = document.createTextNode(data.message);
        p.appendChild(t)
        mItem.appendChild(p)
        chatWindow.appendChild(mItem)

    })


})()