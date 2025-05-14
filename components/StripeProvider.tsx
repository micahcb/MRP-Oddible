import { StripeProvider } from "@stripe/stripe-react-native";
import Constants from "expo-constants";
import * as Linking from "expo-linking";

const merchantId = Constants.expoConfig?.plugins?.find(
  (p) => p[0] === "@stripe/stripe-react-native"
)?.[1].merchantIdentifier;

if (!merchantId) {
  throw new Error("Merchant ID is not set");
}

export default function ExpoStripeProvider(
  props: Omit<
    React.ComponentProps<typeof StripeProvider>,
    "publishableKey" | "merchantIdentifier"
  >
) {
  return (
    <StripeProvider
      publishableKey="pk_test_51Nm0vBHM5Jv8uc5MarlzIYh59q2OatBYSZf2DKwsf0GqvX2XExGupnaVaEjToZIYtSb1X8Hq7Bw7ShaCODmts4Ew00zUScRVpE"
      merchantIdentifier={merchantId}
      urlScheme={Linking.createURL("/")?.split(":")[0]}
      {...props}
    ></StripeProvider>
  );
}
