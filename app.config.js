// Dynamic config so the GitHub Pages web build can be exported with a base
// path (the site lives at <user>.github.io/learn-by-reels/, not at the
// domain root) while local dev and native builds stay unprefixed.
const basePath = process.env.GH_PAGES_BASE_PATH;

module.exports = {
  expo: {
    name: 'Learn by Reels',
    slug: 'learn-by-reels',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    scheme: 'learnbyreels',
    ios: {
      bundleIdentifier: 'pt.laranjeira.learnbyreels',
      supportsTablet: true,
    },
    android: {
      package: 'pt.laranjeira.learnbyreels',
      adaptiveIcon: {
        backgroundColor: '#0E0E12',
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      favicon: './assets/favicon.png',
      themeColor: '#0E0E12',
      description:
        'Micro-learning reels for technical leadership — swipe through tips, quotes, and quick checks, and collect every card in a set.',
    },
    ...(basePath ? { experiments: { baseUrl: basePath } } : {}),
  },
};
