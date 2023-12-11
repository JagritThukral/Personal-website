'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const knownURLs = ['home', 'about', 'projects']; // Add your known URLs

// Function to update meta tags
function updateMetaTags(title, description) {
  // Find existing meta elements or create new ones
  let titleElement = document.querySelector('meta[property="og:title"]');
  let descriptionElement = document.querySelector('meta[property="og:description"]');

  // If meta elements don't exist, create them
  if (!titleElement) {
    titleElement = document.createElement('meta');
    titleElement.setAttribute('property', 'og:title');
    document.head.appendChild(titleElement);
  }

  if (!descriptionElement) {
    descriptionElement = document.createElement('meta');
    descriptionElement.setAttribute('property', 'og:description');
    document.head.appendChild(descriptionElement);
  }

  // Update content attribute of meta elements
  titleElement.setAttribute('content', title);
  descriptionElement.setAttribute('content', description);

  // Optionally, update other meta tags as needed
}

// Function to handle navigation
function navigateTo(targetPage) {
  // Check if the targetPage is in the list of known URLs
  if (knownURLs.includes(targetPage)) {
    // Loop through pages to find the matching one
    for (let i = 0; i < pages.length; i++) {
      if (targetPage === pages[i].dataset.page) {
        // Add 'active' class to the selected page
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");

        // Scroll to the top
        window.scrollTo(0, 0);

        // Change the URL using the History API
      //  history.pushState(null, null, `/${targetPage}`);

        // Update meta tags
        updateMetaTags(pages[i].dataset.title, pages[i].dataset.description);
      } else {
        // Remove 'active' class from other pages
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  } else {
    // Redirect to the 404 page
    window.location.href = '/404.html';
  }
}

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();
    navigateTo(targetPage);
  });
}

// Handle initial page load or direct URL access
const path = window.location.pathname;
const targetPage = path.substring(1); // Remove leading '/'
navigateTo(targetPage);
