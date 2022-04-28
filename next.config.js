const nextTranslate = require('next-translate');

const nextConfig = {
  reactStrictMode: true,
  env: {
    MAIN_COLOR: process.env.MAIN_COLOR,
    SECOND_COLOR: process.env.SECOND_COLOR,
    THIRD_COLOR: process.env.THIRD_COLOR,
    MAIN_COLOR_DARK: process.env.MAIN_COLOR_DARK,
    SECOND_COLOR_DARK: process.env.SECOND_COLOR_DARK,
    THIRD_COLOR_DARK: process.env.THIRD_COLOR_DARK,
  },
  ...nextTranslate(),
};

module.exports = nextConfig;
