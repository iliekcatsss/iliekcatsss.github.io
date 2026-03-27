let input = document.getElementById('counter');
let res = document.getElementById('result');
res.innerHTML = length;

input.addEventListener("input", function() {
    let length = this.value.length;
    res.innerHTML = length;

    if (length === 1398072) res.innerHTML += "<br> como carajo llegaste aca brO"
});