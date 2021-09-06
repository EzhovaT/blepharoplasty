//Slick slider

$(document).ready(function () {
  $(".examples-slider").slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 3,
    rows: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
        },
      },
    ],
  });
  $(".video-reviews").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  });
  $(".doctors__slider").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  });
});

///End jQuery Calls/

//Custom-menu

const openMenuBtn = document.querySelector(".header__menu-btn"),
  page = document.querySelector(".page"),
  closeMenuBtn = document.querySelector(".header-menu__btn"),
  headerMenu = document.querySelector(".header-menu");

const isEscEvent = (e) => e.key === 'Escape' || e.key === 'Esc';

function openMenu (e) {
  headerMenu.classList.add("open");
  bodyLock();
  document.addEventListener('keydown', (e) => {
    if(isEscEvent(e)) {
      headerMenu.classList.remove("open");
      document.removeEventListener('keydown', onPlayerPopupEscKeydown);
    }
  })
  page.addEventListener('click', function closeClick (e) {
    if(!e.target.closest('.header__inner')) {
      closeMenu();
      page.removeEventListener('click', closeClick);
    }
  })
}

function closeMenu (e) {
  headerMenu.classList.remove("open");
  bodyUnLock();
}

openMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

//Popup
const popupCallLinks = document.querySelectorAll('.popup-call'),
 popupConsultationLinks = document.querySelectorAll('.popup-consultation'),
 forms = document.querySelectorAll('.popup__form');

let unlock = true;

const timeout = 800;

for (let i = 0; i < forms.length; i++) {
  const form = forms[i];
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const successPopup = document.getElementById('popup-success');
    popupOpen(successPopup);
  })
}

if (popupCallLinks.length > 0) {
  for (let i = 0; i < popupCallLinks.length; i++) {
    const popupLink = popupCallLinks[i];
    popupLink.addEventListener('click', (e) => {
      const currentPopup = document.getElementById('popup-call');
      popupOpen(currentPopup);
    })
  }
}

if (popupConsultationLinks.length > 0) {
  for (let i = 0; i < popupConsultationLinks.length; i++) {
    const popupLink = popupConsultationLinks[i];
    popupLink.addEventListener('click', (e) => {
      const currentPopup = document.getElementById('popup-consultation');
      popupOpen(currentPopup);
    })
  }
}

const popupCloseBtn = document.querySelectorAll('.close-popup');

if( popupCloseBtn.length > 0 ) {
  for (let i = 0; i < popupCloseBtn.length; i++) {
    const el = popupCloseBtn[i];
    el.addEventListener('click', (e) => {
      popupClose(el.closest('.popup'));
    })
  }
}

function popupOpen(currentPopup) {
  if(currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', (e) => {
      if(!e.target.closest('.popup__content-wrapper')) {
        popupClose(e.target.closest('.popup'));
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.page__wrapper').offsetWidth + 'px';
  page.style.paddingRight = lockPaddingValue;
  page.classList.add('lock');

  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function() {
    page.style.paddingRight = '0px';
    page.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', (e) => {
  if(isEscEvent(e)) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
})

//animation - element show

function onEntry(entry) {
  entry.forEach(change => {
    if(change.isIntersecting) {
      change.target.classList.add('element-animation_show');
    } else {
      change.target.classList.remove('element-animation_show');
    }
  });
}

let options = {threshold: [0.5]};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for(let elem of elements) {
  observer.observe(elem);
}