const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
    publicRuntimeConfig: {
        // Will only be available on the server side
        API_BASE_URL: process.env.API_BASE_URL,
        IMAGE_SRC: process.env.IMAGE_SRC,
        BACKEND_API: process.env.BACKEND_API
    },
});