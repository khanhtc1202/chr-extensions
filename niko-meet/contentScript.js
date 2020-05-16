
const SCREEN_WIDTH  = window.screen.width;
const SCREEN_HEIGHT = window.screen.height;
const CLOSE_BTN_IMAGE = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEcElEQVRoQ9WaSVMTQRTH/8DNg1cXkgBJ0G+gnvFj6MGtvGjJDtEAbmAFFxZLL5bbQT+GnNVvoCBUglTi1YM3wHpDOtX0vH7ds5XlHGd6Xvev39pLF/hnCMA7AHkA+wA2AVwE8MXSPqvXZwF8AFAE0AVgG8BlAGtmh/TRfN4AuGIZ2WMA01mN2pC7CGDK0tdbAFf1byYIaeGSY6BPhA7SYqQJm3QIe9/WTtBMB/GBULKz1IykCZOtA6NAXpuqoj8eDRbwZ3cX85s73ORkAcNCzBR7caSnB3fWG9w4yBWuEQg59iezxdLpPlzPHQter9SbmNkgPws9aZoZa07z5TxG+k4EHb/6+Qtj3+rcOM4TCH0p6F91CPV+ud7EbHYwLMTDch6jbQg1DgtMg0D2dF8hc7pVOM762VK9ibn0YViIB+U8xgwINajnjZZpZvsEsgugWzUie6wM9FoDhgDz1CPSmHLJNCfMlxIEta1t7Zh+u0cg6wDKujDdLjkiwcyiwLAQnDnpY7D46waBUPb8bA7YJVCAecbNsiGfgMdT7POcCr9s2HOpOCZMLAjBpIM0oCfEyE5HMxoRJm2ITvg3SxRWMwnMbEkzITK5sRTN6VBC5orGWDBC0iQYekIQCYJKqKrgQKhT7wTlEVHYUJ4Agq0mbCCZwqQNQYOVQDKByQLCB4TasInLNSDOZ+L807ZLZ6J1aUTZdyyYl9stVL4flN61UwXcyPM1HH0XgoUTwlcjCobNAa5ZpgW/qyMBwqdKcMrnok0sGDZstV+mAeGaKFv/qcGkBREXhP5js/Siww/0mSH/mW77jzFjejUgKfPQN19n5wSyML+HzqDbIXVvHzi69pWTGQsiiUasWvnfQGjmRs0prQ0WcNOyTDbbvmi0UOF3RZa5usxlY3FMi4VwhWFuIKv1Jqr8HkBkmKgg1MGIOShXmS/NpgCzwmndJisKCAvhWkWSY9MjBYDVRhPVdXbfzBvGFyQWhO4HLv9JCuMDwkLcL+Ux3n+wA+hr/wvlPIYte1UkIwmMC4R17HulHCb6T0aCUI0TwIgBQAKJB2G39w74wmAewwVBm40WqhFDsw2Ezdp3SzlMSprwgOhoxgHDbIuqX9nsz4GwReFcKYepeBBkEhS7QpsPLs0IMKHy3gThIYo5TA0IPmHXhG7XrKmmBaODsKvA2WIO0yJEJHu2wBQwLJQ2gmY6q0cFUuMOOWeKOVQECKEDKZGx4Vw6ziDnEPqifbiKdRPbdbwQE0I5bNowwSb2BoCSnhSqxV7cFs5IEkIkgrEkzR+hgx4KrxRmbU9KEIlgbAc93kdvAkTkslubKDYASD5jO3rzOgzNCEJPcqGFGgcjHYY6j6eFYi72GpsxXbaa0POM63iaZLL3TxwXBrw3z1zLVO07m5AdFwaCeyl6QoxyhSMLCMXDwlgmI3SFQ7XzgfHai42gBa4pW2UYDa2XalQ79l5K+2OQRRMO0vd3ttpo/xzcP9EF2cp48+LZFoAL/+ji2UcAA66LZ38BmwtYsn4k2KoAAAAASUVORK5CYII=')`;
const STOP_WORDS = [
  'Switch account',
  'Ready to join?',
  'Join now',
  'Present',
  'Other options',
  'Join and use a phone for audio',
  'To avoid echo, use the same device for your mic and speaker',
  'Settings',
  'You',
  'Meeting details',
  'closed_caption_off',
  'closed_caption_on',
  'keyboard_arrow_up',
  'keyboard_arrow_down',
  'Turn on captions',
  'Turn off captions',
  'Start streaming',
  'Phone connectedReconnectCalling'
];

// app control variables
let oldMessages   = STOP_WORDS; // initialize with STOP_WORDS to avoid dump texts
let nicoObj       = null;
let intervalPtr   = null;

// CSS
const AppCSS = `position:absolute;background-color:rgba(0,0,0,0.3);width:${SCREEN_WIDTH}px;height:${SCREEN_HEIGHT}px;z-index:100`;
const BtnCloseCSS = `position:absolute;top:10px;left:10px;z-index:101;width:50px;height:50px;background: ${CLOSE_BTN_IMAGE} no-repeat;cursor:pointer;border: none`;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createBodyElement(type, id, CSS) {
  const ele = document.createElement(type);
  ele.setAttribute('id', id);
  ele.style.cssText = CSS;
  document.body.appendChild(ele);
}

function deleteBodyElement(id) {
  const ele = document.getElementById(id);
  document.body.removeChild(ele);
}

function getMessagesOnChatLog() {
  let messages = [].slice.apply(document.querySelectorAll("div[data-message-text]"));
  return messages.map(function (element) {
    return element.innerText || element.textContent;
  });
}

function getMessagesOnNotificationPopup() {
  let messages = [].slice.apply(document.querySelectorAll("span[jsslot]"))
    .filter(function (element) {
      return element.innerText.length > 0;
    });
  return messages.reduce(function (acc, element) {
    acc.push(...element.innerText.split('\n'));
    return acc;
  }, []);
}

function getDisplayableMessages() {
  const texts = getMessagesOnChatLog();
  if (texts.length === 0) {
    texts.push(...getMessagesOnNotificationPopup());
  }
  const newMessages = texts.filter(function (message) {
    return (oldMessages.indexOf(message) === -1);
  });
  oldMessages.push(...newMessages);
  return newMessages;
}

function sendMessage(sender, message) {
  const color = '#' + Math.floor(Math.random()*16777215).toString(16);
  sender.send(message, color);
}

function sendMessageAfter(sender, message, timeInMs) {
  setTimeout(function () {
    sendMessage(sender, message);
  }, timeInMs);
}

function onClickEndButton() {
  // remove itself
  deleteBodyElement('niko-end');
  // remove screen play
  deleteBodyElement('app');
  // remove interval
  if (intervalPtr !== null) {
    clearInterval(intervalPtr);
    intervalPtr = null;
  }
  // remove old nicoObj
  nicoObj = null;
}

function createEndButton() {
  createBodyElement('button', 'niko-end', BtnCloseCSS);
  document.getElementById('niko-end').onclick = onClickEndButton;
}

function onNikoStart() {
  // create screen play
  createBodyElement('div', 'app', AppCSS);
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
    const messages = getDisplayableMessages();
    const sendingRangeTime = 20 * messages.length;
    messages.map(function(message) {
      sendMessageAfter(nicoObj, message, getRandomInt(sendingRangeTime));
    });
  }, 1000);
}

// TODO: addListener is deprecated, replace with something else :))
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
