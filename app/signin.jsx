import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth0 } from 'react-native-auth0';
import { useRouter } from 'expo-router';
import colors from './styles/colors';

const SignIn = () => {
    const { authorize, user, isLoading, getCredentials, hasValidCredentials } = useAuth0();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            // Check if this is a new user (no preferences set)
            // For now, we'll assume new users go to onboarding
            // In a real app, you'd check your backend to see if they've completed onboarding
            router.replace('/(app)');
        }
    }, [user, isLoading, router]);

    const onPress = async () => {
        try {
            await authorize({}, { ephemeralSession: true });
            let credentials = await getCredentials();
            // After successful login, redirect to main app
            router.replace('/(app)');
        } catch (e) {
            console.log('Authorization error:', e);
        }
    };

    const onPressSignUp = async () => {
        try {
            console.log('Signing up');
            await authorize({
                additionalParameters: { screen_hint: "signup" }
            }, { ephemeralSession: true });
            // After successful signup, redirect to onboarding
            router.replace('/(onboarding)');
        } catch (e) {
            console.log('Authorization error:', e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text>Loading...</Text>
                </View>
            ) : (
                <>
                    <View style={styles.contentContainer}>
                        <Image 
                            source={require('../assets/images/1.png')} 
                            style={[styles.logo]} 
                        />
                        <Text style={styles.text}>Powerful Bet Discovery.{'\n'}At your fingertips.</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonPrimary} onPress={onPressSignUp}>
                            <Text style={styles.buttonTextPrimary}>Sign up free</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSecondary} onPress={onPress}>
                            <Text style={styles.buttonTextSecondary}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 25,
        marginTop: 10,
        borderWidth: .25,
        borderColor: '#ffffff',
    },
    buttonTextSecondary: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ffffff',
        textAlign: 'center',
    },
    buttonPrimary: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 25,
        marginTop: 10,
    },
    buttonTextPrimary: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})