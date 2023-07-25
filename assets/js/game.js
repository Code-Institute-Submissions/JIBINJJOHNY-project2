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