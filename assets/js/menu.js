/* jshint esversion:8 */
// Selecting necessary elements from the HTML
const openRulesButton = document.getElementById('openrules_btn');
const closeModalButton = document.getElementById('closemodal_btn');
const redirectButton = document.getElementById("redirect_btn");
const alphabetsButton = document.getElementById("alphabets_btn");
const buttonsDiv = document.querySelector(".mainpage_menus .hidden");
const gameButton = document.getElementById("game_btn");
const rulesModal = document.getElementById('rules_model');

/**
 * showRulesModal function is defined to show the rules modal.
 *  It sets the display style property of rulesModal to "flex", which means the modal will become visible and displayed as a flexible container.
 */
function showRulesModal() {
    rulesModal.style.display = 'flex';
}

/**
 * Function to close the rules modal when the "Close" button inside the modal is clicked
 */
function closeModal() {
    rulesModal.style.display = 'none';
}
/**
 * Function to close the rules modal when the user clicks outside the modal content area
 */
function closeModalOutside(event) {
    if (event.target === rulesModal) {
        closeModal();
    }
}

// Event listener for clicks outside the modal content area
window.addEventListener("click", closeModalOutside);

/**
 * Function to handle the click event of the "START" button
 */
/**
 * Function to handle the click event of the "START" button
 */
function handleStartClick() {
    // Hide the "RULES" button and the "START" button
    openRulesButton.style.display = "none";
    redirectButton.style.display = "none";

    // Show the "ALPHABETS" button and the "GAME" button
    alphabetsButton.style.display = "block";
    gameButton.style.display = "block";
}

/**
 * Function to handle the click event of the "ALPHABETS" button
 */
function redirectToAlphabets() {
    // Redirect the user to the "alphabets.html" page
    window.location.href = "alphabets.html";
}
/**
 * Function to handle the click event of the "GAME" button
 */
function redirectToGame() {
    // Redirect the user to the "quiz.html" page
    window.location.href = "game.html";
}

// Event listener for the "DOMContentLoaded" event
document.addEventListener("DOMContentLoaded", function (event) {
    // Add event listeners once the DOM is fully loaded
    openRulesButton.addEventListener('click', showRulesModal);
    closeModalButton.addEventListener('click', closeModal);
    redirectButton.addEventListener("click", handleStartClick);
    alphabetsButton.addEventListener("click", redirectToAlphabets);
    gameButton.addEventListener("click", redirectToGame);
});