import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, FlatList, Dimensions, Animated, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8; // Ширина карточки
const SPACING = (width - CARD_WIDTH) / 2; // Отступы

// Массив данных для карточек
const cards = [
    { id: '1', title: 'CARDIO', number: 'VII', image: require('../assets/img/Trai3/image11.png'), colors: ['#FF8C00', '#FF4500'] },
    { id: '2', title: 'Strength', number: 'VIII', image: require('../assets/img/Trai3/image0.png'), colors: ['#00BFFF', '#1E90FF'] },
    { id: '3', title: 'Flexibility', number: 'IX', image: require('../assets/img/Trai3/image12.png'), colors: ['#32CD32', '#008000'] },
];

const HomeScreen = ({navigation}) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

    // Компонент карточки
    const Card = ({ item, index }) => {
        const scale = scrollX.interpolate({
            inputRange: [-1, 0, CARD_WIDTH * index, CARD_WIDTH * (index + 1), CARD_WIDTH * (index + 2)],
            outputRange: [1, 1, 1, 1.2, 1], // Увеличивает центральную карточку
        });

        return (
            <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }]}>
                <TouchableOpacity style={styles.cardContainer} onPress={() => {navigation.navigate('SettingsScreen')}}>

                        <ImageBackground source={item.image} style={styles.cardImage} imageStyle={styles.cardImageInner}>
                            <View style={styles.cardContent}>
                                {/*<Text style={styles.cardTitleTop}>{item.number}</Text>*/}
                                {/*<Text style={styles.cardTitleBottom}>{item.title}</Text>*/}
                            </View>
                        </ImageBackground>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <ImageBackground source={require('../assets/img/113127efe8d0123d5da9cf4dafb5c278c1b1f0fd.png')} style={styles.background}>
            <View style={styles.overlay} />
            <Text style={styles.cardTitleTop}>Tap on Card to start</Text>

            <AnimatedFlatList
                data={cards}
                renderItem={({ item, index }) => <Card item={item} index={index} />}
                keyExtractor={(item) => item.id}
                horizontal
                snapToInterval={CARD_WIDTH}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                contentContainerStyle={styles.flatListContainer}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(0, 0, 0, 0.4)', // Затенение
    },
    flatListContainer: {
        alignItems: 'center',
        paddingHorizontal: SPACING,
    },
    cardWrapper: {
        width: CARD_WIDTH,
        height: 'auto',
        marginHorizontal: 0,
        // marginTop: 50,
    },
    cardContainer: {
        // borderRadius: 20,
        // overflow: 'hidden',
    },
    cardBorder: {
        padding: 10,
        borderRadius: 20,
    },
    cardImage: {
        width: '100%',
        aspectRatio: 0.75, // Соотношение сторон
        justifyContent: 'space-between',
        padding: 20,
        // borderRadius: 15,
    },
    cardImageInner: {
        borderRadius: 15,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitleTop: {
        fontSize: 34,
        position: 'absolute',
        left: '25%',
        width: '50%',
        textAlign: 'center',
        top: 40,
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    cardTitleBottom: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
});

export default HomeScreen;
