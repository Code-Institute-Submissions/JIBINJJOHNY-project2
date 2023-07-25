// Get references to the necessary elements from the HTML page
const openRulesButton = document.getElementById('openrules_btn');
const closeModalButton = document.getElementById('closemodal_btn');
const redirectButton = document.getElementById("redirect_btn");
const alphabetsButton = document.getElementById("alphabets_btn");
const gameButton = document.getElementById("game_btn");
const rulesModal = document.getElementById('rules_model');
/* Function to show the rules modal when the "RULES" button is clicked*/
openRulesButton.addEventListener('click', () => {
    rulesModal.style.display = 'flex';
});
/* Function to close the rules modal when the "Close" button inside the modal is clicked */
closeModalButton.addEventListener('click', () => {
    rulesModal.style.display = 'none';
});
/* Function to handle the click event of the "START" button */
redirectButton.addEventListener("click", () => {
    // Hide the "RULES" button and the "START" button
    openRulesButton.style.display = "none";
    redirectButton.style.display = "none";

    // Show the "ALPHABETS" button and the "GAME" button
    alphabetsButton.style.display = "block";
    gameButton.style.display = "block";
});