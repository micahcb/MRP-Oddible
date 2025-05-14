import { Slot } from 'expo-router';
import { Auth0Provider } from 'react-native-auth0';
import StripeProvider from '../components/StripeProvider';

export default function RootLayout() {

    return (
      <Auth0Provider 
        domain="auth.smartbettor.ai" 
        clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID}
      >
        <StripeProvider>
          <Slot />
        </StripeProvider>
      </Auth0Provider>
    );
}