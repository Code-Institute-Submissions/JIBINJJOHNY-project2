/* jshint esversion:8 */
// Selecting necessary elements from the HTML
let draggableObjects;
let dropPoints;
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const playAgainButton = document.querySelector(".play-again-button");

let deviceType = "";
let initialX = 0
let initialY = 0;
let currentElement = "";
let moveElement = false;
// Event handler for DOMContentLoaded
window.addEventListener("DOMContentLoaded", async () => {
    // Call the creator function to generate the initial game state
    await creator();
    count = 0;
});
/**
 * isTouchDevice function attempts to create a touch event and detects if the device supports touch or not. 
 * If touch events are supported, deviceType is set to "touch"; otherwise, it's set to "mouse". 
 */
const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

let count = 0;

/**
 * Function to generate a random value from an array
 * Function takes an array (data) as input and returns a random element from that array.
 */
const randomValueGenerator = (data) => {
    return data[Math.floor(Math.random() * data.length)];
};

/**
 * Drag & Drop Functions
 * function is triggered when a draggable object starts to be dragged.
 * It first detects if the device is touch or mouse-based. 
 * For touch devices, it stores the initial touch coordinates and sets moveElement to true.
 */
function dragStart(e) {
    if (isTouchDevice()) {
        // For touch devices
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
        moveElement = true;
        currentElement = e.target;
    } else {
        // For mouse devices
        e.dataTransfer.setData("text", e.target.id);
    }
}
/**
 * dragOver(e) function is triggered when a draggable object is being dragged over a drop point. 
 * It prevents the default behavior to allow for dropping.
 */
function dragOver(e) {
    e.preventDefault();
}

/**
 * Function to handle touchmove event for touch devices
 * Function handles the touchmove event for touch devices. 
 * If moveElement is true, it calculates the new X and Y coordinates and moves the dragged element accordingly.
 */
const touchMove = (e) => {
    if (moveElement) {
        e.preventDefault();
        let newX = e.touches[0].clientX;
        let newY = e.touches[0].clientY;
        let currentSelectedElement = document.getElementById(e.target.id);
        // Move the dragged element with the touch movement
        currentSelectedElement.parentElement.style.top =
            currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
        currentSelectedElement.parentElement.style.left =
            currentSelectedElement.parentElement.offsetLeft - (initialX - newX) + "px";
        initialX = newX;
        initialY = newY;
    }
};

/**
 * Function to handle drop event
 * Function is triggered when a draggable object is dropped over a drop point. 
 */
const drop = (e) => {
    e.preventDefault();
    if (isTouchDevice()) {
        // For touch devices
        moveElement = false;
        const currentDrop = document.querySelector(`div[data-id='${e.target.id}']`);
        const currentDropBound = currentDrop.getBoundingClientRect();
        // Check if the dropped element is within the drop area
        if (
            initialX >= currentDropBound.left &&
            initialX <= currentDropBound.right &&
            initialY >= currentDropBound.top &&
            initialY <= currentDropBound.bottom
        ) {
            // Add the "dropped" class to the drop area and hide the dragged element
            currentDrop.classList.add("dropped");
            currentElement.classList.add("hide");
            currentDrop.innerHTML = ``;
            currentDrop.insertAdjacentHTML(
                "afterbegin",
                `<img src="${currentElement.getAttribute("src")}" alt="${currentElement.getAttribute("alt")}">`
            );
            count += 1;
        }
    } else {
        // For mouse devices
        const draggedElementData = e.dataTransfer.getData("text");
        const droppableElementData = e.target.getAttribute("data-id");
        if (draggedElementData === droppableElementData) {
            const draggedElement = document.getElementById(draggedElementData);
            // Add the "dropped" class to the drop area, hide the dragged element,
            // and insert the dragged element's image into the drop area
            e.target.classList.add("dropped");
            draggedElement.classList.add("hide");
            draggedElement.setAttribute("draggable", "false");
            e.target.innerHTML = ``;
            e.target.insertAdjacentHTML(
                "afterbegin",
                `<img src="${draggedElement.getAttribute("src")}" alt="${draggedElement.getAttribute("alt")}">`
            );
            count += 1;
        }
    }
    if (count === 3) {
        playAgainButton.classList.remove("hide");
        stopGame(); // Your code to handle game completion, if needed
    }
};

/**
 * Function to fetch alphabet data from the JSON file
 * This asynchronous function fetches alphabet data from a JSON file named "assets/js/alphabets.json". 
 * It returns the data obtained from the JSON file.
 */
async function fetchAlphabetData() {
    try {
        const response = await fetch('assets/js/alphabets.json');
        if (!response.ok) {
            throw new Error('Failed to fetch alphabet data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Function to create alphabet images and word drop points
 * This asynchronous function creates the alphabet images and word drop points for the game.
 */
const creator = async () => {
    dragContainer.innerHTML = "";
    dropContainer.innerHTML = "";
    let randomData = [];
    const alphabetData = await fetchAlphabetData(); // Fetch data from the JSON file
    for (let i = 1; i <= 3; i++) {
        let randomWord = randomValueGenerator(alphabetData);
        if (!randomData.includes(randomWord)) {
            randomData.push(randomWord);
        } else {
            i -= 1;
        }
    }
    for (let i of randomData) {
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("draggable-image");
        imgDiv.setAttribute("draggable", true);
        imgDiv.innerHTML = `<img src="${i.image}" alt="${i.imageAlt}" id="${i.letter}">`;
        dragContainer.appendChild(imgDiv);
    }
    randomData = randomData.sort(() => 0.5 - Math.random());
    for (let i of randomData) {
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `<div class='words' data-id='${i.letter}'>
        ${i.word}
      </div>`;
        dropContainer.appendChild(wordDiv);
    }
    setupEventListeners(); // Call the function to set up event listeners for new elements
};

/**
 * Function to set up event listeners for draggable objects and drop points
 * Function sets up event listeners for the draggable objects and drop points.
 */
const setupEventListeners = () => {
    dropPoints = document.querySelectorAll(".words");
    draggableObjects = document.querySelectorAll(".draggable-image");

    draggableObjects.forEach((element) => {
        element.addEventListener("dragstart", dragStart);
        element.addEventListener("touchstart", dragStart);
        element.addEventListener("touchend", drop);
        element.addEventListener("touchmove", touchMove);
    });

    dropPoints.forEach((element) => {
        element.addEventListener("dragover", dragOver);
        element.addEventListener("drop", drop);
    });
};

// Event listener for the "Play Again" button
playAgainButton.addEventListener("click", () => {
    draggableObjects.forEach((element) => {
        element.classList.remove("hide");
        element.setAttribute("draggable", "true");
    });

    dropPoints.forEach((element) => {
        element.classList.remove("dropped");
        element.innerHTML = "";
    });

    count = 0;
    playAgainButton.classList.add("hide");
    creator();
});