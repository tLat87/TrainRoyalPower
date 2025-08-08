import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from "../screens/CalendarScreen";
import DailyTaskScreen from "../screens/DailyTaskScreen";
import SettingsScreenMain from "../screens/SettingsScreenMain";




const Tab = createBottomTabNavigator();

const ICONS = {
    Home: require('../assets/img/powrr2/Group.png'),
    CalendarScreen: require('../assets/img/powrr2/Vector-2.png'),
    DailyTaskScreen: require('../assets/img/powrr2/Vector.png'),
    SettingsScreenMain: require('../assets/img/powrr2/Vector-1.png'),
};

const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarLabel: '',
    tabBarIcon: () => (
        <Image
            source={ICONS[route.name] || ICONS.Home}
            resizeMode="contain"
        />
    ),
    tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        elevation: 5,
        backgroundColor: '#FEAF12',
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#FF0000',
        width: '90%',
        marginLeft: '5%',
        height: 70,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    headerTitleStyle: {
        color: 'white',
        fontFamily: 'Quantico-BoldItalic',
        fontSize: 40,
    },
});

const MainTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
            <Tab.Screen name="DailyTaskScreen" component={DailyTaskScreen} />
            <Tab.Screen name="SettingsScreenMain" component={SettingsScreenMain} />

        </Tab.Navigator>
    );
};

export default MainTabNavigator;
