let slideIndex = 1;
let elsSlides = document.getElementsByClassName("slide-show__slide");

function plusSlides() {
    changeSlides();
}

function showSlides(n, elButtonNext, elButtonPrevious) {
    let elsSlides = document.getElementsByClassName("slide-show__slide");

    console.log(n);

    if (n + 1 >= elsSlides.length) {
        elButtonNext.removeEventListener("click", function () {
            plusSlides();
        }, false);
        elButtonNext.classList.add("slider-dots-list__button--disabled");
    } else {
        elButtonNext.addEventListener("click", function () {
            plusSlides();
        }, false);
        elButtonNext.classList.remove("slider-dots-list__button--disabled");
    }

    if (n - 1 <= 1) {
        elButtonPrevious.removeEventListener("click", function () {
            plusSlides();
        }, false);
        elButtonPrevious.classList.add("slider-dots-list__button--disabled");
    } else {
        elButtonPrevious.addEventListener("click", function () {
            plusSlides();
        }, false);
        elButtonPrevious.classList.remove("slider-dots-list__button--disabled");
    }
}

function changeSlides() {
    for (let i = 0; i < elsSlides.length; i++) {
        elsSlides[i].style.display = "none";
    }

    elsSlides[slideIndex - 1].style.display = "block";
    slideIndex++;
}

if (elsSlides) {
    let elButtonNext = document.querySelector(".slider-dots-list__button--next");
    let elButtonPrevious = document.querySelector(".slider-dots-list__button--previous");

    if (elButtonNext && elButtonPrevious) {
        elButtonNext.addEventListener("click", function () {
            plusSlides();
        }, false);

        elButtonPrevious.addEventListener("click", function () {
            plusSlides();
        }, false);

        showSlides(slideIndex, elButtonNext, elButtonPrevious);
    }

}
