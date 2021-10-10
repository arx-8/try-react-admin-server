// @ts-check
/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["build"],
  transform: {
    "^.+\\.(js|ts)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-typescript",
        ],
      },
    ],
  },
}

// eslint-disable-next-line no-undef
module.exports = config
