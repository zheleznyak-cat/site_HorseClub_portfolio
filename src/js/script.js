"use strict";

const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const progressFill = document.querySelector(".progress-fill");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;

const updateSlider = () => {
  const slideWidth = slides[0].offsetWidth;
  slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

  const totalSlides = slides.length;
  let currentIndexg = 0;

  // Ширина бегунка — теперь покрывает 100% ширины прогресс-бара, делённую на количество слайдов
  const fillWidth = 100 / totalSlides;

  // Смещение бегунка на нужную часть (например, 3 слайд из 4 — на 75%)
  const fillLeft = fillWidth * currentIndex;

  progressFill.style.width = `${fillWidth}%`;
  progressFill.style.left = `${fillLeft}%`;
};

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});

// Swipe support
let startX = 0;
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50) {
    currentIndex = (currentIndex + 1) % slides.length;
  } else if (diff < -50) {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  }
  updateSlider();
});

// Инициализация
window.addEventListener("load", updateSlider);

// gallery
const track = document.querySelector(".gallery-track");
const cards = document.querySelectorAll(".gallery__box_inner");
const prevBtng = document.querySelector(".prevg");
const nextBtng = document.querySelector(".nextg");
const progressFillg = document.querySelector(".progress-fillg");

const totalCards = cards.length;
let currentIndexg = 0;

function getVisibleCount() {
  const containerWidth =
    document.querySelector(".gallery-container").offsetWidth;
  const cardWidth = cards[0].offsetWidth;
  return Math.floor(containerWidth / cardWidth);
}

function updateGallery() {
  const visibleCount = 5;
  const maxIndex = totalCards - visibleCount;

  currentIndexg = Math.max(0, Math.min(currentIndexg, maxIndex));
  const cardWidth = cards[0].offsetWidth;
  const offset = -currentIndexg * (cardWidth + getGap());
  track.style.transform = `translateX(${offset}px)`;

  const firstVisible = currentIndexg;
  const lastVisible = currentIndexg + visibleCount - 1;

  cards.forEach((card, index) => {
    card.classList.remove(
      "gallery__box_inner--edge",
      "gallery__box_inner--center",
      "gallery__box_inner--hidden"
    );

    if (index < firstVisible || index > lastVisible) {
      card.classList.add("gallery__box_inner--hidden");
    } else if (index === firstVisible || index === lastVisible) {
      card.classList.add("gallery__box_inner--edge");
    } else {
      card.classList.add("gallery__box_inner--center");
    }
  });

  // === Плавное движение бегунка ===
  const centerIndex = currentIndexg + 2; // центральная карточка
  const totalSteps = totalCards - 1;
  const trackWidth = document.querySelector(".progress-barg").offsetWidth;
  const fillWidth = progressFillg.offsetWidth;

  let position = 0;

  if (currentIndexg === 0) {
    position = 0; // крайнее левое
  } else if (currentIndexg + 5 >= totalCards) {
    position = trackWidth - fillWidth; // крайнее правое
  } else {
    const stepRatio = centerIndex / totalSteps;
    position = stepRatio * (trackWidth - fillWidth);
  }

  progressFillg.style.left = `${position}px`;
}

// Получение gap между карточками в px
function getGap() {
  const trackStyles = window.getComputedStyle(track);
  const gapValue = trackStyles.gap || "0px";
  return parseFloat(gapValue);
}

prevBtng.addEventListener("click", () => {
  if (currentIndexg > 0) {
    currentIndexg--;
    updateGallery();
  }
});

nextBtng.addEventListener("click", () => {
  const maxIndex = totalCards - 5; // показываем 5
  if (currentIndexg < maxIndex) {
    currentIndexg++;
    updateGallery();
  }
});

// Swipe
let startXg = 0;
let endX = 0;

track.addEventListener("touchstart", (e) => {
  startXg = e.touches[0].clientX;
});

track.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

track.addEventListener("touchend", () => {
  const diff = startXg - endX;
  const maxIndex = totalCards - 5;

  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentIndexg < maxIndex) {
      currentIndexg++;
    } else if (diff < 0 && currentIndexg > 0) {
      currentIndexg--;
    }
    updateGallery();
  }
});

