import "/styles/main.css";
import * as f from "../libjs/functions";
import jsonData from "../data/fem-int-job-listing.json";
import "/images/front_end_mentor/fem-int-job-listing/account.svg";
import "/images/front_end_mentor/fem-int-job-listing/faceit.svg";
import "/images/front_end_mentor/fem-int-job-listing/eyecam-co.svg";
import "/images/front_end_mentor/fem-int-job-listing/insure.svg";
import "/images/front_end_mentor/fem-int-job-listing/loop-studios.svg";
import "/images/front_end_mentor/fem-int-job-listing/manage.svg";
import "/images/front_end_mentor/fem-int-job-listing/myhome.svg";
import "/images/front_end_mentor/fem-int-job-listing/photosnap.svg";
import "/images/front_end_mentor/fem-int-job-listing/shortly.svg";
import "/images/front_end_mentor/fem-int-job-listing/the-air-filter-company.svg";
import "/images/front_end_mentor/fem-int-job-listing/icon-remove.svg";

document.addEventListener("DOMContentLoaded", function () {
    const jobListContainer = f.select(".job-list-container");
    jsonData.forEach((item) => {
        const div = f.create("div");
        div.classList.add(
            "job-list",
            "mx-auto",
            "bg-white",
            "c-shadow",
            "flex",
            "flex-col",
            "sm:flex-row",
            "item-center",
            "justify-between",
            "relative",
            "mb-8",
            "p-4",
            `${item.featured ? "featured" : "non-featured"}`
        );

        const dataValues = `${item.role} ${item.level} ${item.languages.join(" ")} ${item.tools.join(" ")}`;
        div.setAttribute("data-categories", dataValues);

        div.innerHTML = `
            <span class="absolute -top-4 opacity-0">${item.id}</span>
             
            <div class="flex items-center justify-start -translate-y-1/2 sm:translate-y-0"><img src="${item.logo}" /></div>

            <div class="ml-4 mr-auto font-bold text-left my-2">
                <div class="flex flex-nowrap items-center justify-start gap-1">
                    <span class="text-[hsl(180,_8%,_52%)]">${item.company}</span>
                    <span class="bg-[hsl(180,_8%,_52%)] ${item.featured ? "" : "hidden"} py-1 px-2 rounded-xl text-white text-sm">${
            item.new ? "NEW!" : ""
        }</span>

                    <span class="bg-[hsl(180,_14%,_20%)] ${item.featured ? "" : "hidden"} py-1 px-2 rounded-xl text-white text-sm">${
            item.featured ? "FEATURED" : ""
        }</span>

                </div>
                <div class="text-[hsl(180,_8%,_52%)] text-xl">${item.position}</div>
                <div class="text-gray-500 text-sm font-medium">
                <span class="mr-1">${item.postedAt}</span>
                <span class="mr-1">.</span>
                <span class="mr-1">${item.contract}</span>
                <span class="mr-1">.</span>
                <span class="mr-1">${item.location}</span>
                </div>
            </div>

            <div class="h-line sm:hidden my-4"></div>
            
            <div class="flex items-center justify-start flex-wrap font-semibold">

                <span class="filter-item bg-[hsl(180,_52%,_96%)] hover:bg-[hsl(180,_8%,_52%)] mr-2 text-[hsl(180,_8%,_52%)]  cursor-pointer hover:text-white p-2 rounded">${
                    item.role
                }</span>

                <span class="filter-item bg-[hsl(180,_52%,_96%)] hover:bg-[hsl(180,_8%,_52%)] mr-2 text-[hsl(180,_8%,_52%)]  cursor-pointer hover:text-white p-2 rounded">${
                    item.level
                }</span>

                ${item.languages
                    .map(
                        (language) =>
                            `<span class="filter-item bg-[hsl(180,_52%,_96%)] hover:bg-[hsl(180,_8%,_52%)] text-[hsl(180,_8%,_52%)]  cursor-pointer hover:text-white rounded p-2 mx-2">${language}</span>`
                    )
                    .join(" ")}

                ${item.tools
                    .map(
                        (tool) =>
                            `<span class="filter-item bg-[hsl(180,_52%,_96%)] hover:bg-[hsl(180,_8%,_52%)] text-[hsl(180,_8%,_52%)]  cursor-pointer hover:text-white rounded p-2 mx-2">${tool}</span>`
                    )
                    .join(" ")}                
            </div>
        `;
        jobListContainer.appendChild(div);
    });

    // filter functionality
    const filterBox = f.select(".filter-box");
    const filterItems = f.selectAll(".filter-item");
    const clearFilter = f.select(".clear-filter");
    const jobLists = f.selectAll(".job-list");

    // Event listener to clear whole filter box and show all job lists
    clearFilter.addEventListener("click", () => {
        filterBox.innerHTML = `<span class="clear-filter absolute right-4 top-[40%] font-semibold text-gray-500">Clear</span>`;
        showAllJobLists();
    });

    // Event listener to add filter-item in filter box and filter the job lists
    filterItems.forEach((item) => {
        item.addEventListener("click", () => {
            // clone the filter item to filter box
            const filterItemClone = item.cloneNode(true);
            const filterItemClearBtn = f.create("span");
            filterItemClearBtn.innerHTML = `<img class="inline ml-1 filter-cross" src="/images/front_end_mentor/fem-int-job-listing/icon-remove.svg" />`;
            filterItemClone.appendChild(filterItemClearBtn);
            filterBox.appendChild(filterItemClone);

            // show only job lists with selected categories
            const selectedCategories = getSelectedCategories();
            filterJobLists(selectedCategories);

            // Event listener for clearing individual filter item
            filterItemClearBtn.addEventListener("click", () => {
                filterBox.removeChild(filterItemClone);
                selectedCategories.splice(selectedCategories.indexOf(item.textContent), 1);
                filterJobLists(selectedCategories);
            });
        });
    });

    // Function to show all job lists
    function showAllJobLists() {
        jobLists.forEach((jobList) => {
            jobList.classList.remove("hidden");
        });
    }

    // Function to filter job list based on selected categories
    function filterJobLists(categories) {
        jobLists.forEach((jobList) => {
            const jobListCategories = jobList.getAttribute("data-categories").split(" ");
            if (categories.every((category) => jobListCategories.includes(category))) {
                jobList.classList.remove("hidden");
            } else {
                jobList.classList.add("hidden");
            }
        });
    }

    // Function to get selected categories from filter box
    function getSelectedCategories() {
        const filterBoxItems = filterBox.querySelectorAll(".filter-item");
        return Array.from(filterBoxItems).map((item) => item.textContent);
    }
});
