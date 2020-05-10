
let SCREEN_WIDTH  = window.screen.width;
let SCREEN_HEIGHT = window.screen.height;
let SPAM_MESSAGES = ['Nothing', 'wwwww', 'www', 'おおおおお'];

// app control variables
let oldMessages   = [];
let nicoObj       = null;
let intervalPtr   = null;

// CSS
let AppCSS = `position:absolute;background-color:rgba(0,0,0,0.3);width:${SCREEN_WIDTH}px;height:${SCREEN_HEIGHT}px;z-index:100`;
let StartBtnCSS = `position:absolute;z-index:100;right:0px;bottom:100px`;
let EndBtnCSS = `position:absolute;top:0px;z-index:101;width:20px;height:20px;display:block;border-radius:50%;border:1px solid white`;

function createBodyElement(type, id, text, CSS) {
  let ele = document.createElement(type);
  ele.setAttribute('id', id);
  ele.style.cssText = CSS;
  ele.textContent = text;
  document.body.appendChild(ele);
}

function deleteBodyElement(id) {
  let ele = document.getElementById(id);
  document.body.removeChild(ele);
}

// TODO: get all messages from chat box
function getAllMessages() {
  let links = [].slice.apply(document.getElementsByTagName('a'));
  return links.map(function (element) {
    return element.innerText || element.textContent;
  });
}

function sendMessages(sender, message) {
  let color = '#' + Math.floor(Math.random()*16777215).toString(16);
  sender.send(message, color);
}

function onClickEndButton() {
  // remove itself
  deleteBodyElement('niko-end');
  // remove screen play
  deleteBodyElement('app');
  // add start button back to screen
  createStartButton();
  // remove interval
  if (intervalPtr !== null) {
    clearInterval(intervalPtr);
    intervalPtr = null;
  }
  // remove old nicoObj
  nicoObj = null;
}

function createEndButton() {
  createBodyElement('button', 'niko-end', 'X', EndBtnCSS);
  document.getElementById('niko-end').onclick = onClickEndButton;
}

function onClickStartButton() {
  // remove itself
  deleteBodyElement('niko-start');

  // create play screen
  createBodyElement('div', 'app', '', AppCSS);
  createEndButton();

  // create niko
  if (nicoObj === null) {
    nicoObj = new nicoJS({
      app: document.getElementById('app'),
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      font_size: 50,
      color: '#00FF00'
    });
  }

  nicoObj.listen();

  intervalPtr = setInterval(function() {
    let messages = getAllMessages();
    messages.map(function(message) {
      if (oldMessages.indexOf(message) === -1) {
        oldMessages.push(message);
        sendMessages(nicoObj, message);
      }
      // spam on no messages :))
      sendMessages(nicoObj, SPAM_MESSAGES[Math.floor(Math.random() * SPAM_MESSAGES.length)]);
    });
  }, 1000);
}

function createStartButton() {
  createBodyElement('button', 'niko-start', 'Start Niko', StartBtnCSS);
  document.getElementById('niko-start').onclick = onClickStartButton;
}

createStartButton();
