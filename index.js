/*MENU TOGGLE vezérlése*/
const menuToggle = document.querySelector('nav ul.toggle');
const menuList = document.querySelector('nav ul.menu');

menuToggle.addEventListener('click', () => {
    const menuActiveItems = document.querySelectorAll('.menu-active');
    menuActiveItems.forEach(menuActiveItem => {
        menuActiveItem.classList.remove("menu-active");
    })
    if(menuActiveItems.length == 0) {
        menuToggle.classList.add("menu-active");
        menuList.classList.add("menu-active");
    }
})

/*ASIDE TOGGLE vezérlése*/
const asideToggle = document.querySelector('aside .aside_toggle');
const asideList = document.querySelector('aside .aside_content');

asideToggle.addEventListener('click', () => {
    const asideActiveItems = document.querySelectorAll('.aside-active');
    asideActiveItems.forEach(asideActiveItem => {
        asideActiveItem.classList.remove("aside-active");
    })
    if(asideActiveItems.length == 0) {
        asideToggle.classList.add("aside-active");
        asideList.classList.add("aside-active");
    }
})

/*FLIGHTINFO TOGGLE vezérlése*/
const flightinfoToggle = document.querySelector('.flightinfo .flightinfo-toggle');
const flightinfoList = document.querySelector('.flightinfo .flightinfo-menu');

flightinfoToggle.addEventListener('click', () => {
    const flightinfoActiveItems = document.querySelectorAll('.flightinfo-active');
    flightinfoActiveItems.forEach(flightinfoActiveItem => {
        flightinfoActiveItem.classList.remove("flightinfo-active");
    })
    if(flightinfoActiveItems.length == 0) {
        flightinfoToggle.classList.add("flightinfo-active");
        flightinfoList.classList.add("flightinfo-active");
    }
})

/* CONTACT FORM vezérlése */
const submitButton = document.querySelector('form button.glowing-button');
const email = document.querySelector('.field #email');
const phoneNumber = document.querySelector('.field #phone-number');
const form = document.querySelector('.contact-form');
const items = document.querySelectorAll('.form-item');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    checkInputs();
    let correctFormInput = true;
    for (const item of items) {
        if (item.classList.contains("blank") || item.classList.contains("error")) {
            correctFormInput = false;
        }
    }
    if (correctFormInput) {
        form.submit();
        form.reset();
    }
})

function checkInputs() {
    
    for (const item of items) {
        if (item.value == "") {
            item.classList.add("blank");
            item.parentElement.classList.add("blank");
        }
        if (items[1].value != "") {
            checkEmail();
        }
        if (items[2].value != "") {
            checkPhoneNumber();
        }

        items[1].addEventListener('keyup', (event) => {
            checkEmail();
        });
        items[2].addEventListener('keyup', (event) => {
            checkPhoneNumber();
        });
        
        item.addEventListener('keyup', (event) => {            
            if (item.value != "") {
                item.classList.remove("blank");
                item.parentElement.classList.remove("blank");
            } else {
                item.classList.add("blank");
                item.parentElement.classList.add("blank");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    
    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

function checkPhoneNumber() {
    const phoneNumberRegex = /^\+(?:[0-9]●?){6,14}[0-9]$/;
    
    if (!phoneNumber.value.match(phoneNumberRegex)) {
        phoneNumber.classList.add("error");
        phoneNumber.parentElement.classList.add("error");
    } else {
        phoneNumber.classList.remove("error");
        phoneNumber.parentElement.classList.remove("error");
    }
}

/* INDEX CAROUSEL vezérlése */
let nextArrow = document.querySelector('.carousel-next-arrow');
let prevArrow = document.querySelector('.carousel-prev-arrow');
let mainCarousel = document.querySelector('.main-carousel');
let mainCarouselList = document.querySelector('.main-carousel .carousel-list');
let mainCarouselThumbnail = document.querySelector('.main-carousel .carousel-thumbnail');

nextArrow.onclick = function() {
    showSlider('next');
}

prevArrow.onclick = function() {
    showSlider('prev');
}

let timeRunning = 2200;
let timeAutoNext = 8000;
let runTimeOut;
let runAutoRun = setTimeout(() => {
    nextArrow.click();
}, timeAutoNext);

function showSlider(type) {
    let itemSlider = document.querySelectorAll('.main-carousel .carousel-list .carousel-item');
    let itemThumbnail = document.querySelectorAll('.main-carousel .carousel-thumbnail .carousel-thumbnail-item');

    if (type === 'next') {
        mainCarouselList.appendChild(itemSlider[0]);
        mainCarouselThumbnail.appendChild(itemThumbnail[0]);
        mainCarousel.classList.add('next');
    } else {
        let positionLastItem = itemSlider.length - 1;
        mainCarouselList.prepend(itemSlider[positionLastItem]);
        mainCarouselThumbnail.prepend(itemThumbnail[positionLastItem]);
        mainCarousel.classList.add('prev');
    }
    
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        mainCarousel.classList.remove('next');
        mainCarousel.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(() => {
        nextArrow.click();
    }, timeAutoNext);
}