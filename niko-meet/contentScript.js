
var oldMessages = [];
var SCREEN_WIDTH  = window.screen.width;
var SCREEN_HEIGHT = window.screen.height;

// Get all links on current page
// TODO: get all messages from chat box
function getAllMessages() {
  var links = [].slice.apply(document.getElementsByTagName('a'));
  var messages = links.map(function(element) {
    return element.innerText || element.textContent;
  });
  return messages;
}

function createScreen() {
  var app = document.createElement('div');
  app.setAttribute("id", "app");
  app.style.cssText = `position:absolute;background-color:rgba(0,0,0,0.3);z-index:100;width:${SCREEN_WIDTH};height:${SCREEN_HEIGHT}`;
  document.body.appendChild(app);
}

function clearScreen() {
  var app = document.getElementById('app');
  document.body.removeChild(app);
}

function onNikoStart() {
  createScreen();
  var nico = new nicoJS({
    app       : document.getElementById('app'),
    width     : SCREEN_WIDTH,
    height    : SCREEN_HEIGHT,
    font_size : 50,
    color     : '#00FF00'
  });
  
  nico.listen();
  
  setInterval(function() {
    var messages = getAllMessages();
    messages.map(function(message) {
      if (oldMessages.indexOf(message) === -1) {
        oldMessages.push(message);
        var color = '#' + Math.floor(Math.random()*16777215).toString(16);
        nico.send(message, color);
      }
    });
  }, 1000);
}

function onNikoStop() {
  clearScreen();
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.niko === "start") {
      onNikoStart();
      sendResponse({text: "niko started"});
    } else if (request.niko === "end") {
      onNikoStop();
      sendResponse({text: "niko ended"});
    } else {
      sendResponse({text: "something when wrong"});
    }
  }
);



