/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    // disable: false,
    disable: process.env.NODE_ENV === "development", // ||
    // process.env.NODE_ENV === "preview" ||
    // process.env.NODE_ENV === "production",
    // delete two lines above to enable PWA in production deployment
    // add your own icons to public/manifest.json
    // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
    dest: "public",
    register: true,
    skipWaiting: true,
    swSrc: "service-worker.js",
    reloadOnOnline: false,
    buildExcludes: [/middleware-manifest.json$/],
  },
  reactStrictMode: true,
  images: {
    domains: ["i.ytimg.com"],
  },
});
