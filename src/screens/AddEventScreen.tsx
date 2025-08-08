import React, { useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground, SafeAreaView, TextInput, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const backgroundTexture = require('../assets/img/113127efe8d0123d5da9cf4dafb5c278c1b1f0fd.png');

const AddEventScreen = ({ route }) => {
    const navigation = useNavigation();
    const { selectedDay } = route.params;

    const [eventName, setEventName] = useState('');
    const [durationMinutes, setDurationMinutes] = useState('20');
    const [durationSeconds, setDurationSeconds] = useState('00');

    const handleSaveEvent = async () => {
        if (!eventName || !durationMinutes) {
            Alert.alert('Please enter an event name and duration.');
            return;
        }

        const newActivity = {
            id: Date.now().toString(),
            title: eventName,
            duration: `${durationMinutes}:${durationSeconds}`,
            number: 'XX',
            image: require('../assets/img/4539158470d59c9662bc64f5b6801e6fecd34c84.png'),
            colors: ['#FFA07A', '#FA8072'],
        };

        try {
            const storedActivities = await AsyncStorage.getItem('activities');
            let allActivities = storedActivities ? JSON.parse(storedActivities) : {};

            const dayKey = `day_${selectedDay}`;
            if (!allActivities[dayKey]) {
                allActivities[dayKey] = [];
            }
            allActivities[dayKey].push(newActivity);

            await AsyncStorage.setItem('activities', JSON.stringify(allActivities));
            alert('Event saved successfully!');
            navigation.goBack(); 
        } catch (e) {
            console.error('Failed to save event', e);
            alert('Failed to save event.');
        }
    };

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
                        <Text style={styles.title}>Add new activity for day {selectedDay}</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Activity Name:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={eventName}
                                onChangeText={setEventName}
                                placeholder="e.g., Running, Yoga, Reading"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Duration:</Text>
                            <View style={styles.durationInputContainer}>
                                <TextInput
                                    style={[styles.timeInput, { marginRight: 10 }]}
                                    value={durationMinutes}
                                    onChangeText={setDurationMinutes}
                                    keyboardType="numeric"
                                    maxLength={2}
                                />
                                <Text style={styles.timeSeparator}>:</Text>
                                <TextInput
                                    style={[styles.timeInput, { marginLeft: 10 }]}
                                    value={durationSeconds}
                                    onChangeText={setDurationSeconds}
                                    keyboardType="numeric"
                                    maxLength={2}
                                />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveEvent}>
                        <LinearGradient
                            colors={['#FFD700', '#FF8C00']}
                            style={styles.saveButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.saveButtonText}>Save Event</Text>
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    inputGroup: {
        width: '90%',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textInput: {
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#FFD700',
    },
    durationInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeInput: {
        width: 60,
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 18,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#FFD700',
    },
    timeSeparator: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
    },
    saveButton: {
        width: '80%',
        height: 60,
        alignSelf: 'center',
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginBottom: 20,
    },
    saveButtonGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});

export default AddEventScreen;
