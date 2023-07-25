// Selecting necessary elements from the HTML
const card = document.querySelector('.card');
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');
const letterElement = document.getElementById('letter');
const imageElement = document.getElementById('image');
const wordElement = document.getElementById('word');
const backButton = document.getElementById('backButton');
const nextButton = document.getElementById('nextButton');
const speakButton = document.getElementById('speakButton');
/** Speech Synthesis Related Variables
 * The code defines various variables related to speech synthesis using the Web Speech API.
 * synth is the speech synthesis object obtained from window.speechSynthesis.
 */
const synth = window.speechSynthesis;
let voices = []; //voices is an array to store available speech synthesis voices
let shuffledAlphabet = []; //shuffledAlphabet is an array to store the shuffled alphabet data fetched from the JSON file.
let shuffledVoices = []; //shuffledVoices is an array to store the shuffled available speech synthesis voices.
let currentIndex = 0; //currentIndex keeps track of the current letter index in the shuffled alphabet array.

let isShowingImage = false; //isShowingImage is a flag to track whether the card is currently showing the image side or the word side
/** Function to Get Available Speech Synthesis Voices
 * The getVoices function populates the voices array with available speech synthesis voices and shuffles them using shuffleVoices.
 */
function getVoices() {
    voices = synth.getVoices();
    shuffledVoices = [...voices];
    shuffleVoices(shuffledVoices);
}
/** Function to Shuffle the Array of Voices
 * The shuffleVoices function takes an array arr and shuffles it using the Fisher-Yates algorithm to randomize the order.
 */
function shuffleVoices(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
/** Get Available Voices and Set the onvoiceschanged Event
 * The code calls getVoices to populate the voices array with available voices.
 * If synth.onvoiceschanged is supported, it sets the onvoiceschanged event to call getVoices whenever the list of voices changes.
 */
getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

/** Function to Fetch the Alphabet Data from the JSON File
 * The fetchAlphabetData function is an asynchronous function that fetches the alphabet data from the alphabets.json file.
 * It uses await and fetch to get the data and then parses the response using response.json().
 */
async function fetchAlphabetData() {
    try {
        const response = await fetch('assets/js/alphabets.json');
        if (!response.ok) {
            throw new Error('Failed to fetch alphabet data');
        }
        const data = await response.json();
        shuffledAlphabet = [...data];
        // Shuffle the alphabet on page load
        shuffleAlphabet(shuffledAlphabet); // The fetched data is stored in the shuffledAlphabet array.
        // Initialize the app with the first letterby calling displayCurrentLetter.
        currentIndex = 0;
        isShowingImage = false;
        displayCurrentLetter();
    } catch (error) {
        console.error(error);
    }
}
/** Function to Shuffle the Sounds for Each Card
 * The shuffleSounds function shuffles the available voices to randomize the speech synthesis for each card.
 */
function shuffleSounds() {
    const tempVoices = [...voices];
    shuffledVoices = [];
    while (tempVoices.length > 0) {
        const index = Math.floor(Math.random() * tempVoices.length);
        shuffledVoices.push(tempVoices.splice(index, 1)[0]);
    }
}
/** Function to Get the British English Voice (Fallback)
 * The getBritishEnglishVoice function returns the British English voice from the available voices if found, 
 * or it falls back to the first available voice.
 */
function getBritishEnglishVoice() {
    const britishEnglishVoice = voices.find((voice) => voice.lang === 'en-GB');
    return britishEnglishVoice || voices[0];
}
/** Function to Speak the Current Word Using Speech Synthesis
 *The speakWord function retrieves the current letter from the shuffled alphabet and gets the corresponding word to speak.
 *    * It creates a new SpeechSynthesisUtterance with the word to speak and sets the voice to the British English voice.
 */
function speakWord() {
    const currentLetter = shuffledAlphabet[currentIndex];
    const wordToSpeak = currentLetter.word;

    const speakText = new SpeechSynthesisUtterance(wordToSpeak);
    speakText.voice = getBritishEnglishVoice();

    // Speak the word
    synth.speak(speakText); //synth.speak to trigger the speech synthesis and speak the word
}