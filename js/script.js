"use strict"

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    ios: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.ios() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add("_touch");

    let menuArrows = document.querySelectorAll(".bold");
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {
                for (let index = 0; index < menuArrows.length; index++) {
                    if (menuArrows[index] !== menuArrow)
                        menuArrows[index].parentElement.classList.remove("_active");
                }
                menuArrow.parentElement.classList.toggle("_active");
            });
        }
    }
} else {
    document.body.classList.add("_pc");
}

//burger menu
const icon = document.querySelector(".header__icon");
const menuBody = document.querySelector(".header__menu");
const subMenu = document.querySelectorAll(".menu__sub-menu li a");

if (icon) {
    icon.addEventListener("click", function (e) {
        document.body.classList.toggle("_lock");
        icon.classList.toggle("_active");
        menuBody.classList.toggle("_active");
    });
}

if (subMenu.length > 0) {
    subMenu.forEach(subMenu => {
        subMenu.addEventListener("click", function (e) {
            if (icon.classList.contains("_active")) {
                let menuArrows = document.querySelectorAll(".bold");
                menuArrows.forEach(menuArrows => {
                    menuArrows.parentElement.classList.remove("_active");
                });
                document.body.classList.remove("_lock");
                icon.classList.remove("_active");
                menuBody.classList.remove("_active");
            }
        });
    });
}

//search

const search = document.querySelector(".search");
const fullImage = document.querySelector(".info__fullimage");

document.addEventListener("click", searchTarget);
function searchTarget(e) {
    if (e.target.closest(".search input")) {
        menuBody.classList.toggle("_none");
        search.classList.toggle("_active");
    }

    if (!e.target.closest(".search input")) {
        menuBody.classList.remove("_none");
        search.classList.remove("_active");
    }
}
document.addEventListener("click", fullImg);

function fullImg(e) {
    if (e.target.closest(".info__image")) {
        fullImage.classList.add("_fullscreen");
    }
    if (!e.target.closest(".info__image")) {
        fullImage.classList.remove("_fullscreen");
    }
}

//PLAYER BUTTON
const playerSeries = document.querySelector(".player__series");

for (let index = 0; index < 18; index++) {
    if(index == 0){
        playerSeries.innerHTML += `<button class='player__button _active'>Серия ${index + 1}</button>`;
    }else{
        playerSeries.innerHTML += `<button class='player__button'>Серия ${index+1}</button>`;
    }
}

const buttonSeries = document.querySelectorAll(".player__button");
buttonSeries.forEach(buttonSeries => {
    buttonSeries.addEventListener("click", function(e){
        document.querySelectorAll(".player__button").forEach(e => {
            e.classList.remove("_active");
        });
    buttonSeries.classList.add("_active");
    });
});

const playerSeasons = document.querySelector(".player__seasons");

for (let index = 0; index < 3; index++) {
    if (index == 0){
        playerSeasons.innerHTML += `<button class='_active'>Сезон ${index + 1}</button>`;
    }else{
        playerSeasons.innerHTML += `<button class=''>Сезон ${index + 1}</button>`;
    }
    
}

const buttonSeasons = document.querySelectorAll(".player__seasons button");
buttonSeasons.forEach(buttonSeasons => {
    buttonSeasons.addEventListener("click", function (e) {
        document.querySelectorAll(".player__seasons button").forEach(e => {
            e.classList.remove("_active");
            for(let index = 0; index < buttonSeries.length; index++){
                buttonSeries[index].classList.remove("_active");
                if(index==0){
                    buttonSeries[index].classList.add("_active");
                }
            }
        });
        buttonSeasons.classList.add("_active");
    });
});
