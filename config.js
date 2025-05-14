import Constants from "expo-constants";

const ENV = {
  development: {
    apiUrl: "https://api.dev.smartbettor.ai/api",
  },
  staging: {
    apiUrl: "https://api.dev.smartbettor.ai/api",
  },
  production: {
    apiUrl: "https://api.smartbettor.ai/api",
  },
};

const getEnvVars = (env = Constants.expoConfig?.releaseChannel) => {
  // If running in Expo Go, use development
  if (!env || env === "default") return ENV.development;

  // For custom release channels
  if (env.indexOf("prod") !== -1) return ENV.production;
  if (env.indexOf("staging") !== -1) return ENV.staging;

  return ENV.development;
};

export const config = getEnvVars();
//expo publish --release-channel staging
