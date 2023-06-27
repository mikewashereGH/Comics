/*
    const comicImage = document.getElementById('comic-image');
    const statusBar = document.getElementById('status-bar');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const tabLinks = document.querySelectorAll('.nav-link[data-tab]');
    const tabContents = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            tabLinks.forEach(tabLink => tabLink.classList.remove('active'));
            tabContents.forEach(tabContent => tabContent.classList.remove('active'));

            link.classList.add('active');
            const targetTab = document.getElementById(link.dataset.tab);
            targetTab.classList.add('active');
        });
    });

    const comics = [
        'https://scontent-iad3-1.xx.fbcdn.net/v/t31.18172-8/12916774_230906927270012_2741856062295264042_o.png?stp=dst-png_p526x296&_nc_cat=108&ccb=1-7&_nc_sid=9267fe&_nc_ohc=IANKJOKUiX4AX8-OUX7&_nc_ht=scontent-iad3-1.xx&oh=00_AfAC4szihU5dnEEhGwLLMTvu0XQc_v3pgt6BDsdXglJJ_A&oe=64BFE012',
        'https://scontent-iad3-2.xx.fbcdn.net/v/t31.18172-8/12841333_210359419324763_565780683298741889_o.png?stp=dst-png_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=9267fe&_nc_ohc=QB0c1lUY9CcAX-V-HGd&_nc_ht=scontent-iad3-2.xx&oh=00_AfC_qKMQTW_CwZOgxLP4jDpIK65WsSpAHi1QZcxjhWLP4Q&oe=64BFC5D3',
        'https://scontent-iad3-1.xx.fbcdn.net/v/t31.18172-8/12841210_208962519464453_518851553368528026_o.png?stp=dst-png_p526x296&_nc_cat=107&ccb=1-7&_nc_sid=9267fe&_nc_ohc=MDn-t40tSrMAX855YRq&_nc_ht=scontent-iad3-1.xx&oh=00_AfD7-_gPtgMSghagJhtbNlND4sZ4KVK8ggxr_i-nRHEyQw&oe=64BFEC99',
        'https://scontent-iad3-1.xx.fbcdn.net/v/t31.18172-8/12764713_204233866603985_3481169030557010280_o.png?stp=dst-png_p526x296&_nc_cat=108&ccb=1-7&_nc_sid=9267fe&_nc_ohc=esUGNvABWjsAX9thwWQ&_nc_ht=scontent-iad3-1.xx&oh=00_AfBjAymMxN0EpYR4ITZDZwzcazxuKrv3WH947SiY2SHnUw&oe=64BFC550',
        'https://scontent-iad3-2.xx.fbcdn.net/v/t31.18172-8/12764835_201757340184971_6681134334838335622_o.png?stp=dst-png_p526x296&_nc_cat=106&ccb=1-7&_nc_sid=9267fe&_nc_ohc=CL4r6Il87i8AX-O_BC_&_nc_ht=scontent-iad3-2.xx&oh=00_AfB7yibtohyU256Fx4CbKFgcKapA8oDd4yGTCSOIFiPDtA&oe=64BFE74B',
        'https://scontent-iad3-1.xx.fbcdn.net/v/t31.18172-8/13063324_237382769955761_163099251676199208_o.png?_nc_cat=109&ccb=1-7&_nc_sid=9267fe&_nc_ohc=8UrjBaTwpokAX8NSpa1&_nc_ht=scontent-iad3-1.xx&oh=00_AfBg_i3SrnJwd4EXVJ0HrCegg_6B4Xeo794yt85tSxjLEA&oe=64BFFC89'
    ];

    let currentIndex = 0;

    const comicInfo = {
        name: 'Comic Name',
        description: 'Comic Description',
        totalPages: comics.length,
        readTime: '4 Min'
    };

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

    function updateStatusBar(index) {
        const totalPages = comics.length;
        const currentPage = index + 1;
        statusBar.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    function updateComicInfo() {
        const comicName1 = document.getElementById('comic-name1');
        const comicName2 = document.getElementById('comic-name2');
        const comicDescription = document.getElementById('comic-description');
        const comicTotalPages = document.getElementById('comic-total-pages');
        const comicReadTime = document.getElementById('comic-read-time');

        comicName1.textContent = comicInfo.name;
        comicName2.textContent = comicInfo.name;
        comicDescription.textContent = comicInfo.description;
        comicTotalPages.textContent = `${comicInfo.totalPages}`;
        comicReadTime.textContent = `${comicInfo.readTime}`
    }

    const invertModeEnabled = localStorage.getItem('invertModeEnabled') === 'true';
    const greyscaleModeEnabled = localStorage.getItem('greyscaleModeEnabled') === 'true';
    document.body.classList.toggle('invert-mode', invertModeEnabled);
    document.body.classList.toggle('greyscale-mode', greyscaleModeEnabled);

    updateComicInfo();

    showComic(currentIndex);
*/

