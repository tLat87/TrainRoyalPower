// src/data/achievements.js

export const achievements = [
    {
        id: 'crown-of-dawn',
        title: 'Crown of Dawn',
        image: require('../assets/img/achievements/crown_of_dawn.png'),
        requiredTasks: 1,
        description: 'You have just started your journey and completed your first task. This crown symbolizes your commitment to the path ahead.',
        quote: 'Every journey begins with a single step. Your crown is the first and most important.',
    },
    {
        id: 'knights-crest',
        title: 'Knight\'s Crest',
        image: require('../assets/img/achievements/knights_crest.png'),
        requiredTasks: 5,
        description: 'You have completed five missions, proving your valor and dedication. This crest is a symbol of your growing strength.',
        quote: 'A true knight does not rest on their laurels, but seeks new challenges.',
    },
    {
        id: 'royal-seal',
        title: 'Royal Seal',
        image: require('../assets/img/achievements/royal_seal.png'),
        requiredTasks: 10,
        description: 'Your deeds have been recognized by the kingdom. The Royal Seal is bestowed upon those who show exceptional resolve.',
        quote: 'The royal seal is a promise of great things yet to come.',
    },
    {
        id: 'dragon-slayer',
        title: 'Dragon Slayer',
        image: require('../assets/img/achievements/dragon_slayer.png'),
        requiredTasks: 20,
        description: 'You have conquered the most difficult challenges. This title is reserved for those who fear nothing.',
        quote: 'Only those who face the dragon become the hero of the story.',
    },
    {
        id: 'king-of-quests',
        title: 'King of Quests',
        image: require('../assets/img/achievements/king_of_quests.png'),
        requiredTasks: 30,
        description: 'You have mastered all challenges and are now the King of your kingdom! The crown is yours.',
        quote: 'A king is not born, but forged through a thousand victories.',
    },
];
