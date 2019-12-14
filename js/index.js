function renderText(src, statusText) {
    document.getElementById(src).textContent = statusText;
}

document.addEventListener('DOMContentLoaded', async () => {
    let text = "What do want to say?";
    renderText('greeting', text);
    // click
    let api = "https://qsona.github.io/goodpoem-button";
    ['goodpoem', 'badpoem', 'normalpoem'].forEach(function(name) {
    document.getElementById(name).onclick = function() {
        const audio = new Audio();
        audio.src = `${api}/audio/${name}.mp3`;
        audio.play();
      };
    });
});
