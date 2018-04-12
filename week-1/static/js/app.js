(function () {
  "use strict";

  const app = {
    socket: io(),
    init() {
      document.querySelector("main form").addEventListener("submit", function () {
        messages.make(this.querySelector("#name").value, this.querySelector("#msg").value);
      });
      document.querySelector("main form").addEventListener("submit", sockets.send);
      sockets.capture();

    }
  }

  const sockets = {
    send(e) {
      app.socket.emit('message', {
        name: this.querySelector("#name").value,
        message: this.querySelector("#msg").value
      })
      this.querySelector('#msg').value = "";
      e.preventDefault();
    },
    capture() {
      app.socket.on('message', function(msg){
        if (msg.name !== document.querySelector("#name").value) {
          console.log(msg.name, msg.message);
          messages.make(msg.name, msg.message);
        } else {

        }
      });
    }
  }

  const messages = {
    make(sender, message) {
      if (sender === document.querySelector("#name").value) {
        let msgCont = document.createElement("div")
        msgCont.classList.add("sender");

        let msg = document.createElement("span")
        msg.appendChild(document.createTextNode(message));
        msgCont.appendChild(msg)

        let senderCont = document.createElement("span")
        senderCont.appendChild(document.createTextNode(`Name: ${sender}`));
        let check = document.createElement("img");
        check.src = "style/check.svg";
        check.alt = "check";
        // check.data = id
        senderCont.appendChild(check)
        msgCont.appendChild(senderCont)

        document.querySelector(".chatWindow").appendChild(msgCont);
        //document.querySelector(".chatWindow").insertBefore(msgCont, document.querySelector(".input"));
      } else {
        let msgCont = document.createElement("div")
        msgCont.classList.add("reciever");

        let msg = document.createElement("span")
        msg.appendChild(document.createTextNode(message));
        msgCont.appendChild(msg)

        let senderCont = document.createElement("span")
        senderCont.appendChild(document.createTextNode(`Name: ${sender}`));

        msgCont.appendChild(senderCont)

        document.querySelector(".chatWindow").appendChild(msgCont);
      }
    }
  }

  app.init()
})();
