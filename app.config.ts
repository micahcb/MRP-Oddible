import { ConfigContext, ExpoConfig } from "expo/config";

const EAS_PROJECT_ID = "780bf203-26f9-4b1f-9ca2-2c796865c6b1";

const PROJECT_SLUG = "oddible-copy";

const OWNER = "oddible-copy";

const ICON = "./assets/icon.png";
const ADAPTIVE_ICON = "./assets/adaptive-icon.png";

const APP_NAME = "Oddible";
const BUNDLE_IDENTIFIER = "com.oddible.oddible";
const PACKAGE_NAME = "com.oddible.oddible";
const SCHEME = "oddible";

export default ({ config }: ConfigContext): ExpoConfig => {
    console.log("⚙️ Building app for environment:", process.env.APP_ENV);
    const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
      getDynamicAppConfig(
        (process.env.APP_ENV as "development" | "preview" | "production") ||
          "development"
      );
  
    return {
      ...config,
      name: name,
      version: '1.0.0', // Automatically bump your project version with `npm version patch` (1.0.0 -> 1.0.1), `npm version minor` (1.0.0 -> 1.1.0) or `npm version major` (1.0.0 -> 2.0.0).
      slug: PROJECT_SLUG, // Must be consistent acrossl all environments.
      orientation: "portrait",
      userInterfaceStyle: "automatic",
      icon: icon,
      scheme: scheme,
      splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#000000",
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: bundleIdentifier,
        infoPlist: {
          "ITSAppUsesNonExemptEncryption": false,
        },
      },
      android: {
        adaptiveIcon: {
          foregroundImage: adaptiveIcon,
          backgroundColor: "#ffffff",
        },
        package: packageName,
      },
      updates: {
        url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
      },
      runtimeVersion: {
        policy: "appVersion",
      },
      sdkVersion: "52.0.0",
      extra: {
        router: {
          origin: "https://oddible.ai",
        },
        eas: {
          projectId: EAS_PROJECT_ID,
        },
      },
      web: {
        bundler: "metro",
        output: "server",
        favicon: "./assets/favicon.png",
      },
      plugins: [
        [
          "expo-router",
          {
            "origin": "https://oddible.ai"
          }
        ],
        [
          "expo-location",
          {
            "locationAlwaysAndWhenInUsePermission": "Allow this app to use your location."
          }
        ],
        [
          "react-native-auth0",
          {
            "domain": "dev-su0n4jpdks2kcbvp.us.auth0.com"
          }
        ],
        [
          "@stripe/stripe-react-native",
          {
            "merchantIdentifier": "merchant.com.oddible.oddible",
            "publishableKey": "pk_test_51Nm0vBHM5Jv8uc5MarlzIYh59q2OatBYSZf2DKwsf0GqvX2XExGupnaVaEjToZIYtSb1X8Hq7Bw7ShaCODmts4Ew00zUScRVpE"
          }
        ]
      ],
      experiments: {
        typedRoutes: true,
      },
      owner: OWNER,
    };
  };
  
  // Dynamically configure the app based on the environment.
  // Update these placeholders with your actual values.
  export const getDynamicAppConfig = (
    environment: "development" | "preview" | "production"
  ) => {
    if (environment === "production") {
      return {
        name: APP_NAME,
        bundleIdentifier: BUNDLE_IDENTIFIER,
        packageName: PACKAGE_NAME,
        icon: ICON,
        adaptiveIcon: ADAPTIVE_ICON,
        scheme: SCHEME,
      };
    }
  
    if (environment === "preview") {
      return {
        name: `${APP_NAME} Preview`,
        bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
        packageName: `${PACKAGE_NAME}.preview`,
        icon: ICON,
        adaptiveIcon: ADAPTIVE_ICON,
        scheme: `${SCHEME}-prev`,
      };
    }
  
    return {
      name: `${APP_NAME} Development`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
      packageName: `${PACKAGE_NAME}.dev`,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: `${SCHEME}-dev`,
    };
  };