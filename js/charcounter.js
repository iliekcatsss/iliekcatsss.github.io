const input = document.getElementById('counter');
const rLetters = document.getElementById('r-letters')
const rNumbers = document.getElementById('r-numbers')
const rSymbols = document.getElementById('r-symbols')
const rSpaces = document.getElementById('r-spaces')

const reLetters = /[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/g;
const reNumbers = /[0-9]/g;
const reSpaces = / /g;
const reSymbols = /[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9 ]/g;

function count(str, re) {
    const m = str.match(re);
    return m ? m.length : 0;
}

input.addEventListener('input', function() {
    const v = this.value;
    rLetters.textContent = count(v, reLetters)
    rNumbers.textContent = count(v, reNumbers)
    rSymbols.textContent = count(v, reSymbols)
    rSpaces.textContent = count(v, reSpaces)
});