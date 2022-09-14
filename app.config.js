
export default {
  "expo": {
    "name": "unreminder",
    "slug": "unreminder",
    "version": "1.1.1",
    "assetBundlePatterns": [
      "**/*"
    ],
    "splash": {
      "backgroundColor": "#000000"
    },
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
