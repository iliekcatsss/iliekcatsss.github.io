fetch('https://api.github.com/repos/iliekcatsss/iliekcatsss.github.io/commits/main')
.then(r => r.json())
.then(data => {
        const fecha = new Date(data.commit.author.date);

        document.getElementById("commit-date").textContent =
            fecha.toLocaleDateString("ex-MX", { year:"numeric", month:"long", day:"numeric" });

        document.getElementById("commit-sha").textContent = data.sha.slice(0,7);
        document.getElementById("commit-msg").textContent = data.commit.message;
        document.getElementById("commit-link").href = data.html_url;
    });