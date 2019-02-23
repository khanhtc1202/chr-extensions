function renderResult(src, statusText) {
    document.getElementById(src).textContent = statusText;
}

async function getVietnamAirline() {
    let url = 'https://www.vietnamairlines.com/sites/5daypromotion#5ngayvang';
    let result = await fetch(url);
    let htmlResult = await result.text();
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(htmlResult, 'text/html');
    return htmlDoc.getElementById('fivedays_table').innerText;
}

document.addEventListener('DOMContentLoaded', async () => {
    let text = await getVietnamAirline();
    renderResult('vn-airline', text);
});