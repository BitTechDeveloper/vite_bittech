// import { Input } from "postcss";
import "/styles/main.css";
import * as func from "../libjs/functions";

document.addEventListener("DOMContentLoaded", function () {
    // Variables: General
    const steps = func.selectAll(".step");
    const nextBtns = func.selectAll(".next");
    const prevBtns = func.selectAll(".prev");
    const stepLinks = func.selectAll("[data-step]");
    const navBtns = func.selectAll(".nav-btn");
    const toggleInput = func.select("#toggle");
    toggleInput.checked = JSON.parse(localStorage.getItem("toggleInput"));
    // Variables: info Step 1
    const nameInput = func.select("[name='name']");
    nameInput.value = JSON.parse(localStorage.getItem("nameInput"));
    const emailInput = func.select("[name='email']");
    emailInput.value = JSON.parse(localStorage.getItem("emailInput"));
    const phoneInput = func.select("[name='phone']");
    phoneInput.value = JSON.parse(localStorage.getItem("phoneInput"));
    // Variables: Plan Step 2
    const planInputs = [...func.selectAll("input[name='plan']")];
    const planLabels = [...func.selectAll(".plan-label")];
    const planPrices = [...func.selectAll(".plan-price")];
    const monthlyDescription = func.select(".monthly-description");
    const yearlyDescription = func.select(".yearly-description");
    const discounts = [...func.selectAll(".discount")];

    let per = JSON.parse(localStorage.getItem("per")) || "mo";

    // Variables: Add-on Step 3
    const addonInputs = func.selectAll("input[name='add-on']");
    const checkedAddons = [...func.selectAll("[name='add-on']:checked")];

    // Variables: Summary Step 4
    const summaryAddonList = func.select(".summary-addon-list");

    let duration = JSON.parse(localStorage.getItem("duration")) || "monthly";
    let currentStep = JSON.parse(localStorage.getItem("currentStep")) || 0;

    getLocalStorage();

    // Function: Show step
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });
    }

    // Function: Update Nav Buttons
    function updateNavBtns() {
        navBtns.forEach((navBtn, index) => {
            if (index === currentStep) {
                navBtn.classList.add("active");
            } else {
                navBtn.classList.remove("active");
            }
            if (currentStep === steps.length - 1) {
                navBtns[navBtns.length - 1].style.backgroundColor = "hsl(228, 100%, 84%)";
            }
        });
    }

    // Function: Next Step
    function goToNextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
            updateNavBtns();
            localStorage.setItem("currentStep", JSON.stringify(currentStep));
        }
    }

    // Function: Previous Step
    function goToPreviousStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            updateNavBtns();
            localStorage.setItem("currentStep", JSON.stringify(currentStep));
        }
    }

    // Function: Update Plan Step 2
    function updatePlanStep() {
        planInputs.forEach((planInput) => {
            if (planInput.id === "archade") {
                planInput.value = duration === "yearly" ? 90 : 9;
                planInput.nextElementSibling.textContent = `$${planInput.value}/${per}`;
            } else if (planInput.id === "advance") {
                planInput.value = duration === "yearly" ? 120 : 12;
                planInput.nextElementSibling.textContent = `$${planInput.value}/${per}`;
            } else if (planInput.id === "pro") {
                planInput.value = duration === "yearly" ? 150 : 15;
                planInput.nextElementSibling.textContent = `$${planInput.value}/${per}`;
            }
            planInput.addEventListener("click", () => {
                if (planInput.checked) {
                    planInput.parentElement.classList.add("selected-plan");
                } else {
                    planInput.parentElement.classList.remove("selected-plan");
                }
            });
        });

        if (duration === "yearly") {
            monthlyDescription.classList.remove("active");
            yearlyDescription.classList.add("active");
            discounts.forEach((discount) => {
                discount.textContent = "2 months free";
            });
        } else {
            yearlyDescription.classList.remove("active");
            monthlyDescription.classList.add("active");
            discounts.forEach((discount) => {
                discount.textContent = "";
            });
        }
    }

    // Function: Update Addon Step 3
    function updateAddonStep() {
        addonInputs.forEach((addonInput) => {
            if (addonInput.id === "service") {
                addonInput.value = duration === "yearly" ? 10 : 1;
                addonInput.parentElement.lastElementChild.textContent = `$${addonInput.value}/${per}`;
            } else if (addonInput.id === "storage") {
                addonInput.value = duration === "yearly" ? 20 : 2;
                addonInput.parentElement.lastElementChild.textContent = `$${addonInput.value}/${per}`;
            } else if (addonInput.id === "profile") {
                addonInput.value = duration === "yearly" ? 20 : 2;
                addonInput.parentElement.lastElementChild.textContent = `$${addonInput.value}/${per}`;
            }
        });
    }

    // Function: Update Plan Summary Step 4
    function updatePlanSummary() {
        const summaryPlanTitle = func.select(".summary-plan-title");
        const summaryPlanPrice = func.select(".summary-plan-price");
        const summaryPlanChangeLink = func.select(".summary-plan-change-link");

        // Plan Summary
        planInputs.forEach((planInput) => {
            if (planInput.checked) {
                const selectedPlan = planInput.parentElement.parentElement;
                let selectedPlanTitle = selectedPlan.querySelector(".plan-title");
                let selectedPlanPrice = selectedPlan.querySelector(".plan-price");
                summaryPlanTitle.textContent = `${selectedPlanTitle.textContent} (${duration})`;
                summaryPlanPrice.textContent = `${selectedPlanPrice.textContent}`;
            }
        });
        // Plan Change Link
        summaryPlanChangeLink.addEventListener("click", () => {
            currentStep = 1;
            showStep(currentStep);
            localStorage.setItem("currentStep", JSON.stringify(currentStep));
        });
    }

    // Function: Update Addon Summary
    function updateAddonSummary() {
        addonInputs.forEach((addonInput) => {
            const addonLabel = addonInput.parentElement;
            const addonTitle = addonLabel.querySelector(".addon-title");
            const addonPrice = addonLabel.querySelector(".addon-price");

            const li = func.create("li");
            const currentItemId = `${addonInput.id}summary`;
            li.id = currentItemId;
            const currentItem = func.select(`#${currentItemId}`);

            li.classList.add("flex", "item-center", "justify-between");
            li.innerHTML = `
                <span class="text-sm text-gray-700">${addonTitle.textContent}</span>
                <span class="text-sm">${addonPrice.textContent}</span>
            `;

            if (addonInput.checked && !currentItem) {
                summaryAddonList.append(li);
            } else if (!addonInput.checked && currentItem) {
                currentItem.remove();
            }
        });
    }

    // Funtion: Calculate Plan Cost
    function calculatePlanCost() {
        let planCost = 0;
        planInputs.forEach((planInput) => {
            if (planInput.checked && planInput.id === "archade") {
                planCost = duration === "yearly" ? 90 : 9;
            } else if (planInput.checked && planInput.id === "advance") {
                planCost = duration === "yearly" ? 120 : 12;
            } else if (planInput.checked && planInput.id === "pro") {
                planCost = duration === "yearly" ? 150 : 15;
            }
        });
        return planCost;
    }
    let planCost = calculatePlanCost();
    // Function: Calculate Addon Cost
    function calculateAddonCost() {
        let addonsCost = 0;
        addonInputs.forEach((addonInput) => {
            if (addonInput.checked && addonInput.id === "service") {
                let addonCost = duration === "yearly" ? 10 : 1;
                addonsCost += addonCost;
            } else if (addonInput.checked && (addonInput.id === "storage" || addonInput.id === "profile")) {
                let addonCost = duration === "yearly" ? 20 : 2;
                addonsCost += addonCost;
            }
        });
        return addonsCost;
    }
    let addonsCost = calculateAddonCost();

    let totalCost = planCost + addonsCost;

    // Function: Update Total Summary
    function updateTotalSummary() {
        const totalTitle = func.select(".total-title");
        totalTitle.classList.add("text-sm");
        const totalPrice = func.select(".total-price");
        totalPrice.classList.add("text-lg", "font-bold", "text-[hsl(243,_100%,_62%)]");
        totalTitle.textContent = `Total (per ${duration.slice(0, -2)})`;
        totalPrice.textContent = `$${totalCost}/${per}`;
    }

    // function: Validate Form
    function validateForm() {
        if (currentStep === 0 && (nameInput.value === "" || emailInput.value === "" || phoneInput.value === "")) {
            const invalidMessage = func.create("p");
            invalidMessage.classList.add("absolute", "text-red-700", "-top-5", "left-0");
            invalidMessage.id = "invalid-message1";
            const hasInvalidMessage1 = func.select("#invalid-message1");
            invalidMessage.textContent = "All fields are required";
            const showedFormPortion = func.select(`#step1`);
            const inputWrapper = showedFormPortion.querySelector(".input-wrapper");
            if (!hasInvalidMessage1) {
                inputWrapper.append(invalidMessage);
            }
            setTimeout(() => {
                invalidMessage.remove();
            }, 5000);
            return false;
        }
        if (currentStep === 1 && !planInputs[0].checked && !planInputs[1].checked && !planInputs[2].checked) {
            const invalidMessage = func.create("p");
            invalidMessage.classList.add("absolute", "text-red-700", "-top-5", "left-0");
            invalidMessage.id = "invalid-message2";
            const hasInvalidMessage2 = func.select("#invalid-message2");
            invalidMessage.textContent = "You didn't choose any plan";
            const showedFormPortion = func.select(`#step2`);
            const inputWrapper2 = showedFormPortion.querySelector(".input-wrapper");
            if (!hasInvalidMessage2) {
                inputWrapper2.append(invalidMessage);
            }
            setTimeout(() => {
                invalidMessage.remove();
            }, 5000);
            return false;
        }
        return true;
    }

    // Function: Set Local Storage
    function setLocalStorage() {
        if (currentStep === 1) {
            planInputs.forEach((planInput, index) => {
                localStorage.setItem(`planInput${index}`, JSON.stringify(planInput.checked === true ? true : false));
            });
        }
        if (currentStep === 2) {
            addonInputs.forEach((addonInput, index) => {
                localStorage.setItem(`addonInput${index}`, JSON.stringify(addonInput.checked === true ? true : false));
            });
        }
    }

    // Function: Get Local Storage
    function getLocalStorage() {
        planInputs.forEach((planInput, index) => {
            planInput.checked = JSON.parse(localStorage.getItem(`planInput${index}`));
        });
        addonInputs.forEach((addonInput, index) => {
            addonInput.checked = JSON.parse(localStorage.getItem(`addonInput${index}`));
        });
    }

    // Function: initialization
    function initializeForm() {
        showStep(currentStep);
        updateNavBtns();
        updatePlanStep(); // cause problem some time
        updateAddonStep();
        updatePlanSummary();
        updateAddonSummary();

        prevBtns.forEach((prevBtn) => {
            prevBtn.addEventListener("click", goToPreviousStep);
        });

        nextBtns.forEach((nextBtn) => {
            nextBtn.addEventListener("click", () => {
                if (validateForm()) {
                    setLocalStorage();
                    goToNextStep();
                }
            });
        });

        nameInput.addEventListener("keyup", () => {
            localStorage.setItem("nameInput", JSON.stringify(nameInput.value));
        });
        emailInput.addEventListener("keyup", () => {
            localStorage.setItem("emailInput", JSON.stringify(emailInput.value));
        });
        phoneInput.addEventListener("keyup", () => {
            localStorage.setItem("phoneInput", JSON.stringify(phoneInput.value));
        });

        planInputs.forEach((planInput) => {
            planInput.addEventListener("click", () => {
                updatePlanSummary();
                planCost = calculatePlanCost();
                totalCost = planCost + addonsCost;
                updateTotalSummary();
                const parentLabel = planInput.parentElement.parentElement;

                planLabels.forEach((planLabel) => {
                    planLabel.classList.remove("active");
                });

                if (planInput.checked) {
                    parentLabel.classList.add("active");
                }
            });
        });

        addonInputs.forEach((addonInput) => {
            addonInput.addEventListener("click", () => {
                updatePlanSummary();
                updateAddonSummary();
                addonsCost = calculateAddonCost();
                totalCost = planCost + addonsCost;
                updateTotalSummary();
            });
        });

        nextBtns.forEach((nextBtn) => {
            nextBtn.addEventListener("click", () => {
                if (currentStep === 1) {
                    updatePlanStep();
                    updatePlanSummary();
                    updateAddonSummary();
                }
            });
        });

        toggleInput.addEventListener("change", (e) => {
            duration = toggle.checked ? "yearly" : "monthly";
            per = duration === "yearly" ? "yr" : "mo";
            updatePlanStep();
            updateAddonStep();
            updatePlanSummary();
            while (summaryAddonList.firstElementChild) {
                summaryAddonList.removeChild(summaryAddonList.firstElementChild);
            }
            updateAddonSummary();
            planCost = calculatePlanCost();
            addonsCost = calculateAddonCost();
            totalCost = planCost + addonsCost;
            updateTotalSummary();

            localStorage.setItem("duration", JSON.stringify(duration));
            localStorage.setItem("per", JSON.stringify(per));
            localStorage.setItem("toggleInput", JSON.stringify(toggleInput.checked ? true : false));
        });

        if (currentStep === steps.length - 1) {
            localStorage.clear();
        }
    }

    initializeForm();
});
// steps[currentStep].style.display = "flex";

// nextBtns.forEach((nextBtn) => {
//     nextBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         if (currentStep < steps.length - 1) {
//             steps[currentStep].style.display = "none";
//             currentStep++;
//             steps[currentStep].style.display = "flex";
//         }
//     });
// });

// prevBtns.forEach((prevBtn) => {
//     prevBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         if (currentStep > 0) {
//             steps[currentStep].style.display = "none";
//             currentStep--;
//             steps[currentStep].style.display = "flex";
//         }
//     });
// });

// navBtns.forEach((navBtn, index) => {
//     if (index == currentStep) {
//         navBtn.style.backgroundColor = "hsl(228, 100%, 84%)";
//     } else {
//         navBtn.style.backgroundColor = "transparent";
//     }
// });

// stepLinks.forEach((stepLink, index) => {
//     stepLink.addEventListener("click", (e) => {
//         e.preventDefault;
//         steps[currentStep].style.display = "none";
//         currentStep = stepLink.dataset.step;
//         steps[currentStep].style.display = "flex";
//     });
// });

// step 2
