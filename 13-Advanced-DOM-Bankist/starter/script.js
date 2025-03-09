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
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// const header = document.querySelector('.header');

// const allSections = document.querySelectorAll('.section');
// const allBtn = document.getElementsByTagName('button');
// console.log(allBtn);
// console.log(document.getElementsByClassName('btn'));

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'This is a cookie message';
// message.innerHTML =
//   'This is a cookie message<button class="close-btn-cookie">Got it</button>';
// console.log(message);
// header.prepend(message);
// // header.append(message); //move the element from first child to last child
// //dom element is unique can be used on single section
// // header.append(message.cloneNode(true));
// //
// // header.append(message);
// // header.before(message);
// // header.after(message);

// //delete element
// const closeBtnCookie = document.querySelector('.close-btn-cookie');
// closeBtnCookie.addEventListener('click', function (e) {
//   e.preventDefault();
//   // message.remove(); //very recent remove() method
//   message.parentElement.removeChild(message); // old style technique
// });

// //Reference lecture
// //these are inline styles
// message.style.backgroundColor = 'red';
// // message.style.height = '100px';

// // console.log(getComputedStyle(message)); //all property and values

// // console.log(getComputedStyle(message).color);
// console.log(Number.parseFloat(getComputedStyle(message).height) + 40 + 'px');
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 80 + 'px';

// //lets work with css custom property from js
// console.log(
//   getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
// );

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'tsoft');

// const navLinkBtn = document.querySelector('.nav__link--btn');

// console.log(navLinkBtn.href); //return the whole link with the domain link including
// console.log(navLinkBtn.getAttribute('href')); //only return the actual link

// //Data attribute
// console.log(logo.dataset.versionNumber); //has to be camelCase in datasest

// logo.classList.add('cd');
// logo.classList.remove('cd');
// logo.classList.toggle('cd');
// console.log(logo.classList.contains('c'));

/***********************
 * Start working to original app features
 ************************/

