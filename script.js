"use strict";

const allSections = document.querySelectorAll("section");
const nav = document.querySelector(".nav");
const hamButton = document.querySelector(".hamburger--button");
const mobileNavLinks = document.querySelector(".mobile--nav--links");
const mobileNavLinkArray = document.querySelectorAll(".mobile--nav--link");
const container = document.querySelector(".container");
const header = document.querySelector(".header");
const navLinks = document.querySelector(".nav--links");
const homeLink = document.querySelectorAll(".active--class");
const navLinkArray = document.querySelectorAll(".nav--link");

const projectTitle = document.querySelectorAll(".projects--title");
const contactInfo = document.querySelector(".my--contact__info");
const navHeight = nav.getBoundingClientRect().height;
// console.log(homeLink);
// home link being red on page start
// homeLink.forEach((el) => {
//   if (!nav.classList.contains("sticky"))
//     // el.style.color = "rgba(203, 54, 75, 1)";
//     el.classList.add("active");
// });

//clicking hamburger button
hamButton.addEventListener(`click`, function () {
  this.classList.toggle("close");
  toggleNav();
});

// closing mobile nav on window resize
window.addEventListener("resize", () => {
  collapseNav();
  // closeBtn();
});

// closing mobile nav on clicking anywhere on body
container.addEventListener("click", function () {
  collapseNav();
  // closeBtn();
  // toggleNav();
});

// closing mobile nav on clicking footer
contactInfo.addEventListener("click", function () {
  collapseNav();
  // toggleNav();
  // closeBtn();
});

//scrolling into view and adding active class nav links
navLinks.addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav--link")) {
    if (!e.target.classList.contains("active"))
      e.target.classList.add("active");
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//scrolling into view and adding active class mobile nav links
mobileNavLinks.addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("mobile--nav--link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// rounded button scrolling
document.querySelectorAll(".rounded--btn").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.closest(".rounded--link").getAttribute("href");
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});

/////////////////
// intersection function
const linkSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry.target);

  const link = entry.target.getAttribute("class");
  // console.log(link);

  if (!entry.isIntersecting) {
    // homeLink.forEach((el) => (el.style.color = "rgba(203, 54, 75, 1)"));
    return;
  }
  navLinkArray.forEach((el) => {
    if (el.getAttribute("href") == `.${link}`) {
      el.classList.add("active");
    } else el.classList.remove("active");
  });
  mobileNavLinkArray.forEach((el) => {
    if (el.getAttribute("href") == `.${link}`) {
      el.classList.add("active");
    } else el.classList.remove("active");
  });

  // observer.observe(entry.target);
};
const sectionObserver = new IntersectionObserver(linkSection, {
  root: null,
  threshold: 0.3,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // console.log("working intersection");
});

//using the observer API to implement sticky header
const stickyNav = function (entries) {
  const [entry] = entries; //or const entry = entries[0]
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const stickyNavOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //margin to insert before header, must be in pixel
};

const headerObserver = new IntersectionObserver(stickyNav, stickyNavOptions);
headerObserver.observe(header);

////////////////////////
///////////functions
// toggle function
const toggleNav = function () {
  mobileNavLinks.classList.toggle("hidden");
  closeBtn();
};

//close nav button
const closeBtn = function () {
  document
    .querySelectorAll(".hamburger--button__bar")
    .forEach((e) => e.classList.toggle("open"));
};

// collpase nav function
const collapseNav = function () {
  hamButton.classList.remove("close");
  mobileNavLinks.classList.add("hidden");
  document
    .querySelectorAll(".hamburger--button__bar")
    .forEach((e) => e.classList.remove("open"));
};
