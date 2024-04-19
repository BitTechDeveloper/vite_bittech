/** @type {import('postcss-load-config').Config} */

module.exports = {
    plugins: {
        "postcss-import": {},
        "tailwindcss/nesting": {},
        tailwindcss: {},
        "postcss-preset-env": {
            features: { "nesting-rules": false },
            stage: 1,
        },
        autoprefixer: {},
    },
};
