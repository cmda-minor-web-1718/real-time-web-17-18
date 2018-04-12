# Real Time Web course repo


<details>
<summary>
This is the course repo for the 2018 edition of the course 'Real Time Web' which is part of the minor 'web' taught at the University of Applied Sciences Amsterdam.
</summary>
During this course, students will:
* Build a Node Web App which consumes an external data source through an API and serves a frontend using routing and templating techniques.
* Create a "live" web app which reflects changes to the back-end data model in reactive front-end views, using real-time, event-based, messaging technologies like sockets or server-sent-events.
* Describe their work in a professional readme with insightful diagrams showing the life cycle of their data.

## Week 1
[Slides](https://drive.google.com/open?id=1QxeKsSXnf9poJFWoEe_slHuMb7apB-2eNyUTzi18kcQ)

[Assignments](https://drive.google.com/open?id=1OUspHz0enLpoVjbyHMHpAQCjSEmkn8rfHbkoSuwjw4M) (in Dutch)

## Week 2
[Slides](https://drive.google.com/open?id=1-tI7rFjHchbph6FEqpNvDi7XCh3Uy-3bohi_jBdZhcQ)

[Assignments](https://drive.google.com/open?id=1rjE1bG-rrgfEOssMxCYr7Q0Ba5BJs9WKkvVvjI7y2fQ) (in Dutch)

## Week 3
[Slides](https://drive.google.com/open?id=1BHoe8Fif7nLA00V4WEANJANnObxHBnVnwnQHnfXl4aM)

[Assignments](https://drive.google.com/open?id=1zoRC5kDeSQad8vdi62u6AEj_SfpvPzKE7wjYTsdO2JI) (in Dutch)

## Grading
In the first and second week you will receive oral feedback on your assignments. In week three you will have a chance to present your final assignment during an oral exam. This assessment will make up 100% of your grade for this course.

> If you're seeing this message on a forked repo, it means one of our students hasn't changed the description yet 😈
</details>

## Startup

The needs
* Node-js and these dependencies:
  * [Express](https://www.npmjs.com/package/express)
  * [Sockets](https://www.npmjs.com/package/socket.io)
  * http

Install these packages and setup a simple server.js
```javascript
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

and make a simple index.html whit this snippet before the closing tag of the body
```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
```

Run the server start the browser and navigate to localhost:3000
```bash
$ node server.js
```

And look if the the node.js console outputs shows, "A user connected" and/or "a user disconnected"

If this works continue to the next step

## The next step

Edit your index.html
```html
<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
    <script src="/socket.io/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
    <script>
      $(function () {
        var socket = io();
        $('form').submit(function(){
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });
        socket.on('chat message', function(msg){
          $('#messages').append($('<li>').text(msg));
        });
      });
    </script>
  </body>
</html>
```

and the server.js change the socket.io snippet
```javascript
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
```

## Profit and work further
.....
