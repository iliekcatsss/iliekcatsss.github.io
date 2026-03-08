fetch('/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar').innerHTML = html;
        window.toggleMenu = function() {
            document.getElementById('nav-links').classList.toggle('open');
        }
});