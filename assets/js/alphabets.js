// Selecting necessary elements from the HTML
const card = document.querySelector('.card');
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');
const letterElement = document.getElementById('letter');
const imageElement = document.getElementById('image');
const wordElement = document.getElementById('word');
const nextButton = document.getElementById('nextButton');
const voiceButton = document.getElementById('voice_btn');

// Speech Synthesis Related Variables
const synth = window.speechSynthesis;
let voices = [];
let shuffledAlphabet = [];
let shuffledVoices = [];
let currentIndex = 0;
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

// Function to Fetch the Alphabet Data from the JSON File and Group into Sets
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
    const currentLetter = shuffledAlphabet[currentIndex];
    const wordToSpeak = currentLetter.word;

    const speakText = new SpeechSynthesisUtterance(wordToSpeak);
    speakText.voice = getBritishEnglishVoice();

    // Speak the word
    synth.speak(speakText);
}

// Function to flip the card
function flipCard(event) {
    if (!isShowingImage && event.target !== voiceButton) {
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

// Function to Display the Current Letter, Image, and Word
function displayCurrentLetter() {
    const currentLetter = shuffledAlphabet[currentIndex];
    letterElement.textContent = currentLetter.letter;
    imageElement.src = currentLetter.image;
    imageElement.alt = currentLetter.imageAlt;
    wordElement.textContent = currentLetter.word;
    shuffleSounds();
}

// Function to Move to the Next Letter
function nextLetter() {
    // If all alphabets have been shown, shuffle the remaining letters for the next round
    if (currentIndex === shuffledAlphabet.length - 1) {
        shuffleAlphabet(shuffledAlphabet);
    }
    currentIndex = (currentIndex + 1) % shuffledAlphabet.length;
    isShowingImage = false;
    displayCurrentLetter();
}

// Function to Shuffle the Alphabet Array
function shuffleAlphabet(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
// Event listener for the "Next" button
nextButton.addEventListener('click', nextLetter);

// Fetch the alphabet data from the JSON file and initialize the app
fetchAlphabetData();