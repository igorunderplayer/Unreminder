
export default {
  "expo": {
    "name": "unreminder",
    "slug": "unreminder",
    "version": "1.0.1",
    "assetBundlePatterns": [
      "**/*"
    ],
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.unreminder"
    },
    "ios": {
      "googleServicesFile": "./google-services.json"
    },
    "plugins": [
      "@react-native-google-signin/google-signin"
    ],
  }
}
