# TESTING


## Compatibilit

To confirm correct functionality, responsiveness and appearance:
- The app has been tested on the following browsers: Chrome, Safari, Firefox.

    - Chrome :

    ![chrome browser](./documents/chrome.png)

    - Safari :

    ![safari browser](./documents/safari.png)

    - Firefox :
    ![firefox browser](./documents/firefox.png)

 ## Responsiveness

 - The site has been tested using the devtools that are implemented in Chrome browsers.
   #### Main page
      - Desktop screens:
        ![large screen](./documents/dektopmenu.png)

      - Tablet screens:
        ![tablet screen](./documents/tabletmenu.png)

      - Mobile screens:
        ![Mobile screen](./documents/mobile%20menu.png)

   #### Aphabets page
      - Desktop screens:
        ![large screen](./documents/desktopalphabet.png)

      - Tablet screens:
        ![tablet screen](./documents/tabletalphabet.png)

      - Mobile screens:
        ![Mobile screen](./documents/mobilealphabet.png)

    ####  Game page
      - Desktop screens:
        ![large screen](./documents/desktopgame.png)

      - Tablet screens:
        ![tablet screen](./documents/tabletgame.png)

       - Mobile screens:
        ![Mobile screen](./documents/mobilegame.png)
 
 -------
 ## Manual testing

| Feature | Action | Expected Result | Tested | Passed | Comments |
| --- | --- | --- | --- | --- | --- |
 Menu Page | | | | |  
| Rules button | Click on the Rules button | The user is redirected to modal window | Yes| Yes | - |
| Start button | Click on the Start button | The user is redirected to two option buttons | Yes | Yes | - |
| Alphabets button | Click on the Alphabets button | The user is redirected to the alphabets page | Yes | Yes | - |
| Game button | Click on the Game button | The user is redirected to the game page | Yes | Yes | - |
| Github icon in the footer| Click on the github icon | The user is redirected to the github page | Yes | Yes | - |
| Linkedin icon inthe footer | Click on the linkedin icon | The user is redirected to the linkedin page | Yes | Yes | - |
Alphabets page | | | | | |
| Card | User hover the card | card flip on mouseover | Yes | Yes |If the user mouseout it flips back to the front|
| Speak button | Click on the speak symbol button |It will pronounce the corresponding word with a British accent| Yes | Yes | The user clicks the speak button, then speaks the word, otherwise sees the image and word |
| Return button | Click on the back arrow button | The user is redirected to index page| Yes| Yes | - |
Game page | | | | | |
| Images | Click the image and drag it to droping point | the image will stick on the droping point and shown green backround| Yes | Yes | If the user drop incorrect image cannot drop it |
| Playagain button | Click on the playgain button | Next game will start | Yes | Yes | - |
| Return button | Click on the back arrow button | The user is redirected to index page| Yes| Yes | - |

# Validator testing
 ### HTML
  ##### Menu Page
  - No errors or warnings were found when it was run through the official W3C validator.
    - ![menu page html validator](./documents/htmlvalidator_menu.png)
##### Alphabets page
-  No errors or warnings were found when it was run through the official W3C validator.
    - ![alphabets page html validator](./documents/htmlvalidatorar_alphabets.png)
##### Game page
-  No errors or warnings were found when it was run through the official W3C validator.
    - ![game page html validator](./documents/htmlvalidator_game.png)

### CSS
- No errors were found in the official W3C (Jigsaw) check. 
    -![css validator](./documents/cssvalidator.png)
- 1 warnings were found
    - ![css validator warning](./documents/css%20warning.png)
    -  it means that CSS variables can have their values changed dynamically during runtime, making it challenging for static analysis tools to predict their final values during validation.
### JS

- No errors or warnings were found when passing through the official [JSHint](https://jshint.com/) validator:

  ![JSHint Validator menu Page](./documents/jshintmenu.png)
  ![JSHint Validator alphabets Page](./documents/jshintalphabets.png)
  ![JSHint Validator menu Page](./documents/jshintgame.png)
----

## LightHouse report
- With the help of Lighthouse in devtools, I have been able to confirm that the web app functions well, is accessible and that the colours and fonts chosen are readable
    ### Menu page

  ![menu page lighthouse](./documents/lighthouse_index.png)

   ### Alphabets page

  ![response page lighthouse](./documents/lighthouse_alphabets.png)
     ### Game page

  ![response page lighthouse](./documents/lighthouse_game.png)
  -----
### Bugs
 **Solved bugs**
   1. The function to shuffle the sounds for each card does not work correctly.
   - *Solutions:*  
   ```js
    function shuffleSounds() {
    const tempVoices = [...voices];
    shuffledVoices = [];
    while (tempVoices.length > 0) {
        const index = Math.floor(Math.random() * tempVoices.length);
        shuffledVoices.push(tempVoices.splice(index, 1)[0]);
    }
   }
   ```
   Add the above function to solve the problem.
   
   1. when the Play Again" button is clicked. All draggable items should be reset to their initial state, and matching pairs should be reshuffled. it was not working.the droped images are still there not reshuffled.

   - *Solutions:* 
   ```js
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
   ```
   Using click event handler to solve this problem.
   1. The open model window only closes when I press the close button, but when I press outside the window it does not close.
   - *Solutions:* 
```js
   function closeModalOutside(event) {
    if (event.target === rulesModal) {
        closeModal();
    }
   }
// Event listener for clicks outside the modal content area
window.addEventListener("click", closeModalOutside);
 ```
I added the above function and event listener to solve this problem.
### Unsolved bugs
- There is a problem in the game page, drop container the some words go outside the container.
 ### Mistakes
- Some committs are not properly committed.