//Implementing smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const section1coords = section1.getBoundingClientRect();
  // console.log(section1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('current scroll xy', window.pageXOffset, window.pageYOffset);
  console.log(
    'height, width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //scrolling
  //Window scrollTo()
  // window.scrollTo({
  //   left: section1coords.left + window.pageXOffset,
  //   top: section1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // more modern way of doing scrolling
  //It’s been available across browsers since September 2020.
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

//Events advanced tenchiques
// const h1 = document.querySelector('h1');

// const alertH1 = function () {
//   alert('Hello h1');
// };

// h1.addEventListener('mouseenter', alertH1);

// //remove eventListener after 5 seconds
// setTimeout(function () {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 5000);

//Event Propagation Bubbling and Capturing

// function getRandomRGB() {
//   const r = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   return `rgb(${r}, ${g}, ${b})`;
// }

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomRGB();
//   // e.stopPropagation();
//   console.log('Link', e.target);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomRGB();
//   console.log('LinkSSS', e.target);

//   // e.stopPropagation();
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = getRandomRGB();
//     console.log('Nav', e.target);
//   },
//   true // bubbling from top to bottom on DOM tree
// );

//Implementing page navigations

// const allNavLink = document.querySelectorAll('.nav__link');

//this is not effective becuase we are copying same callback function under foreach loop which will make 1000 copy if loop for 1000 times so we need to separate that function

//so we need to use Event Delegations to prevent this
// allNavLink.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log('link', id);
//     console.log(document.querySelector(id));

//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

//Event Delegation example implementation
//1. Add Event Listner to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target.classList.contains('nav__link'));
  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log('link', id);
    console.log(document.querySelector(id));
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

const nav = document.querySelector('nav');

//mouse enter event does not have bubble
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    //this below foreach will not work becuase here [this] in this context is not valid
    // siblings.forEach(function (el) {
    //   if (el !== link) el.style.opacity = this;
    // });
    //we need to use arrow functions
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//we can overcome calling method from another call back method using Bind method
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

//this will work becuase bind return an new function
//handler function can only take one argument using bind if we need  multiple argument then we need to pass array or object
//passing an arguments into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));
/***********************
 * Dom traversing
 ************************/

const h11 = document.querySelector('h1');
// *************************
//Going downwords: child
// *************************
//under h11 we got some span tags with class
console.log(h11.querySelectorAll('.highlight'));
//some time we need direct children
console.log(h11.childNodes); //nodes can be anything can be a comment or elements
console.log(h11.children); //give html collections and only works for direct children

console.log((h11.firstElementChild.style.color = 'red')); //only first element will be effected
console.log((h11.lastElementChild.style.color = 'blue')); //only last element will be effected
// *************************
//Going upwords: parent
// *************************
console.log(h11.parentNode);
console.log(h11.parentElement);
//closest() method (like querySelector use id or class) will find parent element no matter where it it it will find that element by searching using class or ID
h11.closest('.header').style.background = 'var(--color-secondary-darker)';
//querySelector find children no matter how much down inside and colsest method is oposite of querySelector which find parent element no matter how much far up
// *************************
//Going sideways: siblings
// *************************
console.log(h11.previousElementSibling);
console.log(h11.nextElementSibling);

console.log(h11.previousSibling);
console.log(h11.nextSibling);
console.log(h11.parentElement.children); //html collection can be iterable using spread operator

/* [...h11.parentElement.children].forEach(function (el) {
  if (el !== h11) el.style.transform = 'scale(0.5)';
});
 */

//Building Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
console.log(tabs);

const tabContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

//is a bad practice we will use Event Delegation instead
/* tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    console.log('Tab clicked');
  });
}); */

//event delegation use case

tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return; //modern way of returning immediately when no clicked elements
  tabs.forEach(function (tab) {
    tab.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(function (tab) {
    tab.classList.remove('operations__content--active');
  });

  //meed to remove other active class tab so that we can set only clicked tab as active

  clicked.classList.add('operations__tab--active');

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Implement sticky navigation using sticky class

//scroll event available on window object not document object

//scroll event is not efficient becuase it will fire everytime when scrolling which will make page slower we have to use alternative
/* const initialCoordinate = section1.getBoundingClientRect(); //Es-6 2015 feature
console.log('initialCoordinate', initialCoordinate);

// console.log(window.innerWidth); // Viewport width in pixels
// console.log(window.innerHeight); // Viewport height in pixels

window.addEventListener('scroll', function (e) {
  // console.log(window.scroll);
  // console.log(window.scrollX);
  console.log(window.scrollY);
  if (window.scrollY > initialCoordinate.top) {
    //then stiky nav class added to the menu
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
  // navigation should sticky as soon as we reach the first section
  //not hard code the value of scrollY.. due to viewport
  //calculate section 1 value
}); */

//this is bad due to scroll event its a perfomance issue

/***********************
 * Alternavtive is IntersectionObserver API
 ************************/
//this function will get called each time that the observed element, so our target element here (section1) is intersecting the root element at threshold we defined

/* const obsCallBack = function (entries, observer) {
  console.log(entries);

  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null, //root element is the target element , if null then intersecting the entire viewport
  threshold: 0.1, //10%//percentage of intersection at which the observer callback will be called
};
const observer = new IntersectionObserver(obsCallBack, obsOptions);

observer.observe(section1); //our target her section 1 intersecting the viewport which is null means entire viewport at 10%
 */
const header = document.querySelector('.header');

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});

headerObserver.observe(header);

//using observer implement animations of section showing
const allSections = document.querySelectorAll('.section');

const sectionShowHide = function (entries, observer) {
  const [entry] = entries;
  entries.forEach(entry => {
    //console.log('entry section', entry);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(sectionShowHide, {
  root: null,
  threshold: 0.15, //15% percentage of intersection at which the callback will be called
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy load using js

const imgTargets = document.querySelectorAll('img[data-src]'); //filtering images which have properties data-src
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  // const [entry] = entries;
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    //replace src with data src
    // console.log(entry.target.src);
    // console.log(entry.target.dataset.src);
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //exactly 200px before we reach down to that image
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

/***********************
 * Slider using Vanila JS technique
 ************************/
const sliderRun = function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const sliderNextBtn = document.querySelector('.slider__btn--right');
  const sliderPrevBtn = document.querySelector('.slider__btn--left');
  let currentSlide = 0;
  const totalSlide = slides.length;
  // slider.style.overflow = 'visible';
  // slider.style.transform = 'scale(0.4) translateX(-800px)';

  // slides.forEach((slide, i) => {
  //   slide.style.transform = `translateX(${100 * i}%)`; //first slide; 0% then 100%, 200%, 300%
  // });
  // const dotsContainer = document.querySelector('.dots');
  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slideNum) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    //select ative slide item
    document
      .querySelector(`.dots__dot[data-slide="${slideNum}"]`)
      .classList.add('dots__dot--active');
  };

  const slideToGo = function (curSlide) {
    //first slide; -100% then 0%, 100%, 200%
    slides.forEach(function (slide, i) {
      slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
  };

  const init = function () {
    slideToGo(0);
    createDots();
    activateDot(0);
  };

  init();

  const nextSlide = function () {
    currentSlide++;
    if (currentSlide == totalSlide) {
      currentSlide = 0;
    }
    slideToGo(currentSlide);
    activateDot(currentSlide);
  };
  const prevSlide = function () {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = totalSlide - 1;
    }
    slideToGo(currentSlide);
    activateDot(currentSlide);
  };

  sliderNextBtn.addEventListener('click', nextSlide);

  sliderPrevBtn.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key == 'ArrowRight') {
      nextSlide();
    } else if (e.key == 'ArrowLeft') {
      prevSlide();
    }
  });

  //dots__dot--active
  //use event delegations
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      slideToGo(slide);
      activateDot(slide);
    }
  });
};

