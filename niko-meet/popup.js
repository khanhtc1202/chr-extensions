
function renderText(dest, text) {
  document.getElementById(dest).textContent = text;
}

function toggleNikoMeetStart() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {niko: "start"}, function(response) {
      console.log('response', response.text);
    });
  });
}

function toggleNikoMeetEnd() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {niko: "end"}, function(response) {
      console.log('response', response.text);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('start_niko').onclick = toggleNikoMeetStart;
  document.getElementById('end_niko').onclick = toggleNikoMeetEnd;

  renderText('title', 'Nico Nico Meet');
  renderText('description', 'Only works on Google Meet page :)');
  renderText('start_niko', 'START');
  renderText('end_niko', 'END');
});
