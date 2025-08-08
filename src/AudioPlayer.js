// src/AudioPlayer.js
import Sound from 'react-native-sound';

// Make sure your audio file is in the right location (e.g., ios/sound/background_music.mp3 or Android/app/src/main/res/raw/background_music.mp3)
const backgroundMusic = new Sound('motivational.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    // loaded successfully
    console.log('sound loaded successfully');
    backgroundMusic.setVolume(0.5); // Установите желаемую громкость
    backgroundMusic.setNumberOfLoops(-1); // Loop indefinitely
});

export const toggleMusicPlayback = (shouldPlay) => {
    if (shouldPlay) {
        backgroundMusic.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    } else {
        backgroundMusic.pause();
    }
};

export const getMusicPlaybackState = () => {
    // В Sound.js нет прямого метода isPlaying(), но можно косвенно отслеживать
    // через состояние или колбэки, но для простоты мы просто управляем play/pause
    // из AsyncStorage.
    console.warn("getMusicPlaybackState is not directly supported by react-native-sound for checking current playing status.");
    return null; // Или реализовать более сложную логику отслеживания
};
