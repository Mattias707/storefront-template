function loadLayoutComponents() {
    const headerPromise = fetch('/components/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load header');
            return response.text();
        })
        .then(html => {
            const header = document.createElement('header');
            header.innerHTML = html;
            document.body.insertBefore(header, document.body.firstChild);
        });

    const asidePromise = fetch('/components/aside.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load aside');
            return response.text();
        })
        .then(html => {
            const aside = document.createElement('aside');
            aside.innerHTML = html;

            const section = document.querySelector('main > section');
            if (section && section.parentNode) {
                section.parentNode.insertBefore(aside, section.nextSibling);
            }
        });

    Promise.all([headerPromise, asidePromise])
        .finally(() => {
            document.body.classList.remove('loading');
            const loader = document.getElementById('loader');
            if (loader) loader.remove();
        });
}

window.addEventListener('DOMContentLoaded', loadLayoutComponents);
