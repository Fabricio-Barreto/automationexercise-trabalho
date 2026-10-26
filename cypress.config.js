const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    LOGIN_EMAIL: process.env.LOGIN_EMAIL || "",
    LOGIN_PASSWORD: process.env.LOGIN_PASSWORD || "",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
