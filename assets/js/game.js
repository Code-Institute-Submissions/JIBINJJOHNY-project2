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