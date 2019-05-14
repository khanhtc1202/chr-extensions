function renderText(src, statusText) {
    document.getElementById(src).textContent = statusText;
}

document.addEventListener('DOMContentLoaded', async () => {
    let text = "Power in your hand";
    renderText('greeting', text);
});