
function getClickHandler() {
  chrome.tabs.query({active: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {niko: "start"}, function (response) {
      console.log('response:', response);
    })
  })
}

chrome.contextMenus.create({
  "title" : "Start Niko Niko Meets Party",
  "type" : "normal",
  "onclick" : getClickHandler
});