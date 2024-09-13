document.addEventListener('DOMContentLoaded', function () {
    const sliderContents = document.querySelectorAll('.slider-content');
    const arrowRights = document.querySelectorAll('.arrow-right');
    const arrowLefts = document.querySelectorAll('.arrow-left');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;


    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-theme');
    });
    function createSlider(sliderContent, arrowRight, arrowLeft) {
        const sliderItems = sliderContent.querySelectorAll('.game-card');
        const slideWidth = sliderItems[0].offsetWidth + 10;
        let currentIndex = 0;

        arrowRight.addEventListener('click', function () {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = sliderItems.length - 1;
            }
            updateSliderPosition();
        });

        arrowLeft.addEventListener('click', function () {
            currentIndex++;
            if (currentIndex >= sliderItems.length) {
                currentIndex = 0;
            }
            updateSliderPosition();
        });

        function updateSliderPosition() {
            const newPosition = -currentIndex * slideWidth;
            sliderContent.style.transform = `translateX(${newPosition}px)`;
        }

        setInterval(function () {
            currentIndex++;
            if (currentIndex >= sliderItems.length) {
                currentIndex = 0;
            }
            updateSliderPosition();
        }, 10000);
    }

    sliderContents.forEach((sliderContent, index) => {
        createSlider(sliderContent, arrowRights[index], arrowLefts[index]);
    });
});
