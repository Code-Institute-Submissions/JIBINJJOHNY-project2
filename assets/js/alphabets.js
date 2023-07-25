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