window.addEventListener('DOMContentLoaded', () => {
    const comicContainer = document.getElementById('comic-container');
    const statusBar = document.getElementById('status-bar');

    const tabLinks = document.querySelectorAll('.nav-link[data-tab]');
    const tabContents = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            tabLinks.forEach(tabLink => tabLink.classList.remove('active'));
            tabContents.forEach(tabContent => tabContent.classList.remove('active'));

            link.classList.add('active');
            const targetTab = document.getElementById(link.dataset.tab);
            targetTab.classList.add('active');
        });
    });

    const comics = [
        'https://scontent-iad3-1.xx.fbcdn.net/v/t31.18172-8/12916774_230906927270012_2741856062295264042_o.png?stp=dst-png_p526x296&_nc_cat=108&ccb=1-7&_nc_sid=9267fe&_nc_ohc=IANKJOKUiX4AX8-OUX7&_nc_ht=scontent-iad3-1.xx&oh=00_AfAC4szihU5dnEEhGwLLMTvu0XQc_v3pgt6BDsdXglJJ_A&oe=64BFE012',
        'https://scontent-iad3-2.xx.fbcdn.net/v/t31.18172-8/12841333_210359419324763_565780683298741889_o.png?stp=dst-png_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=9267fe&_nc_ohc=QB0c1lUY9CcAX-V-HGd&_nc_ht=scontent-iad3-2.xx&oh=00_AfC_qKMQTW_CwZOgxLP4jDpIK65WsSpAHi1QZcxjhWLP4Q&oe=64BFC5D3',
        'https://scontent-iad3-1.xx.fbcdn.net/v/t31.18172-8/12841210_208962519464453_518851553368528026_o.png?stp=dst-png_p526x296&_nc_cat=107&ccb=1-7&_nc_sid=9267fe&_nc_ohc=MDn-t40tSrMAX855YRq&_nc_ht=scontent-iad3-1.xx&oh=00_AfD7-_gPtgMSghagJhtbNlND4sZ4KVK8ggxr_i-nRHEyQw&oe=64BFEC99',
        'https://scontent-iad3-1.xx.fbcdn.net/v/t31.18172-8/12764713_204233866603985_3481169030557010280_o.png?stp=dst-png_p526x296&_nc_cat=108&ccb=1-7&_nc_sid=9267fe&_nc_ohc=esUGNvABWjsAX9thwWQ&_nc_ht=scontent-iad3-1.xx&oh=00_AfBjAymMxN0EpYR4ITZDZwzcazxuKrv3WH947SiY2SHnUw&oe=64BFC550'
    ];

    const comicInfo = {
        name: 'Comic Name',
        description: 'Comic Description',
        totalPages: comics.length,
        readTime: '4 Min'
    };

    function updateComicInfo() {
        const comicName1 = document.getElementById('comic-name1');
        const comicName2 = document.getElementById('comic-name2');
        const comicDescription = document.getElementById('comic-description');
        const comicTotalPages = document.getElementById('comic-total-pages');
        const comicReadTime = document.getElementById('comic-read-time');

        comicName1.textContent = comicInfo.name;
        comicName2.textContent = comicInfo.name;
        comicDescription.textContent = comicInfo.description;
        comicTotalPages.textContent = `${comicInfo.totalPages}`;
        comicReadTime.textContent = `${comicInfo.readTime}`
    }

    updateComicInfo();

    function generateComicImages() {
        comics.forEach(comic => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('image-wrapper');

            const comicImage = document.createElement('img');
            comicImage.setAttribute('src', comic);
            comicImage.classList.add('comic-image');

            imageWrapper.appendChild(comicImage);
            comicContainer.appendChild(imageWrapper);
        });
    }

    generateComicImages();
});