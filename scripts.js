const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

window.addEventListener('load', function() {
    window.scrollTo(0, 0);
    const loadingScreen = document.querySelector('.loading-screen');
    const content = document.querySelector('.content');
    const body = document.body;

    body.classList.add('no-scroll');
    loadingScreen.style.display = 'none';
    content.style.display = 'flex';

    setTimeout(function() {
        body.classList.remove('no-scroll');
    }, 2000);
});

document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    document.body.classList.add('no-scroll');

    setTimeout(() => {
        document.body.classList.remove('no-scroll');
    }, 2000);

    const preventScroll = (event) => {
        event.preventDefault();
        window.scrollTo(0, 0);
    };

    window.addEventListener('scroll', preventScroll);

    setTimeout(() => {
        window.removeEventListener('scroll', preventScroll);
    }, 2000);
});

window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

function openMultiplePages() {
    const urls = [
        "https://trainingnotes.fit",
        "https://django.trainingnotes.fit/admin",
        "https://artifactory.trainingnotes.fit",            
        "https://grafana.trainingnotes.fit",
        "https://jenkins.trainingnotes.fit",
        "https://postgresqladmin.trainingnotes.fit",
        "https://sonarqube.trainingnotes.fit",
        "https://prometheus.trainingnotes.fit",
        "https://cypress.trainingnotes.fit"
    ];
    
    urls.forEach(url => {
        window.open(url, '_blank');
    });
}
