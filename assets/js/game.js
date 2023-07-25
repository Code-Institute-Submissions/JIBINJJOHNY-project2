   //Initial References
   let draggableObjects;
   let dropPoints;
   const dragContainer = document.querySelector(".draggable-objects");
   const dropContainer = document.querySelector(".drop-points");
   const playAgainButton = document.querySelector(".play-again-button")

   // Detect touch device
   let deviceType = "";
   let initialX = 0,
       initialY = 0;
   let currentElement = "";
   let moveElement = false;

   /**  Detect touch device
    *Function that detects whether the device supports touch events or not by trying to create a TouchEvent.
    *It updates the deviceType variable accordingly.
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
   // Function to generate a random value from an array
   const randomValueGenerator = (data) => {
       return data[Math.floor(Math.random() * data.length)];
   };
   // When a drag operation starts. It sets the initial coordinates for touch devices or stores the dragged element's ID for mouse devices.
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
   // When an element is being dragged over a valid drop target. It prevents the default action to enable dropping.
   function dragOver(e) {
       e.preventDefault();
   }
   // When a touch move event occurs on a touch device. It moves the dragged element along with the touch movement.
   const touchMove = (e) => {
       if (moveElement) {
           e.preventDefault();

           // Get the new X and Y coordinates of the touch event
           let newX = e.touches[0].clientX;
           let newY = e.touches[0].clientY;

           // Get the current selected element (the element being dragged)
           let currentSelectedElement = document.getElementById(e.target.id);

           // Calculate the new top position of the parent element (relative to its initial position)
           currentSelectedElement.parentElement.style.top =
               currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";

           // Calculate the new left position of the parent element (relative to its initial position)
           currentSelectedElement.parentElement.style.left =
               currentSelectedElement.parentElement.offsetLeft - (initialX - newX) + "px";

           // Update the initial X and Y coordinates to the new ones for the next touch move event
           initialX = newX;
           initialY = newY;
       }
   };

   // When a draggable element is dropped onto a drop target. It handles the logic for successful drops and updates the count.
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

   // Fetch Alphabet Data from JSON File
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
   // Creator Function
   const creator = async () => {
       // Clear any existing content in the drag and drop containers
       dragContainer.innerHTML = "";
       dropContainer.innerHTML = "";

       // Initialize an empty array to store random data
       let randomData = [];

       // Fetch data from the JSON file using an asynchronous function
       const alphabetData = await fetchAlphabetData();

       // Generate 3 unique random words from the alphabet data
       for (let i = 1; i <= 3; i++) {
           let randomWord = randomValueGenerator(alphabetData);

           // Check if the randomWord is not already in the randomData array
           if (!randomData.includes(randomWord)) {
               // If not, add the randomWord to the randomData array
               randomData.push(randomWord);
           } else {
               // If the word is already in randomData, repeat the iteration to find a new unique word
               i -= 1;
           }
       }

       // Create draggable image elements for each random word
       for (let i of randomData) {
           const imgDiv = document.createElement("div");
           imgDiv.classList.add("draggable-image");
           imgDiv.setAttribute("draggable", true);
           imgDiv.innerHTML = `<img src="${i.image}" alt="${i.imageAlt}" id="${i.letter}">`;

           // Append the draggable image to the dragContainer
           dragContainer.appendChild(imgDiv);
       }

       // Randomize the order of words in the randomData array
       randomData = randomData.sort(() => 0.5 - Math.random());

       // Create word elements for each random word in the dropContainer
       for (let i of randomData) {
           const wordDiv = document.createElement("div");
           wordDiv.innerHTML = `<div class='words' data-id='${i.letter}'>
        ${i.word}
        </div>`;

           // Append the word element to the dropContainer
           dropContainer.appendChild(wordDiv);
       }

       // Set up event listeners for the newly created elements
       setupEventListeners();
   };
   // Setup Event Listeners
   const setupEventListeners = () => {
       // Get all elements with class "words" and assign them to the dropPoints variable
       dropPoints = document.querySelectorAll(".words");

       // Get all elements with class "draggable-image" and assign them to the draggableObjects variable
       draggableObjects = document.querySelectorAll(".draggable-image");

       // Add event listeners to each draggable image element
       draggableObjects.forEach((element) => {
           // Listen for the "dragstart" event, which is triggered when dragging starts
           element.addEventListener("dragstart", dragStart);

           // Listen for the "touchstart" event, which is triggered when a touch interaction starts on a touch-enabled device
           element.addEventListener("touchstart", dragStart);

           // Listen for the "touchend" event, which is triggered when a touch interaction ends on a touch-enabled device
           element.addEventListener("touchend", drop);

           // Listen for the "touchmove" event, which is triggered when a touch interaction moves on a touch-enabled device
           element.addEventListener("touchmove", touchMove);
       });

       // Add event listeners to each drop point element
       dropPoints.forEach((element) => {
           // Listen for the "dragover" event, which is triggered when a draggable element is being dragged over the drop point
           element.addEventListener("dragover", dragOver);

           // Listen for the "drop" event, which is triggered when a draggable element is dropped on the drop point
           element.addEventListener("drop", drop);
       });
   };
   // Play Again Button Event Listener
   playAgainButton.addEventListener("click", () => {
       // Remove the "hide" class and enable dragging for all draggable image elements
       draggableObjects.forEach((element) => {
           element.classList.remove("hide");
           element.setAttribute("draggable", "true");
       });

       // Reset the drop points by removing the "dropped" class and clearing their content
       dropPoints.forEach((element) => {
           element.classList.remove("dropped");
           element.innerHTML = "";
       });

       // Reset the count variable to zero, indicating that no matches have been made yet
       count = 0;

       // Hide the "Play Again" button again
       playAgainButton.classList.add("hide");

       // Call the creator() function to set up a new game with new random elements
       creator();
   });