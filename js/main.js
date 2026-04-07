/*
* script global
* lo que se ponga aquí se aplicará a TODAS las páginas
*/

// navbar
fetch('/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar').innerHTML = html;
    });
    
function toggleMenu() {
    document.getElementById('nav-links').classList.toggle('open');
}

// collapsible
function toggleCollapsible(btn) {
    btn.nextElementSibling.classList.toggle('open');
    btn.classList.toggle('active');
}