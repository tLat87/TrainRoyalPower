import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, SafeAreaView, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const backgroundTexture = require('../assets/img/113127efe8d0123d5da9cf4dafb5c278c1b1f0fd.png');
const cardioImage = require('../assets/img/Trai3/image12.png');
const meditationImage = require('../assets/img/Trai3/image11.png');
const yogaImage = require('../assets/img/Trai3/image0.png');
const placeholderImage = require('../assets/img/eb8885f01062b7c48fcd3db61c0beedd06963063.png');

const CalendarScreen = () => {
    const navigation = useNavigation();
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [dailyActivities, setDailyActivities] = useState({});

    useFocusEffect(
        React.useCallback(() => {
            loadActivities();
        }, [])
    );

    useEffect(() => {
        const days = Array.from({ length: 31 }, (_, i) => i + 1);
        setDaysInMonth(days);
    }, []);

    const loadActivities = async () => {
        try {
            const storedActivities = await AsyncStorage.getItem('activities');
            if (storedActivities !== null) {
                setDailyActivities(JSON.parse(storedActivities));
            } else {
                setDailyActivities({});
            }
        } catch (e) {
            console.error('Failed to load activities', e);
        }
    };

    const handleDayPress = (day) => {
        setSelectedDay(day);
    };

    const DayButton = ({ day, isSelected }) => (
        <TouchableOpacity
            style={[styles.dayButton, isSelected && styles.selectedDayButton]}
            onPress={() => handleDayPress(day)}
        >
            <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{day}</Text>
        </TouchableOpacity>
    );

    const ActivityCard = ({ item }) => (
        <TouchableOpacity style={styles.activityCard}>
            {/*<LinearGradient*/}
            {/*    colors={item.colors || ['#FFA07A', '#FA8072']}*/}
            {/*    style={styles.activityCardBorder}*/}
            {/*    start={{ x: 0, y: 0 }}*/}
            {/*    end={{ x: 1, y: 1 }}*/}
            {/*>*/}
                <ImageBackground
                    source={placeholderImage}
                    style={styles.activityCardImage}
                    imageStyle={styles.cardImageInner}
                >
                    <View style={styles.activityCardContent}>
                        {/*<Text style={styles.activityCardTitleTop}>{item.number}</Text>*/}
                        <Text style={styles.activityCardTitleBottom}>{item.title}</Text>
                    </View>
                </ImageBackground>
            {/*</LinearGradient>*/}
        </TouchableOpacity>
    );

    const renderContent = () => {
        const activitiesForSelectedDay = dailyActivities[`day_${selectedDay}`] || [];

        if (selectedDay === null) {
            return (
                <View style={styles.noDaySelectedContainer}>
                    <Text style={styles.noDaySelectedText}>Please select a day to view your activities.</Text>
                </View>
            );
        }

        if (activitiesForSelectedDay.length > 0) {
            return (
                <View style={styles.activitiesContainer}>
                    <Text style={styles.activitiesTitle}>Your activities:</Text>
                    <FlatList
                        data={activitiesForSelectedDay}
                        renderItem={({ item }) => <ActivityCard item={item} />}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.activitiesList}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEvent', { selectedDay: selectedDay })}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.noActivitiesContainer}>
                <Text style={styles.noActivitiesText}>You had no activities on this day.</Text>
                <TouchableOpacity style={styles.addButtonNoActivities} onPress={() => navigation.navigate('AddEvent', { selectedDay: selectedDay })}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ImageBackground source={backgroundTexture} style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.calendarGrid}>
                    <FlatList
                        data={daysInMonth}
                        numColumns={7}
                        renderItem={({ item }) => <DayButton day={item} isSelected={item === selectedDay} />}
                        keyExtractor={(item) => item.toString()}
                        scrollEnabled={false}
                    />
                </View>
                {renderContent()}
            </SafeAreaView>
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
    },
    calendarGrid: {
        paddingVertical: 10,
        marginLeft: '7%',
        marginBottom: 20,
    },
    dayButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    addButtonNoActivities: {
        marginTop: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    selectedDayButton: {
        borderColor: '#FFD700',
    },
    dayText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    selectedDayText: {
        color: '#FFD700',
    },
    noDaySelectedContainer: {
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    noDaySelectedText: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    noActivitiesContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FF4F00',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    noActivitiesText: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    activitiesContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    activitiesTitle: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    activitiesList: {
        paddingHorizontal: 10,
    },
    activityCard: {
        marginHorizontal: 10,
    },
    activityCardBorder: {
        padding: 5,
        borderRadius: 15,
    },
    activityCardImage: {
        width: 100,
        height: 150,
        borderRadius: 10,
        justifyContent: 'space-between',
        padding: 10,
    },
    cardImageInner: {
        borderRadius: 10,
    },
    activityCardContent: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    activityCardTitleTop: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    activityCardTitleBottom: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        marginTop: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
    },
});

export default CalendarScreen;
