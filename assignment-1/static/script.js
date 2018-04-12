var socket = io();
var form = document.querySelector('form');

socket.on('updatelist', function (playlist) {
  document.querySelector('ul').innerHTML = playlist
    .map(song => `<li>${song.artist} - ${song.title}</li>`)
    .join('');
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  var artistInput = document.querySelector('input[name="artist"]');
  var titleInput = document.querySelector('input[name="title"]');

  var newSong = {
    artist: artistInput.value,
    title: titleInput.value,
  };

  socket.emit('newSong', newSong);

  return false;
});
