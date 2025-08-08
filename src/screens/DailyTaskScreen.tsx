import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, SafeAreaView, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Используем тот же фоновый рисунок
const backgroundTexture = require('../assets/img/113127efe8d0123d5da9cf4dafb5c278c1b1f0fd.png');

// Список возможных ежедневных заданий
const dailyTasksList = [
    "Complete 4 working sets in one workout",
    "Set timer: 30 sec work / 15 sec rest",
    "Spend 10 minutes in work sets (total)",
    "Perform 5 sets with a work time of at least 45 seconds",
    "Set 6 sets and complete them all",
    "Perform your first strength workout in the app",
    "Complete a workout with a work time of more than 20 min",
    "Set 8 sets and successfully complete 6+",
    "Change timer settings before workout",
    "Perform 3 strength workouts in a row without skipping",
    "Enable 4 sets with an equal interval of 40s / 20s",
    "Set a record: 60 seconds of work set",
    "Complete the workout without stopping the timer",
    "Change the rest time in settings",
    "Spend 15 min in strength mode per day"
];

const DailyTaskScreen = () => {
    const navigation = useNavigation();
    const [taskCompletedToday, setTaskCompletedToday] = useState(false);
    const [currentDailyTask, setCurrentDailyTask] = useState('');
    const progress = useState(new Animated.Value(0))[0];

    // Функция для получения текущей даты в формате ГГГГ-ММ-ДД
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Загрузка состояния задания при фокусе на экране
    useFocusEffect(
        React.useCallback(() => {
            loadDailyTaskStatus();
        }, [])
    );

    useEffect(() => {
        if (taskCompletedToday) {
            // Анимация заполнения полосы прогресса
            Animated.timing(progress, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }).start();
        } else {
            // Сброс прогресса, если задание не выполнено
            progress.setValue(0);
        }
    }, [taskCompletedToday]);

    const loadDailyTaskStatus = async () => {
        const todayDate = getTodayDate();
        try {
            const storedTaskData = await AsyncStorage.getItem('dailyTaskStatus');
            if (storedTaskData) {
                const parsedData = JSON.parse(storedTaskData);
                if (parsedData.date === todayDate) {
                    setTaskCompletedToday(parsedData.completed);
                    setCurrentDailyTask(parsedData.task);
                } else {
                    // Новый день, сбросить состояние и выбрать новое задание
                    setTaskCompletedToday(false);
                    selectNewDailyTask();
                }
            } else {
                // Данных нет, выбрать новое задание
                selectNewDailyTask();
            }
        } catch (e) {
            console.error('Failed to load daily task status', e);
            // В случае ошибки, выбрать новое задание
            selectNewDailyTask();
        }
    };

    const selectNewDailyTask = async () => {
        const randomIndex = Math.floor(Math.random() * dailyTasksList.length);
        const newTask = dailyTasksList[randomIndex];
        setCurrentDailyTask(newTask);
        // Сохранить новое задание, но пометить его как невыполненное
        const todayDate = getTodayDate();
        const taskDataToSave = {
            date: todayDate,
            task: newTask,
            completed: false
        };
        try {
            await AsyncStorage.setItem('dailyTaskStatus', JSON.stringify(taskDataToSave));
        } catch (e) {
            console.error('Failed to save new daily task', e);
        }
    };

    const handleDone = async () => {
        setTaskCompletedToday(true);
        const todayDate = getTodayDate();
        const taskDataToSave = {
            date: todayDate,
            task: currentDailyTask,
            completed: true
        };
        try {
            await AsyncStorage.setItem('dailyTaskStatus', JSON.stringify(taskDataToSave));
        } catch (e) {
            console.error('Failed to save task completion', e);
        }

        // Можно добавить переход на другой экран, например, Home
        setTimeout(() => {
            navigation.goBack();
        }, 1500);
    };

    const progressWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <ImageBackground source={backgroundTexture} style={styles.background}>
            {/*<LinearGradient*/}
            {/*    colors={['#FF4F00', '#FF8C00', '#FFD700', '#FF4F00']}*/}
            {/*    style={styles.container}*/}
            {/*    start={{ x: 0, y: 0 }}*/}
            {/*    end={{ x: 1, y: 1 }}*/}
            {/*>*/}
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.content}>
                        <View style={styles.taskContainer}>
                            <Text style={styles.title}>Daily task:</Text>
                            {taskCompletedToday ? (
                                <Text style={styles.taskText}>Next task will be tomorrow!</Text>
                            ) : (
                                <Text style={styles.taskText}>{currentDailyTask}</Text>
                            )}

                            <View style={styles.progressBarWrapper}>
                                <Animated.View style={[styles.progressBar, { width: progressWidth }]}>
                                    {taskCompletedToday && (
                                        <LinearGradient
                                            colors={['#FFD700', '#FF8C00']}
                                            style={StyleSheet.absoluteFill}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                        />
                                    )}
                                </Animated.View>
                                {!taskCompletedToday && <View style={styles.lavaBall} />}
                                {taskCompletedToday && ( // Отображаем лавовый шар в конце, если задание выполнено
                                    <View style={[styles.lavaBall, styles.lavaBallEnd]} />
                                )}
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.doneButton} onPress={handleDone} disabled={taskCompletedToday}>
                        <LinearGradient
                            colors={['#FFD700', '#FF8C00']}
                            style={styles.doneButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.doneButtonText}>Done</Text>
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
        backgroundColor: 'rgba(0,0,0,0.4)',
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
    taskContainer: {
        width: '90%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#FFD700',
    },
    title: {
        fontSize: 36,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    taskText: {
        fontSize: 24,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 40,
    },
    progressBarWrapper: {
        width: '90%',
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lavaBall: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'red',
        borderColor: 'orange',
        borderWidth: 2,
    },
    lavaBallEnd: { // Для перемещения шарика в конец при завершении
        left: 'auto',
        right: 0,
    },
    doneButton: {
        width: '80%',
        height: 60,
        alignSelf: 'center',
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginBottom: 100, // Уменьшил отступ, чтобы кнопка не была слишком низко
    },
    doneButtonGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    doneButtonText: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});

export default DailyTaskScreen;
