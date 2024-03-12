import "/styles/main.css";
import * as f from "../libjs/functions";
console.log("working");

// ------for debugging only -------------
// const header = document.querySelector("header");
// header.style.backgroundColor = "red";
// --------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const body = f.select("body");

    const thumbnails = [...f.selectAll(".thumbnail-img")];
    const largeImages = f.selectAll(".large-img");

    const lightboxOverlay = f.select(".lightbox-overlay");
    const lightboxNextIcon = lightboxOverlay.querySelector(".next");
    const lightboxprevIcon = lightboxOverlay.querySelector(".prev");
    const lightboxCloseIcon = f.select(".lightbox-close-img");

    const cartWrapper = f.select(".cart-wrapper");
    const cartDropdown = f.select(".cart-dropdown");
    const dropdownContent = f.select(".dropdown-content");
    const dropdownContentEmpty = f.select(".dropdown-content-empty");
    const itemDropdownDisplay = f.select(".item-dropdown-display");
    const totalPriceDropdownDisplay = f.select(".total-price-dropdown-display");
    const dropdownDelete = f.select(".dropdown-delete");
    const checkout = f.select(".checkout");

    const plusBtn = f.select(".plus");
    const minusBtn = f.select(".minus");
    const itemAmountDisplay = f.select(".item-amount-display");
    const addToCart = f.select(".add-to-cart");
    const cartBadge = f.select(".cart-badge");

    const largeImageSrcs = [...thumbnails.map((t) => t.src.replace("-thumbnail", ""))];

    const nexts = f.selectAll(".next");
    const prevs = f.selectAll(".prev");

    // hamburger variables
    const hamburgerWrapper = f.select(".hamburger-wrapper");
    const menu = f.select(".menu");
    const mainNav = f.select(".main-nav");

    // hamburger function
    hamburgerWrapper.addEventListener("click", function () {
        mainNav.classList.toggle("active");
        menu.classList.toggle("active");
        hamburgerWrapper.classList.toggle("active");
    });

    // dropdown funcion
    cartWrapper.addEventListener("click", (e) => {
        if (cartDropdown.contains(e.target)) {
            return;
        }
        cartWrapper.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
        if (!cartWrapper.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartWrapper.classList.remove("active");
        }
    });

    // initial indexfor large image
    let largeImageSrcsIndex = 0;
    let totalAmount = JSON.parse(localStorage.getItem("totalAmount")) || 0;
    let totalPrice = cartTotalAmount * 125;

    let cartTotalAmount = JSON.parse(localStorage.getItem("cartTotalAmount")) || 0;
    let cartTotalPrice = JSON.parse(localStorage.getItem("cartTotalPrice")) || 0;

    if (cartTotalAmount === 0) {
        dropdownContent.classList.add("hidden");
        checkout.classList.add("hidden");
        dropdownContentEmpty.classList.remove("hidden");
    }

    itemAmountDisplay.textContent = totalAmount;
    cartBadge.textContent = cartTotalAmount;
    itemDropdownDisplay.textContent = cartTotalAmount;
    totalPriceDropdownDisplay.textContent = `$${cartTotalPrice}`;

    // initial display for large images

    largeImages.forEach((largeImage) => {
        largeImage.src = largeImageSrcs[largeImageSrcsIndex];
    });

    // display lighbox
    largeImages.forEach((largeImage) => {
        largeImage.addEventListener("click", () => {
            lightboxOverlay.classList.add("active");
        });
    });

    // close lightbox
    lightboxCloseIcon.addEventListener("click", () => {
        lightboxOverlay.classList.remove("active");
    });

    // click event for thumbnail to controll large image
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            thumbnails.forEach((t) => t.classList.remove("active"));
            thumbnail.classList.add("active");

            const largeImageSrc = thumbnail.src.replace("-thumbnail", "");
            console.log(largeImageSrc);

            largeImages.forEach((largeImage) => {
                largeImage.src = largeImageSrc;
            });

            largeImageSrcsIndex = index;
        });
    });

    // large image navigation for next
    nexts.forEach((next) => {
        next.addEventListener("click", () => {
            if (largeImageSrcsIndex < largeImageSrcs.length - 1) {
                largeImageSrcsIndex++;
            }
            largeImages.forEach((largeImage) => {
                largeImage.src = largeImageSrcs[largeImageSrcsIndex];
            });

            thumbnails.forEach((thumbnail) => {
                largeImages.forEach((largeImage) => {
                    if (largeImage.src === thumbnail.src.replace("-thumbnail", "")) {
                        thumbnail.classList.add("active");
                    } else {
                        thumbnail.classList.remove("active");
                    }
                });
            });
        });
    });
    // large image navigation for previous
    prevs.forEach((prev) => {
        prev.addEventListener("click", () => {
            if (largeImageSrcsIndex > 0) {
                largeImageSrcsIndex--;
            }
            largeImages.forEach((largeImage) => {
                largeImage.src = largeImageSrcs[largeImageSrcsIndex];
            });

            thumbnails.forEach((thumbnail) => {
                largeImages.forEach((largeImage) => {
                    if (largeImage.src === thumbnail.src.replace("-thumbnail", "")) {
                        thumbnail.classList.add("active");
                    } else {
                        thumbnail.classList.remove("active");
                    }
                });
            });
        });
    });

    // Item amount increament
    plusBtn.addEventListener("click", () => {
        totalAmount++;
        totalPrice = totalAmount * 125;
        itemAmountDisplay.textContent = totalAmount;

        localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    });
    // Item amount decreament
    minusBtn.addEventListener("click", () => {
        if (totalAmount > 0) {
            totalAmount--;
            totalPrice = totalAmount * 125;
            itemAmountDisplay.textContent = totalAmount;

            localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
        }
    });
    // dropdown delete
    dropdownDelete.addEventListener("click", () => {
        cartTotalAmount = 0;
        cartTotalPrice = 0;

        localStorage.setItem("cartTotalAmount", JSON.stringify(cartTotalAmount));
        localStorage.setItem("cartTotalPrice", JSON.stringify(cartTotalPrice));
        cartBadge.textContent = cartTotalAmount;
        dropdownContent.classList.add("hidden");
        checkout.classList.add("hidden");
        dropdownContentEmpty.classList.remove("hidden");

        localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    });

    addToCart.addEventListener("click", () => {
        cartTotalAmount += totalAmount;
        cartTotalPrice += totalPrice;

        totalAmount = 0;
        totalPrice = cartTotalAmount * 125;
        itemAmountDisplay.textContent = totalAmount;

        localStorage.setItem("cartTotalAmount", JSON.stringify(cartTotalAmount));
        localStorage.setItem("cartTotalPrice", JSON.stringify(cartTotalPrice));

        cartBadge.textContent = cartTotalAmount;
        itemDropdownDisplay.textContent = cartTotalAmount;
        totalPriceDropdownDisplay.textContent = `$${cartTotalPrice}`;
        localStorage.setItem("totalAmount", JSON.stringify(totalAmount));

        if (cartTotalAmount > 0) {
            dropdownContent.classList.remove("hidden");
            checkout.classList.remove("hidden");
            dropdownContentEmpty.classList.add("hidden");
        }

        if (cartTotalAmount === 0) {
            dropdownContent.classList.add("hidden");
            checkout.classList.add("hidden");
            dropdownContentEmpty.classList.remove("hidden");
        }
    });
});
