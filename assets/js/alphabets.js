// Selecting necessary elements from the HTML
const card = document.querySelector('.card');
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');
const letterElement = document.getElementById('letter');
const imageElement = document.getElementById('image');
const wordElement = document.getElementById('word');
const nextButton = document.getElementById('nextButton');
const speakButton = document.getElementById('speakButton');

// Speech Synthesis Related Variables
const synth = window.speechSynthesis;
let voices = [];
let shuffledAlphabet = [];
let shuffledVoices = [];
let shuffledIndexes = []; // Array to store shuffled indexes of the alphabet data
let currentIndex = 0;
let progress = 0; // Variable to track the progress through the JSON data
let lastLetterIndex = 0; // Variable to store the index of the last letter shown in the previous round
let isShowingImage = false;

// Function to Get Available Speech Synthesis Voices
function getVoices() {
    voices = synth.getVoices();
    shuffledVoices = [...voices];
    shuffleVoices(shuffledVoices);
}

// Function to Shuffle the Array of Voices
function shuffleVoices(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Get Available Voices and Set the onvoiceschanged Event
getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Function to Fetch the Alphabet Data from the JSON File
async function fetchAlphabetData() {
    try {
        const response = await fetch('assets/js/alphabets.json');
        if (!response.ok) {
            throw new Error('Failed to fetch alphabet data');
        }
        const data = await response.json();
        shuffledAlphabet = [...data];
        initializeNewRound();
    } catch (error) {
        console.error(error);
    }
}

// Function to Initialize the App for a New Round
function initializeNewRound() {
    shuffledIndexes = shuffleArray([...Array(shuffledAlphabet.length).keys()]);
    currentIndex = 0;
    isShowingImage = false;
    lastLetterIndex = 0; // Reset lastLetterIndex for a new round
    displayCurrentLetter();
}

// Function to Shuffle the Entire Alphabet Data (Letters, Words, and Images)
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Function to Move to the Next Letter
function nextLetter() {
    currentIndex++;
    if (currentIndex === shuffledIndexes.length) {
        // All letters have been shown, start a new round
        lastLetterIndex = shuffledIndexes[shuffledIndexes.length - 1];
        initializeNewRound();
    } else {
        isShowingImage = false;
        displayCurrentLetter();
    }
}

// Function to Display the Current Letter, Image, and Word
function displayCurrentLetter() {
    const currentLetter = shuffledAlphabet[shuffledIndexes[currentIndex]];
    letterElement.textContent = currentLetter.letter;
    imageElement.src = currentLetter.image;
    imageElement.alt = currentLetter.imageAlt;
    wordElement.textContent = currentLetter.word;
    shuffleSounds();
}

// Function to Shuffle the Sounds for Each Card
function shuffleSounds() {
    const tempVoices = [...voices];
    shuffledVoices = [];
    while (tempVoices.length > 0) {
        const index = Math.floor(Math.random() * tempVoices.length);
        shuffledVoices.push(tempVoices.splice(index, 1)[0]);
    }
}

// Function to Get the British English Voice (Fallback)
function getBritishEnglishVoice() {
    const britishEnglishVoice = voices.find((voice) => voice.lang === 'en-GB');
    return britishEnglishVoice || voices[0];
}

// Function to Speak the Current Word Using Speech Synthesis
function speakWord() {
    const currentLetter = shuffledAlphabet[shuffledIndexes[currentIndex]];
    const wordToSpeak = currentLetter.word;

    const speakText = new SpeechSynthesisUtterance(wordToSpeak);
    speakText.voice = getBritishEnglishVoice();

    // Speak the word
    synth.speak(speakText);
}

// Function to flip the card
function flipCard(event) {
    if (!isShowingImage && event.target !== speakButton) {
        cardFront.style.transform = 'rotateY(180deg)';
        cardBack.style.transform = 'rotateY(0deg)';
        isShowingImage = true;
        card.classList.add('flipped');
        nextButton.style.display = 'none';
    } else {
        cardFront.style.transform = 'rotateY(0deg)';
        cardBack.style.transform = 'rotateY(180deg)';
        isShowingImage = false;
        card.classList.remove('flipped');
        nextButton.style.display = 'block';
    }
}

// Event listener for "Next" button click
nextButton.addEventListener('click', nextLetter);

// Event listener for card click to flip the card
card.addEventListener('click', flipCard);

// Fetch the alphabet data from the JSON file and initialize the app
fetchAlphabetData();