window.addEventListener("resize", updateGallery);
updateGallery(); // init

// Форма - чекбокс

const btn = document.querySelector(".form__btn-a");

const nameInput = document.getElementById("name");
const telInput = document.getElementById("tel");
const checkbox = document.getElementById("checkbox");
const button = document.querySelector(".form__btn-a");

const nameLabel = document.querySelector('label[for="name"]');
const telLabel = document.querySelector('label[for="tel"]');
const hint = document.querySelector(".hint");

// Проверка поля имени
function validateName() {
  const value = nameInput.value;
  const isValid = !/\d/.test(value) && value.trim() !== "";

  nameLabel.style.display = isValid ? "none" : "block";
  nameInput.classList.toggle("error", !isValid);

  return isValid;
}

// Проверка поля телефона
function validateTel() {
  const value = telInput.value;
  const isValid = /^\d+$/.test(value) && value.trim() !== "";

  telLabel.style.display = isValid ? "none" : "block";
  telInput.classList.toggle("error", !isValid);

  return isValid;
}

// Проверка чекбокса и включение кнопки
function checkFormValidity() {
  const nameValid = validateName();
  const telValid = validateTel();

  if (nameValid && telValid) {
    checkbox.disabled = false;
  } else {
    checkbox.disabled = true;
    checkbox.checked = false;
  }

  const checkboxChecked = checkbox.checked;

  // Управляем кнопкой
  if (nameValid && telValid && checkboxChecked) {
    button.classList.remove("disabled");
    button.classList.add("enabled");
    button.setAttribute("href", "#send");
    hint.style.display = "none";
  } else {
    button.classList.add("disabled");
    button.classList.remove("enabled");
    button.removeAttribute("href");
    hint.style.display = checkboxChecked ? "none" : "block";
  }
}
// Навешиваем обработчики
nameInput.addEventListener("input", checkFormValidity);
telInput.addEventListener("input", checkFormValidity);
checkbox.addEventListener("change", checkFormValidity);

// модальное окно
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".review-card");

  cards.forEach((card) => {
    const text = card.querySelector(".review-card__text");
    const button = card.querySelector(".review-card__more");
    const modal = card.querySelector(".modal");
    const modalText = card.querySelector(".modal__text");
    const modalClose = card.querySelector(".modal__close");

    // Сохраняем полный текст, если data-full-text отсутствует
    if (!text.dataset.fullText) {
      text.dataset.fullText = text.textContent;
    }

    // Создаём временную копию, чтобы точно измерить высоту без line-clamp
    const clone = text.cloneNode(true);
    clone.style.webkitLineClamp = "unset";
    clone.style.display = "block";
    clone.style.position = "absolute";
    clone.style.visibility = "hidden";
    clone.style.height = "auto";
    clone.style.maxHeight = "none";
    document.body.appendChild(clone);

    const lineHeight = parseFloat(getComputedStyle(clone).lineHeight);
    const textHeight = clone.scrollHeight;
    const lineCount = Math.round(textHeight / lineHeight);
    document.body.removeChild(clone);

    if (lineCount <= 3) {
      button.style.display = "none";
    } else {
      button.addEventListener("click", () => {
        modalText.textContent = text.dataset.fullText;
        modal.style.display = "block";
      });

      modalClose.addEventListener("click", () => {
        modal.style.display = "none";
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    }
  });
});

/* JS для блока отзывов */
const reviewTrack = document.querySelector(".review-track");
const reviewCards = document.querySelectorAll(".review-card");
const prevBtnr = document.querySelector(".prevr");
const nextBtnr = document.querySelector(".nextr");
const progressFillr = document.querySelector(".progress-fillr");

const totalReviewCards = reviewCards.length;
let currentReviewIndex = 0;

function getVisibleReviewCount() {
  const containerWidth =
    document.querySelector(".review-container").offsetWidth;
  const cardWidth = reviewCards[0].offsetWidth;
  return Math.floor(containerWidth / cardWidth);
}

