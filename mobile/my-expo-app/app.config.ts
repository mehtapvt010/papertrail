// app.config.ts
import 'dotenv/config';

export default {
  expo: {
    name: 'papertrail-mobile',
    slug: 'papertrail-mobile',
    version: '1.0.0',
    sdkVersion: '53.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    jsEngine: 'jsc',
    assetBundlePatterns: ['**/*'],
    experiments: {
      tsconfigPaths: true,
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    ios: {
      bundleIdentifier: 'com.papertrail.dev',
      supportsTablet: true,
      infoPlist: {
        NSFaceIDUsageDescription: 'We use Face ID to help you securely log in to PaperTrail AI.',
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
        },
        ITSAppUsesNonExemptEncryption: false,
      },
      entitlements: {
        'com.apple.developer.biometric': ['Face ID', 'Touch ID'],
      },
    },
    android: {
      package: 'com.papertrail.dev',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    extra: {
      eas: {
        projectId: '8d33ff88-3b40-49d8-b6d2-d10c4c3ca52b',
      },
      EXPO_PUBLIC_FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      EXPO_PUBLIC_FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      EXPO_PUBLIC_FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    },
    owner: 'mehtapvt010',
  },
};
