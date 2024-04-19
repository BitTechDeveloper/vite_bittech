import "/styles/main.css";
import * as reg from "../libjs/regex";

// hamburger
const hamburgerWrapper = document.querySelector(".hamburger-wrapper");
const menu = document.querySelector(".menu");
const mainNav = document.querySelector(".main-nav");

hamburgerWrapper.addEventListener("click", function () {
    mainNav.classList.toggle("active");
    menu.classList.toggle("active");
    hamburgerWrapper.classList.toggle("active");
});

// Features
const tabButtons = document.querySelectorAll(".tab-button");
const tabCards = document.querySelectorAll(".tab-card");

tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        let target = button.getAttribute("data-tab-card");

        tabCards.forEach(function (card) {
            if (card.id === target) {
                card.classList.add("active");
            } else {
                card.classList.remove("active");
            }
        });

        tabButtons.forEach(function (btn) {
            if (btn === button) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    });
});

// Accordian
const accordianHeaders = document.querySelectorAll(".accordian-header");
const accordianContents = document.querySelectorAll(".accordian-content");

accordianHeaders.forEach((header) => {
    header.addEventListener("click", () => {
        let target = header.getAttribute("data-ac");

        accordianContents.forEach((content) => {
            if (content.id === target) {
                content.classList.toggle("active");
            } else {
                content.classList.remove("active");
            }
        });

        accordianHeaders.forEach((hdr) => {
            if (hdr === header) {
                hdr.classList.toggle("active");
            } else {
                hdr.classList.remove("active");
            }
        });
    });
});

//  Stats Email validation and form submission
const form = document.querySelector("form");
const emailInput = document.querySelector('input[type="email"]');
const errorMessage = document.createElement("p");
errorMessage.textContent = "Whoops. Make sure it's a valid email.";
errorMessage.classList.add(
    "invalid",
    "absolute",
    "top-10",
    "left-0",
    "text-red",
    "text-white",
    "bg-[--secondary-color]",
    "sm:w-80",
    "w-[100%]",
    "p-1"
);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (!reg.emailPtrn.test(email)) {
        emailInput.setAttribute("data-form-validate", "invalid");
        emailInput.insertAdjacentElement("afterend", errorMessage);
    } else {
        emailInput.setAttribute("data-form-validate", "valid");
        errorMessage.remove();
    }
});
