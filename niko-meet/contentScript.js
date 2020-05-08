
var oldMessages = [];

// Get all links on current page
// TODO: get all messages from chat box
function getAllMessages() {
  var links = [].slice.apply(document.getElementsByTagName('a'));
  var messages = links.map(function(element) {
    return element.innerText || element.textContent;
  });
  return messages;
}

// Show message in 1 second
// TODO: change to nico nico text 
function showMessage(message) {
  var elemId = `niko-meet-${Math.random().toString(36).substring(7)}`;

  var elem = document.createElement('div');
  elem.setAttribute("id", elemId);
  elem.style.cssText = 'position:absolute;font-size:1.5em;color:#00FF00;z-index:100;';
  elem.appendChild(document.createTextNode(message));
  document.body.appendChild(elem);

  setTimeout(function() {
    var ele = document.getElementById(elemId);
    document.body.removeChild(ele);
  }, 1000);
}

setInterval(function() {
  var messages = getAllMessages();
  messages.map(function(message) {
    if (oldMessages.indexOf(message) === -1) {
      oldMessages.push(message);
      showMessage(message);
    }
  });
}, 2000);


