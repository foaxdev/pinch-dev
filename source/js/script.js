let slideIndex = 1;

let elButtonNext = document.querySelector(".slider-dots-list__button--next");
let elButtonPrevious = document.querySelector(".slider-dots-list__button--previous");

if (elButtonNext && elButtonPrevious)
    showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let elsSlides = document.getElementsByClassName("slide-show__slide");

    if (n + 1 > elsSlides.length) {
        elButtonNext.removeEventListener("click", setNextSlide, true);
        elButtonNext.classList.add("slider-dots-list__button--disabled");
    } else {
        elButtonNext.addEventListener("click", setNextSlide, true);
        elButtonNext.classList.remove("slider-dots-list__button--disabled");
    }

    if (n - 1 < 1) {
        elButtonPrevious.removeEventListener("click", setPreviousSlide, true);
        elButtonPrevious.classList.add("slider-dots-list__button--disabled");
    } else {
        elButtonPrevious.addEventListener("click", setPreviousSlide, true);
        elButtonPrevious.classList.remove("slider-dots-list__button--disabled");
    }

    for (let i = 0; i < elsSlides.length; i++) {
        elsSlides[i].style.display = "none";
    }

    elsSlides[slideIndex - 1].style.display = "block";
}

function setNextSlide() {
    plusSlides(1);
}

function setPreviousSlide() {
    plusSlides(-1);
}
