function renderText(src, statusText) {
    document.getElementById(src).textContent = statusText;
}

document.addEventListener('DOMContentLoaded', async () => {
    let text = "What do want to say?";
    renderText('greeting', text);
});
