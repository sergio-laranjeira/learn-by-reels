// Dynamic config so the GitHub Pages web build can be exported with a base
// path (the site lives at <user>.github.io/learn-by-reels/, not at the
// domain root) while local dev and native builds stay unprefixed.
const basePath = process.env.GH_PAGES_BASE_PATH;

module.exports = {
  expo: {
    name: 'learn-by-reels',
    slug: 'learn-by-reels',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    ...(basePath ? { experiments: { baseUrl: basePath } } : {}),
  },
};
