import React, { useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground, SafeAreaView, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Мы используем тот же фон, что и на предыдущих экранах
const backgroundTexture = require('../assets/img/113127efe8d0123d5da9cf4dafb5c278c1b1f0fd.png');

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const SettingsScreen = ({navigation}) => {
    const [workRounds, setWorkRounds] = useState(4);
    const [restRounds, setRestRounds] = useState(3);
    const [workTime, setWorkTime] = useState(240); // 4 минуты = 240 секунд
    const [restTime, setRestTime] = useState(120); // 2 минуты = 120 секунд

    const handleStart = () => {
        // Navigate to the TrainingScreen and pass the selected values as parameters
        navigation.navigate('Training', {
            workRounds: workRounds,
            restRounds: restRounds,
            workTime: workTime,
            restTime: restTime,
        });
    };

    const handleIncrement = (type) => {
        if (type === 'work') {
            setWorkRounds(prev => Math.min(10, prev + 1));
        } else {
            setRestRounds(prev => Math.min(10, prev + 1));
        }
    };

    const handleDecrement = (type) => {
        if (type === 'work') {
            setWorkRounds(prev => Math.max(1, prev - 1));
        } else {
            setRestRounds(prev => Math.max(1, prev - 1));
        }
    };

    return (
        <ImageBackground source={backgroundTexture} style={styles.background}>
            {/*<LinearGradient*/}
            {/*    colors={['#FF4F00', '#FF8C00', '#FFD700']}*/}
            {/*    style={styles.container}*/}
            {/*    start={{ x: 0, y: 0 }}*/}
            {/*    end={{ x: 1, y: 1 }}*/}
            {/*>*/}
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.content}>
                        {/* Блок "Work" */}
                        <View style={styles.optionBlock}>
                            <Text style={styles.optionTitle}>Work</Text>
                            <View style={styles.controlRow}>
                                <View style={styles.buttonGroup}>
                                    <TouchableOpacity style={styles.roundButton} onPress={() => handleIncrement('work')}>
                                        <Text style={styles.buttonText}>+</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.roundsText}>{workRounds}</Text>
                                    <TouchableOpacity style={styles.roundButton} onPress={() => handleDecrement('work')}>
                                        <Text style={styles.buttonText}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.timeDisplay}>
                                    <Text style={styles.timeText}>
                                        <Text style={styles.clockIcon}>🕒</Text> {formatTime(workTime)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Блок "Rest" */}
                        <View style={styles.optionBlock}>
                            <Text style={styles.optionTitle}>Rest</Text>
                            <View style={styles.controlRow}>
                                <View style={styles.buttonGroup}>
                                    <TouchableOpacity style={styles.roundButton} onPress={() => handleIncrement('rest')}>
                                        <Text style={styles.buttonText}>+</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.roundsText}>{restRounds}</Text>
                                    <TouchableOpacity style={styles.roundButton} onPress={() => handleDecrement('rest')}>
                                        <Text style={styles.buttonText}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.timeDisplay}>
                                    <Text style={styles.timeText}>
                                        <Text style={styles.clockIcon}>🕒</Text> {formatTime(restTime)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Кнопка "Start" */}
                    <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                        <LinearGradient
                            colors={['#FFD700', '#FF8C00']}
                            style={styles.startButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.startButtonText}>Start</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </SafeAreaView>
            {/*</LinearGradient>*/}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.4)', // Затемнение фона
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionBlock: {
        width: '90%',
        alignItems: 'center',
        marginBottom: 40,
    },
    optionTitle: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    controlRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#FFD700', // Золотая рамка
        paddingHorizontal: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
    },
    roundsText: {
        fontSize: 24,
        color: '#FFF',
        marginHorizontal: 10,
        fontWeight: 'bold',
    },
    timeDisplay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#FFD700',
    },
    timeText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    clockIcon: {
        fontSize: 18,
    },
    startButton: {
        width: '80%',
        height: 60,
        alignSelf: 'center',
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    startButtonGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startButtonText: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});

export default SettingsScreen;
