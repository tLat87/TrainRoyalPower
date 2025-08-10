// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

// Импортируем Redux store и Provider
import { Provider } from 'react-redux';
import WelcomeScreen from "./src/screens/WellcomeScreen.tsx";
// import DashboardScreen from "./src/screens/DashboardScreen.tsx";
import {persistor, store} from "./src/redux/store";
import {PersistGate} from "redux-persist/integration/react";
import WelcomeScreen2 from "./src/screens/WelcomeScreen2.tsx";
import WelcomeScreen3 from "./src/screens/WelcomeScreen3.tsx";
import WelcomeScreen4 from "./src/screens/WelcomeScreen4.tsx";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import SettingsScreen from "./src/screens/SettingsScreen.tsx";
import TrainingScreen from "./src/screens/TrainingScreen.tsx";
import AddEventScreen from "./src/screens/AddEventScreen.tsx";


const Stack = createStackNavigator();

// Создадим компонент, который будет ждать загрузки персонажа из Redux
function AppContent() {

    // Определяем начальный маршрут на основе загруженного персонажа

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="WelcomeScreen2"
                component={WelcomeScreen2}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="WelcomeScreen3"
                component={WelcomeScreen3}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="WelcomeScreen4"
                component={WelcomeScreen4}
                options={{ headerShown: false }}
            />



            <Stack.Screen
                name="MainTabNavigator"
                component={MainTabNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Training"
                component={TrainingScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="AddEvent"
                component={AddEventScreen}
                options={{ headerShown: false }}
            />

            {/* Добавьте другие экраны здесь */}
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
                <AppContent />
            </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    loadingText: {
        marginTop: 10,
        color: '#FFD700',
        fontSize: 18,
    },
});
