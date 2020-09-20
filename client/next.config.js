const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {
  // vi: 'vi',
}

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env: {

  }
}