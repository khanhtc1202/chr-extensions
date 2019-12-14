function renderText(src, statusText) {
    document.getElementById(src).textContent = statusText;
}

document.addEventListener('DOMContentLoaded', async () => {
    let text = "What do want to say?";
    renderText('greeting', text);
    // click
    ['goodpoem', 'badpoem', 'normalpoem'].forEach(function(name) {
    document.getElementById(name).onclick = function() {
        const audio = new Audio();
        audio.src = `audio/${name}.mp3`;
        audio.play();
      };
    });
});
