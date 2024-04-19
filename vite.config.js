// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/vite_bittech/",
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                fem_int_bookmark: resolve(__dirname, "views/front_end_mentor/fem-int-bookmark.html"),
                fem_int_ecommerce: resolve(__dirname, "views/front_end_mentor/fem-int-ecommerce.html"),
                fem_int_job_listing: resolve(__dirname, "views/front_end_mentor/fem-int-job-listing.html"),
                fem_int_calculator: resolve(__dirname, "views/front_end_mentor/fem-int-calculator.html"),
                fem_adv_multi_form: resolve(__dirname, "views/front_end_mentor/fem-adv-multi-from.html"),
            },
        },
    },
});
