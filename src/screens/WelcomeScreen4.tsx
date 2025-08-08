import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Assuming you have these images in your assets folder
const calendarImage = require('../assets/img/eb8885f01062b7c48fcd3db61c0beedd06963063.png');
// You'd also need a background texture image for the lava effect
const backgroundTexture = require('../assets/img/113127efe8d0123d5da9cf4dafb5c278c1b1f0fd.png');

const WelcomeScreen4 = ({navigation}) => {
    return (
        <LinearGradient
            colors={['#FF4F00', '#FF8C00', '#FFD700', '#FF4F00']} // Simulating the fiery gradient
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            {/* Background texture overlay */}
            <Image
                source={backgroundTexture}
                style={styles.backgroundTexture}
                resizeMode="cover"
            />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <Image
                        source={calendarImage}
                        style={styles.mainImage}
                        resizeMode="contain"
                    />

                    <View style={styles.textContainer}>
                        {/*<Image*/}
                        {/*    source={require('../assets/img/4ea5ed591b6685031ab9e1f22be8de6a789b53c2.png')}*/}
                        {/*    style={{width: '100%', height: 400, position: 'absolute', top: -80 }}*/}
                        {/*    resizeMode='stretch'*/}
                        {/*/>*/}
                        <Text style={styles.mainTitle}>WARNING!!!</Text>
                        <Text style={styles.description}>
                            We are not responsible for possible injuries. For safe training, we recommend that all training sessions be coordinated with a trainer and doctor.
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('MainTabNavigator')}}>
                    <LinearGradient
                        colors={['#FFD700', '#FF8C00']}
                        style={styles.buttonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.buttonText}>Go</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundTexture: {
        ...StyleSheet.absoluteFillObject,
        // opacity: , // Adjust opacity to blend with the gradient
    },
    safeArea: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        padding: 20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainImage: {
        width: '80%',
        height: 'auto',
        aspectRatio: 1, // Keep the aspect ratio of the image
        marginBottom: 40,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    mainTitle: {
        // fontFamily: 'YourCustomFont-Bold', // Use your custom font here
        fontSize: 28,
        color: '#FFFFFF',
        fontFamily: 'Cormorant',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        paddingHorizontal: 100,
        marginBottom: 10,
    },
    description: {
        // fontFamily: 'YourCustomFont-Regular', // Use your custom font here
        fontSize: 26,
        color: '#FFFFFF',
        fontFamily: 'Cormorant',
        textAlign: 'center',
        // paddingHorizontal: 100,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    button: {
        width: '80%',
        height: 60,
        alignSelf: 'center',
        borderRadius: 30, // Make it a pill shape
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFFFFF', // White border around the button
    },
    buttonGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        // fontFamily: 'YourCustomFont-Bold', // Use your custom font here
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});

export default WelcomeScreen4;
