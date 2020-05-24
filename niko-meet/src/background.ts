
const CONTEXT_MENU_ITEM_ID = 'nikoMeets';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ITEM_ID,
    title : 'Start Niko Niko Meets Party',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === CONTEXT_MENU_ITEM_ID) {
    if (RegExp('https://meet.google.com/*').test(tab.url)) {
      chrome.tabs.sendMessage(tab.id, {niko: "start"}, function (response) {
        console.log('response:', response);
      })
    } else {
      alert('Niko Meets extension only works on Google Meets page!');
    }
  }
});
