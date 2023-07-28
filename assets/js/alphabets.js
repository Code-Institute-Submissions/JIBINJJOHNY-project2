/* jshint esversion:8 */
/* global SpeechSynthesisUtterance */
// Selecting necessary elements from the HTML
const letterElement = document.getElementById('letter');
const imageElement = document.getElementById('image');
const wordElement = document.getElementById('word');
const nextButton = document.getElementById('nextButton');

// Speech Synthesis Related Variables
const synth = window.speechSynthesis; //Represents the SpeechSynthesis API object.
let voices = [];
let shuffledAlphabet = [];
let shuffledVoices = [];
let currentIndex = 0;
let isShowingImage = false;

// Event listener for the "DOMContentLoaded" event
document.addEventListener('DOMContentLoaded', (event) => {
    // Fetch the alphabet data from the JSON file and initialize the app
    getVoices();
    fetchAlphabetData();

    // Check if the browser supports the "onvoiceschanged" event
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices;
    }
});

/** 
 * Function to Get Available Speech Synthesis Voices 
 * getVoices function is responsible for retrieving available speech synthesis voices and shuffling them.
 */
function getVoices() {
    voices = synth.getVoices();
    shuffledVoices = [...voices];
    shuffleVoices(shuffledVoices);
}

/** 
 * Function to Shuffle the Array of Voices 
 * shuffleVoices function takes an array as input and shuffles its elements in random order.
 */
function shuffleVoices(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

/**
 * Function to Fetch the Alphabet Data from the JSON File and Group into Sets
 * fetchAlphabetData function is an asynchronous function responsible for fetching the alphabet data from the JSON file and initializing the app with the data.
 */
async function fetchAlphabetData() {
    try {
        const response = await fetch('assets/js/alphabets.json');
        if (!response.ok) {
            throw new Error('Failed to fetch alphabet data');
        }
        const data = await response.json();

        // Group the alphabet data into sets of 26 letters
        const alphabetSets = [];
        for (let i = 0; i < data.length; i += 26) {
            alphabetSets.push(data.slice(i, i + 26));
        }

        // Shuffle each set of 26 letters
        alphabetSets.forEach((set) => {
            shuffleAlphabet(set);
        });

        // Flatten the shuffled alphabet sets into the shuffledAlphabet array
        shuffledAlphabet = alphabetSets.flat();
        currentIndex = 0;
        isShowingImage = false;
        displayCurrentLetter();
    } catch (error) {
        console.error(error);
    }
}

/**
 * Function to Shuffle the Sounds for Each Card
 * shuffleSounds function is responsible for shuffling the available speech synthesis voices for each card.
 */
function shuffleSounds() {
    const tempVoices = [...voices];
    shuffledVoices = [];
    while (tempVoices.length > 0) {
        const index = Math.floor(Math.random() * tempVoices.length);
        shuffledVoices.push(tempVoices.splice(index, 1)[0]);
    }
}

/**
 * Function to Get the British English Voice (Fallback)
 * getBritishEnglishVoice function is a utility function that aims to get the British English voice from the available speech synthesis voices, or return the first voice in the list as a fallback.
 */
function getBritishEnglishVoice() {
    const britishEnglishVoice = voices.find((voice) => voice.lang === 'en-GB');
    return britishEnglishVoice || voices[0];
}

/**
 * Function to Speak the Current Word Using Speech Synthesis
 * speakWord function is responsible for speaking the current word associated with the displayed letter using speech synthesis.
 */
/* unused: false */
function speakWord() {
    const currentLetter = shuffledAlphabet[currentIndex];
    const wordToSpeak = currentLetter.word;
    const speakText = new SpeechSynthesisUtterance(wordToSpeak);
    speakText.voice = getBritishEnglishVoice();

    // Speak the word
    synth.speak(speakText);
}

/**
 * Function to Display the Current Letter, Image, and Word
 * displayCurrentLetter function is responsible for updating the display to show the current letter, image, and word associated with the letter.
 */
function displayCurrentLetter() {
    const currentLetter = shuffledAlphabet[currentIndex];
    letterElement.textContent = currentLetter.letter;
    imageElement.src = currentLetter.image;
    imageElement.alt = currentLetter.imageAlt;
    wordElement.textContent = currentLetter.word;
    shuffleSounds();
}

/**
 * Function to Move to the Next Letter
 * nextLetter function is responsible for moving to the next letter and updating the display accordingly.
 */
function nextLetter() {
    // If all alphabets have been shown, shuffle the remaining letters for the next round
    if (currentIndex === shuffledAlphabet.length - 1) {
        shuffleAlphabet(shuffledAlphabet);
    }
    currentIndex = (currentIndex + 1) % shuffledAlphabet.length;
    isShowingImage = false;
    displayCurrentLetter();
}

/**
 * Function to Shuffle the Alphabet Array
 * shuffleAlphabet function is similar to the shuffleVoices function earlier in the code. It is responsible for shuffling the order of elements in the shuffledAlphabet array.
 */
function shuffleAlphabet(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Event listener for the "Next" button
nextButton.addEventListener('click', nextLetter);