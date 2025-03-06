'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/***********************
 * Start Advanced dom manipulation techniques
 ************************/

//want apply css to entire page
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');
const allBtn = document.getElementsByTagName('button');
console.log(allBtn);
console.log(document.getElementsByClassName('btn'));

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'This is a cookie message';
message.innerHTML =
  'This is a cookie message<button class="close-btn-cookie">Got it</button>';
console.log(message);
header.prepend(message);
// header.append(message); //move the element from first child to last child
//dom element is unique can be used on single section
// header.append(message.cloneNode(true));
//
// header.append(message);
// header.before(message);
// header.after(message);

//delete element
const closeBtnCookie = document.querySelector('.close-btn-cookie');
closeBtnCookie.addEventListener('click', function (e) {
  e.preventDefault();
  // message.remove(); //very recent remove() method
  message.parentElement.removeChild(message); // old style technique
});

//Reference lecture
//these are inline styles
message.style.backgroundColor = 'red';
// message.style.height = '100px';

// console.log(getComputedStyle(message)); //all property and values

// console.log(getComputedStyle(message).color);
console.log(Number.parseFloat(getComputedStyle(message).height) + 40 + 'px');
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 80 + 'px';

//lets work with css custom property from js
console.log(
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
);

document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'tsoft');

const navLinkBtn = document.querySelector('.nav__link--btn');

console.log(navLinkBtn.href); //return the whole link with the domain link including
console.log(navLinkBtn.getAttribute('href')); //only return the actual link

//Data attribute
console.log(logo.dataset.versionNumber); //has to be camelCase in datasest

logo.classList.add('cd');
logo.classList.remove('cd');
logo.classList.toggle('cd');
console.log(logo.classList.contains('c'));
