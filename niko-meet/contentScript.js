
var XPath = '//*[@id="ow3"]/div[1]/div/div[3]/div[3]/div[3]/div/div[2]/div/div[2]/span[2]/div/div[1]/child::text()';
var messages = [].slice.apply(document.getElementsByTagName('a'));

function showMessage(index) {
var elemId = `niko-meet-${index}`
var elem = document.createElement('div');
elem.setAttribute("id", elemId);
elem.style.cssText = 'position:absolute;font-size:1.5em;color:#00FF00;z-index:100;';
elem.appendChild(document.createTextNode(messages[index]));
document.body.appendChild(elem);
setTimeout(function() {
var ele = document.getElementById(elemId);
document.body.removeChild(ele);
}, 1000);
}

messages.map(function (message, index) {
showMessage(index);
});

chrome.extension.sendRequest(messages);

