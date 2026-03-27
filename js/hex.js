const hex = "0123456789ABCDEF"
const res = document.getElementById('result');

function generate() {
    let color = ""

    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * hex.length)];
    }
    
    res.innerHTML = `#${color}`;
    res.style.color = `#${color}`
}