import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, SafeAreaView, Alert, Switch, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Предполагаем, что у вас есть этот фоновый рисунок
const backgroundTexture = require('../assets/img/113127efe8d0123d5da9cf4dafb5c278c1b1f0fd.png');
const starIcon = '⭐️';
const starOutlineIcon = '☆';

const SettingsScreenMain = () => {
    const navigation = useNavigation();
    const [rating, setRating] = useState(0);
    const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const storedRating = await AsyncStorage.getItem('appRating');
                if (storedRating !== null) {
                    setRating(JSON.parse(storedRating));
                }

                const storedVibration = await AsyncStorage.getItem('vibrationEnabled');
                if (storedVibration !== null) {
                    setIsVibrationEnabled(JSON.parse(storedVibration));
                }
            } catch (e) {
                console.error("Failed to load settings", e);
            }
        };
        loadSettings();
    }, []);

    const handleRating = async (star) => {
        if (isVibrationEnabled) {
            Vibration.vibrate(100); // Короткая вибрация
        }
        setRating(star);
        try {
            await AsyncStorage.setItem('appRating', JSON.stringify(star));
            Alert.alert("Thank you!", `You rated us ${star} stars.`);
        } catch (e) {
            console.error("Failed to save rating", e);
        }
    };

    const toggleVibration = async () => {
        const newState = !isVibrationEnabled;
        setIsVibrationEnabled(newState);
        try {
            await AsyncStorage.setItem('vibrationEnabled', JSON.stringify(newState));
            if (newState) {
                Vibration.vibrate(200); // Более сильная вибрация при включении
            }
        } catch (e) {
            console.error("Failed to save vibration setting", e);
        }
    };

    const handleClearProgress = async () => {
        Alert.alert(
            "Clear All Progress",
            "Are you sure you want to clear all your workout data and settings? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Clear",
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('activities');
                            await AsyncStorage.removeItem('dailyTaskStatus');
                            await AsyncStorage.removeItem('appRating');
                            await AsyncStorage.removeItem('vibrationEnabled');

                            if (isVibrationEnabled) {
                                Vibration.vibrate([0, 500, 200, 500]); // Длинная вибрация для оповещения
                            }
                            Alert.alert("Success", "All progress has been cleared.");
                            navigation.popToTop();
                        } catch (e) {
                            console.error("Failed to clear progress", e);
                            Alert.alert("Error", "Failed to clear progress. Please try again.");
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const renderStarRating = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => handleRating(i)}>
                    <Text style={styles.starText}>{i <= rating ? starIcon : starOutlineIcon}</Text>
                </TouchableOpacity>
            );
        }
        return stars;
    };

    return (
        <ImageBackground source={backgroundTexture} style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.settingText}>Rate App</Text>
                        <View style={styles.starsWrapper}>
                            {renderStarRating()}
                        </View>
                    </View>

                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Vibration</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isVibrationEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleVibration}
                            value={isVibrationEnabled}
                        />
                    </View>

                    <View style={styles.clearProgressContainer}>
                        <Text style={styles.settingText}>Clear progress</Text>
                        <TouchableOpacity style={styles.clearButton} onPress={handleClearProgress}>
                            <Text style={styles.clearButtonIcon}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    safeArea: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '90%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 20,
        borderWidth: 5,
        borderColor: '#FFD700',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        paddingVertical: 5,
    },
    settingText: {
        fontSize: 22,
        color: '#FFF',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    ratingContainer: {
        marginBottom: 25,
        alignItems: 'center',
    },
    starsWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
    },
    starText: {
        fontSize: 35,
        marginHorizontal: 5,
        color: '#FFD700',
    },
    clearProgressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    clearButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FF4500',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    clearButtonIcon: {
        fontSize: 30,
        lineHeight: 30,
        color: '#FFF',
    },
});

export default SettingsScreenMain;
