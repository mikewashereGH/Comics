const comicImage = document.getElementById('comic-image');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const darkModeCheckbox = document.getElementById('dark-mode');
const statusBar = document.getElementById('status-bar');

let currentIndex = 0;
const comics = [
    'https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg',
    'https://www.waterfieldtechnologies.com/wp-content/uploads/2019/02/placeholder-image-gray-3x2.png',
    'https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1',
    'https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png'
];

function showComic(index) {
    comicImage.src = comics[index];
    updateStatusBar(index);
    updateButtons(index);
}

function updateButtons(index) {
    prevButton.style.visibility = index === 0 ? 'hidden' : 'visible';
    nextButton.style.visibility = index === comics.length - 1 ? 'hidden' : 'visible';
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showComic(currentIndex);
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < comics.length - 1) {
        currentIndex++;
        showComic(currentIndex);
    }
});

let touchStartX = 0;
let touchEndX = 0;

comicImage.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
});

comicImage.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 100;
    const delta = touchEndX - touchStartX;

    if (delta > swipeThreshold && currentIndex > 0) {
        currentIndex--;
        showComic(currentIndex);
    } else if (delta < -swipeThreshold && currentIndex < comics.length - 1) {
        currentIndex++;
        showComic(currentIndex);
    }
}

darkModeCheckbox.addEventListener('change', () => {
    const darkModeEnabled = darkModeCheckbox.checked;
    document.body.classList.toggle('dark-mode', darkModeEnabled);
    localStorage.setItem('darkModeEnabled', darkModeEnabled.toString());
});

// Check local storage for dark mode preference
const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
darkModeCheckbox.checked = darkModeEnabled;
document.body.classList.toggle('dark-mode', darkModeEnabled);

function updateStatusBar(index) {
    const totalPages = comics.length;
    const currentPage = index + 1;
    statusBar.textContent = `Page ${currentPage} of ${totalPages}`;
}

showComic(currentIndex);