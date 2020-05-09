
function renderText(dest, text) {
  document.getElementById(dest).textContent = text;
}

document.addEventListener('DOMContentLoaded', function () {
  renderText('title', 'Nico Nico Meet');
  renderText('description', 'Only works on Google Meet page :)');
});
