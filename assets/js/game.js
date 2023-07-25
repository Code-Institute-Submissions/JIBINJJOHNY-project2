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