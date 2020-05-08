
var oldMessages = [];
var SCREEN_WIDTH  = window.screen.width;
var SCREEN_HEIGHT = window.screen.height;

var app = document.createElement('div');
app.setAttribute("id", "app");
app.style.cssText = `position:absolute;opacity:0.3;z-index:100;width:${SCREEN_WIDTH};height:${SCREEN_HEIGHT}`;
document.body.appendChild(app);

var nico = new nicoJS({
  app       : document.getElementById('app'),
  width     : SCREEN_WIDTH,
  height    : SCREEN_HEIGHT,
  font_size : 50,
  color     : '#00FF00'
});

nico.listen();
// nico.loop(['Hello World.']);

// Get all links on current page
// TODO: get all messages from chat box
function getAllMessages() {
  var links = [].slice.apply(document.getElementsByTagName('a'));
  var messages = links.map(function(element) {
    return element.innerText || element.textContent;
  });
  return messages;
}

setInterval(function() {
  var messages = getAllMessages();
  messages.map(function(message) {
    if (oldMessages.indexOf(message) === -1) {
      oldMessages.push(message);
      nico.send(message);
    }
  });
}, 2000);