//run main slider
sliderRun();

//Lifecycle(right from the moment page has been accessed until user leaves it) DOM Event

//this event means after all file loaded html, css then if we run code inside this then our code will work fine under this function its similiar to ready function of JQuery
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('Html parsed and DOM tree built', e);
  //need to run all js inside this ready function so that no misbehave
  //we want our code should be executed after the dom loaded
  // no such thing is necessary like domContent loaded in vanila js
});

window.addEventListener('load', function (e) {
  //load event first as soon as all resources like file, css, js, and image loaded
  // when complete page loaded this load event fired
});

// window.addEventListener('beforeunload', function (e) {
//   e.returnValue = '';
//   //this event created immediately before user leave the page like closing the tab from browser
// });
window.addEventListener('beforeunload', function (event) {
  event.returnValue = 'Write something clever here..';
});

//different ways of loadin js file in html

//regular way
//if we use script on HEAD
// parsing HTML -> waiting(fetcing script | execute) _> Finishing parsing HTML
//if we use script on BODY END
// parsing HTML -> fetch script -> Execute
{
  /* <script src="script.js"></script>; */
}

// ASYNC way
// is not gurrented to be executed exact ordered they are declared on the code
//if we use script on HEAD
// parsing HTML -> waiting( execute) -> Finishing parsing HTML
// same time fethcing script ->

{
  /* <script async src="script.js"></script> */
}

// DEFER way
// is gurrented it will maintain the order
//if we use script on HEAD
// parsing HTML |
// Fetch Script at the same time | -> at last execute the script
//This is the ideal one we need to use defer if we want to use scipt under HEAD section of the html

{
  /* <script defer src="script.js"></script> */
}

//never use script tag in the head use always before the body end it will solve performance issue

//NOTE: only modern browser support ASYNC and DEFER old browser ingnore them
// its not a JS feature its HTML5 feature
