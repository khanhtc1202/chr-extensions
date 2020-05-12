
function getClickHandler(info, tab) {
  if (RegExp('https://meet.google.com/*').test(tab.url)) {
    chrome.tabs.sendMessage(tab.id, {niko: "start"}, function (response) {
      console.log('response:', response);
    })
  } else {
    alert('Niko Meets extension only works on Google Meets page!');
  }
}

chrome.contextMenus.create({
  'id': 'nikoMeets',
  'title' : 'Start Niko Niko Meets Party',
  'contexts': ['all'],
  'onclick': getClickHandler
});
