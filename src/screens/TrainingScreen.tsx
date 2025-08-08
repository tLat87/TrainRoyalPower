import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Animated,
    Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Импортируем библиотеки для анимации частиц (если нужно)
// import ConfettiCannon from 'react-native-confetti-cannon';

const backgroundTexture = require('../assets/img/113127efe8d0123d5da9cf4dafb5c278c1b1f0fd.png');
import Share from 'react-native-share'; // Добавьте этот импорт

const CIRCLE_SIZE = 250;

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const TrainingScreen = ({ route, navigation }) => {
    // Получаем параметры из предыдущего экрана
    const { workRounds, restRounds, workTime, restTime } = route.params || { workRounds: 4, restRounds: 3, workTime: 240, restTime: 120 };

    const [currentRound, setCurrentRound] = useState(1);
    const [isWorking, setIsWorking] = useState(true);
    const [timeLeft, setTimeLeft] = useState(workTime);
    const [isPaused, setIsPaused] = useState(true);
    const [isFinished, setIsFinished] = useState(false);

    const totalWorkTime = useRef(0);
    const totalRestTime = useRef(0);

    const timerRef = useRef(null);
    const progressAnimation = useRef(new Animated.Value(0)).current;

    // Анимация круга
    useEffect(() => {
        if (!isPaused && !isFinished) {
            Animated.timing(progressAnimation, {
                toValue: 1,
                duration: isWorking ? workTime * 1000 : restTime * 1000,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();
        }
    }, [isPaused, isWorking, isFinished]);

    // Логика таймера
    useEffect(() => {
        if (isPaused || isFinished) {
            clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 1) {
                    // Завершение раунда
                    if (isWorking) {
                        totalWorkTime.current += workTime;
                        if (currentRound < workRounds) {
                            setIsWorking(false);
                            return restTime;
                        } else {
                            // Конец тренировки
                            setIsFinished(true);
                            return 0;
                        }
                    } else {
                        totalRestTime.current += restTime;
                        setIsWorking(true);
                        setCurrentRound(prevRound => prevRound + 1);
                        return workTime;
                    }
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [isPaused, isWorking, isFinished, currentRound]);

    const handlePausePlay = () => {
        setIsPaused(!isPaused);
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleShare = async () => {
        try {
            const shareOptions = {
                title: 'Результаты тренировки!',
                message: `Я только что завершил тренировку с приложением Volcano! Мой результат:\n\nОбщее время работы: ${formatTime(totalWorkTime.current)}\nОбщее время отдыха: ${formatTime(totalRestTime.current)}\n\nПрисоединяйся!`,
            };

            await Share.open(shareOptions);
        } catch (error) {
            console.log('Ошибка при попытке поделиться:', error.message);
        }
    };

    const currentStatusText = isWorking ? 'Work' : 'Rest';
    const totalRounds = workRounds;
    const currentRoundText = `${currentStatusText} ${currentRound}/${totalRounds}`;
    const totalTime = isWorking ? workTime : restTime;

    const progress = progressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const progressStyle = {
        height: progress,
        bottom: 0,
        backgroundColor: isWorking ? '#E65100' : '#4CAF50', // Оранжевый для работы, зелёный для отдыха
    };

    // Экран завершения тренировки
    if (isFinished) {
        return (
            <ImageBackground source={backgroundTexture} style={styles.background}>
                {/*<LinearGradient colors={['#FF4F00', '#FF8C00', '#FFD700']} style={styles.container}>*/}
                    {/* Частицы */}
                    {/* <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} /> */}
                    <SafeAreaView style={styles.safeArea}>
                        <View style={styles.header}>
                            <Text style={styles.finishTitle}>Training is over, well done!</Text>
                            {/*<Text style={styles.finishSubtitle}>Here are some quick stats from the training:</Text>*/}
                        </View>
                        <View style={styles.statsContainer}>
                            <View style={styles.statRow}>
                                <Text style={styles.statText}>Total work:</Text>
                                <Text style={styles.statValue}>{formatTime(totalWorkTime.current)}</Text>
                            </View>
                            <View style={styles.statRow}>
                                <Text style={styles.statText}>Total rest:</Text>
                                <Text style={styles.statValue}>{formatTime(totalRestTime.current)}</Text>
                            </View>
                        </View>
                        <View style={styles.footerButtons}>
                            <TouchableOpacity style={styles.footerButton} onPress={handleBack}>
                                <Text style={styles.footerButtonText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.footerButton} onPress={handleShare}>
                                <Text style={styles.footerButtonText}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                {/*</LinearGradient>*/}
            </ImageBackground>
        );
    }

    // Экран тренировки
    return (
        <ImageBackground source={backgroundTexture} style={styles.background}>
            {/*<LinearGradient colors={['#FF4F00', '#FF8C00', '#FFD700']} style={styles.container}>*/}
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleBack}>
                            {/* Иконка назад */}
                        </TouchableOpacity>
                        <Text style={styles.roundText}>{currentRoundText}</Text>
                    </View>
                    <View style={styles.timerContainer}>
                        <View style={styles.outerCircle}>
                            <View style={styles.innerCircle}>
                                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                            </View>
                            <Animated.View style={[styles.progressCircle, progressStyle]} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.actionButton} onPress={handlePausePlay}>
                        <LinearGradient
                            colors={['#FFD700', '#FF8C00']}
                            style={styles.actionButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.actionButtonText}>{isPaused ? 'Go' : 'Pause'}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </SafeAreaView>
            {/*// </LinearGradient>*/}
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
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    roundText: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    timerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerCircle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        borderWidth: 10,
        borderColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    innerCircle: {
        width: CIRCLE_SIZE - 20,
        height: CIRCLE_SIZE - 20,
        borderRadius: (CIRCLE_SIZE - 20) / 2,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressCircle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.5,
    },
    timerText: {
        fontSize: 50,
        color: '#FFF',
        fontWeight: 'bold',
    },
    actionButton: {
        width: '80%',
        height: 60,
        alignSelf: 'center',
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginBottom: 20,
    },
    actionButtonGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
    },
    finishTitle: {
        fontSize: 30,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    finishSubtitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
    },
    statsContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFD700',
        alignSelf: 'center',
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    statText: {
        fontSize: 18,
        color: '#FFF',
    },
    statValue: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    footerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        alignSelf: 'center',
    },
    footerButton: {
        width: '45%',
        height: 50,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    footerButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TrainingScreen;
