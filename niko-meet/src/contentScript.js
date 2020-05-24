import * as nicoJS from 'nicojs';
import {
  AppCSS,
  BtnCloseCSS,
  STOP_WORDS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from './constant';

// app control variables
let oldMessages   = STOP_WORDS; // initialize with STOP_WORDS to avoid dump texts
let nicoObj       = null;
let chatOpened    = false;

const createBodyElement = (type, id, CSS) => {
  const ele = document.createElement(type);
  ele.setAttribute('id', id);
  ele.style.cssText = CSS;
  document.body.appendChild(ele);
};

const deleteBodyElement = (id) => {
  const ele = document.getElementById(id);
  document.body.removeChild(ele);
};

const getMessagesOnChatLog = () => {
  const messages = [].slice.apply(document.querySelectorAll("div[data-message-text]"));
  return messages.map(function (element) {
    return element.innerText || element.textContent;
  });
};

const getMessagesOnNotificationPopup = () => {
  const messages = [].slice.apply(document.querySelectorAll("span[jsslot]"))
    .filter(function (element) {
      return element.innerText.length > 0;
    });
  return messages.reduce(function (acc, element) {
    acc.push(...element.innerText.split('\n'));
    return acc;
  }, []);
};

const getDisplayableMessages = () => {
  const texts = getMessagesOnChatLog();
  if (texts.length === 0) {
    texts.push(...getMessagesOnNotificationPopup());
  }
  const newMessages = texts.filter(function (message) {
    return (oldMessages.indexOf(message) === -1);
  });
  oldMessages.push(...newMessages);
  return newMessages;
};

const randomColor = () => {
  const color = '#' + Math.floor(Math.random()*16777215).toString(16);
  return color === '#ffffff' || color === '#000000' ? '#00ff00' : color;
};

const onClickEndButton = () => {
  // remove itself
  deleteBodyElement('niko-end');
  // remove screen play
  deleteBodyElement('app');
  // remove old nicoObj
  nicoObj = null;
};

const createEndButton = () => {
  createBodyElement('button', 'niko-end', BtnCloseCSS);
  document.getElementById('niko-end').onclick = onClickEndButton;
};

const addChatButtonClickedHandler = () => {
  const buttons = [].slice.apply(document.querySelectorAll("div[role='button']"));
  buttons[7].onclick = () => {
    if (nicoObj !== null) {
      const app = document.getElementById('app');
      app.style.width = `${SCREEN_WIDTH - 320}px`;
      chatOpened = true;
    }
  };
};

const onNikoStart = () => {
  // create screen play
  createBodyElement('div', 'app', AppCSS);
  createEndButton();
  addChatButtonClickedHandler();

  // create niko
  if (nicoObj === null) {
    nicoObj = new nicoJS({
      app: document.getElementById('app'),
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      font_size: 50
    });
  }

  nicoObj.listen();
};

document.addEventListener('DOMNodeInserted', function () {
  if (nicoObj !== null) {
    const messages = getDisplayableMessages();
    messages.map(function(message) {
      nicoObj.send(message, randomColor());
    });
  }
});

document.addEventListener('click', function (event) {
  if (chatOpened && nicoObj !== null && (SCREEN_WIDTH - event.clientX) > 320) {
    const app = document.getElementById('app');
    app.style.width = `${SCREEN_WIDTH}px`;
    chatOpened = false;
  }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.niko === "start" && nicoObj === null) {
      onNikoStart();
      sendResponse({text: "niko party started"});
    } else {
      sendResponse({text: "something went wrong!"});
    }
  }
);
