var socket = io();
var form = document.querySelector('form');

var user = prompt('Wat is je naam?');

socket.on('updatelist', function (playlist) {
  document.querySelector('ul').innerHTML = playlist
    .map(song => `<li>${song.artist} - ${song.title} (${song.user || 'Anoniempje'})</li>`)
    .join('');
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  var artistInput = document.querySelector('input[name="artist"]');
  var titleInput = document.querySelector('input[name="title"]');

  var newSong = {
    user: user,
    artist: artistInput.value,
    title: titleInput.value,
  };

  socket.emit('newSong', newSong);

  artistInput.value = '';
  titleInput.value = '';

  return false;
});
