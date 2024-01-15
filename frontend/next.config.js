/** @type {import('next').NextConfig} */
const nextConfig = {}

const withSerwist = require("@serwist/next").default({
    swSrc: "app/sw.ts",
    swDest: "public/sw.js",
});

module.exports = withSerwist({
    nextConfig
});