function updateReviewGallery() {
  const visibleCount = 5;
  const maxIndex = totalReviewCards - visibleCount;

  currentReviewIndex = Math.max(0, Math.min(currentReviewIndex, maxIndex));
  const cardWidth = reviewCards[0].offsetWidth;
  const offset = -currentReviewIndex * (cardWidth + getReviewGap());
  reviewTrack.style.transform = `translateX(${offset}px)`;

  const firstVisible = currentReviewIndex;
  const lastVisible = currentReviewIndex + visibleCount - 1;

  reviewCards.forEach((card, index) => {
    card.classList.remove(
      "review-card--edge",
      "review-card--center",
      "review-card--hidden"
    );

    if (index < firstVisible || index > lastVisible) {
      card.classList.add("review-card--hidden");
    } else if (index === firstVisible || index === lastVisible) {
      card.classList.add("review-card--edge");
    } else {
      card.classList.add("review-card--center");
    }
  });

  // Плавное движение бегунка
  const centerIndex = currentReviewIndex + 2;
  const totalSteps = totalReviewCards - 1;
  const trackWidth = document.querySelector(".progress-barr").offsetWidth;
  const fillWidth = progressFillr.offsetWidth;

  let position = 0;

  if (currentReviewIndex === 0) {
    position = 0;
  } else if (currentReviewIndex + 5 >= totalReviewCards) {
    position = trackWidth - fillWidth;
  } else {
    const stepRatio = centerIndex / totalSteps;
    position = stepRatio * (trackWidth - fillWidth);
  }

  progressFillr.style.left = `${position}px`;
}

function getReviewGap() {
  const trackStyles = window.getComputedStyle(reviewTrack);
  const gapValue = trackStyles.gap || "0px";
  return parseFloat(gapValue);
}

prevBtnr?.addEventListener("click", () => {
  if (currentReviewIndex > 0) {
    currentReviewIndex--;
    updateReviewGallery();
  }
});

nextBtnr?.addEventListener("click", () => {
  const maxIndex = totalReviewCards - 5;
  if (currentReviewIndex < maxIndex) {
    currentReviewIndex++;
    updateReviewGallery();
  }
});

let startXr = 0;
let endXr = 0;

reviewTrack.addEventListener("touchstart", (e) => {
  startXr = e.touches[0].clientX;
});

reviewTrack.addEventListener("touchmove", (e) => {
  endXr = e.touches[0].clientX;
});

reviewTrack.addEventListener("touchend", () => {
  const diff = startXr - endXr;
  const maxIndex = totalReviewCards - 5;

  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentReviewIndex < maxIndex) {
      currentReviewIndex++;
    } else if (diff < 0 && currentReviewIndex > 0) {
      currentReviewIndex--;
    }
    updateReviewGallery();
  }
});

window.addEventListener("resize", updateReviewGallery);
updateReviewGallery();

// Карта
ymaps.ready(init);

function init() {
  const coords = [59.92982085, 30.51426277];

  const map = new ymaps.Map("map", {
    center: coords,
    zoom: 15,
    controls: [],
  });

  // 1. Кастомная цветная метка
  const customPlacemark = new ymaps.Placemark(
    coords,
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "/img/map.png",
      iconImageSize: [46, 63],
      iconImageOffset: [-23, -63],
    }
  );
  map.geoObjects.add(customPlacemark);

  // 2. Смещаем центр визуально — через setMargin
  map.setMargin([0, 0, 0, window.innerWidth * 0.1]); // отступ слева

  // 3. Применяем чёрно-белый фильтр

  // + debug
  setTimeout(() => {
    const found = map.container
      .getParentElement()
      .querySelector(".ymaps-2-1-79-map, canvas, img");
    console.log("Найден элемент карты для фильтра:", found);
  }, 500);

  const applyGrayscale = () => {
    const selectors = [".ymaps-2-1-79-map", "canvas", "img"];
    let applied = false;

    selectors.forEach((sel) => {
      map.container
        .getParentElement()
        .querySelectorAll(sel)
        .forEach((el) => {
          el.style.filter = "grayscale(100%)";
          applied = true;
        });
    });

    return applied;
  };

  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    if (applyGrayscale() || attempts >= 50) {
      clearInterval(interval);
    }
  }, 100);
}

// Окно навигации
const modal = document.querySelector(".navigation-hidden__nav");
const openBtn = document.querySelector(".navigation-hidden__icon");
const closeBtn = document.querySelector(".navigation-hidden__nav_close-btn");

openBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
