import { useRouter } from "expo-router";
import React from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { useAuth0 } from "react-native-auth0";
import CheckoutForm from "../../components/checkout-form.native";

const LogoutButton = () => {
  const { clearCredentials, clearSession, user } = useAuth0();
  const router = useRouter();

  const onPress = async () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          try {
            await clearCredentials();
            router.replace("../signin");
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.logoutButton,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.logoutButtonText}>Log out</Text>
    </Pressable>
  );
};

const Account = () => {
  const { user } = useAuth0();
  console.log("user", user);

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>Account Settings</Text>
      </SafeAreaView>

      <SafeAreaView style={styles.card}>
        <SafeAreaView style={styles.profileSection}>
          <SafeAreaView style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {user?.name?.[0]?.toUpperCase()}
            </Text>
          </SafeAreaView>
          <SafeAreaView style={styles.userInfo}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </SafeAreaView>
        </SafeAreaView>

        <SafeAreaView style={styles.subscriptionCard}>
          <Text style={styles.subscriptionLabel}>Subscription Tier</Text>
          <Text style={styles.subscriptionTier}>
            {user?.subscription_tier || "Free"}
          </Text>
        </SafeAreaView>

        <CheckoutForm />

        <LogoutButton />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
  header: {
    marginBottom: 20,
    marginTop: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#888888",
  },
  subscriptionCard: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    marginTop: 8,
  },
  subscriptionLabel: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 8,
    marginLeft: 8,
  },
  subscriptionTier: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 8,
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
