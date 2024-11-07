import { WORDS } from "./consts";
import { KEYBOARD_LATERS } from "./consts";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");

let triesLeft;
let winCount;

const createPlacholders = () => {
  const word = sessionStorage.getItem("word");
  //1
  const arrWord = Array.from(word);

  let placholdersHTML = arrWord.reduce((acc, curr, i) => {
    return acc + `<h1 id='letter_${i}' class='latter'>_</h1>`;
  }, "");
  return `<div id='placholders' class='placholders_wrapper'> ${placholdersHTML}</div>`;
};

const createHangmanimg = () => {
  const image = document.createElement("img");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.classList.add("hangman_image");
  image.id = "hangman_image";

  return image;
};

const createKeyboard = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";

  const keyboardHTML = KEYBOARD_LATERS.reduce((acc, curr) => {
    return (
      acc +
      `<button class='buttonPrimary keyboardButton' id='${curr}'>${curr}</button>`
    );
  }, "");

  keyboard.innerHTML = keyboardHTML;
  return keyboard;
};

const checkLatter = (latter) => {
  const word = sessionStorage.getItem("word");
  const inputLatter = latter.toLowerCase();

  if (!word.includes(inputLatter)) {
    const triesCounter = document.getElementById("tries_left");
    triesLeft -= 1;
    triesCounter.innerText = triesLeft;

    const hangmanImage = document.getElementById("hangman_image");
    hangmanImage.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame("lose");
    }
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLatter, index) => {
      if (currentLatter === inputLatter) {
        winCount += 1;

        document.getElementById(`letter_${index}`).innerText =
          inputLatter.toUpperCase();

        if (winCount === word.length) {
          stopGame("win");
        }
      }
    });
  }
};

const stopGame = (status) => {
  document.getElementById("placholders").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();
  document.getElementById("quit").remove();

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    document.getElementById("hangman_image").src = `images/hg-win.png`;
    document.getElementById("game").innerHTML +=
      '<h2 class="result_header win"> YOU WON :)! </h2>';
  } else if (status === "lose") {
    document.getElementById("game").innerHTML +=
      '<h2 class="result_header lose"> YOU LOST :( </h2>';
  } else if ("quit") {
    document.getElementById("hangman_image").remove();
    logoH1.classList.remove("logo_sm");
  }

  document.getElementById(
    "game"
  ).innerHTML += `<p> The word was <span class='result_word'> ${word.toUpperCase()} 
  </span></p> <button id='play_again' class='buttonPrimary px-5 py-2 mt-5'>Play Again</button> `;

  document.getElementById("play_again").onclick = startGame;
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;
  logoH1.classList.add("logo_sm");

  let indexRundom = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[indexRundom];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlacholders();

  gameDiv.innerHTML += `<div id='tries' class='mt-2 justify-center'> TRIES LEFT: <span id='tries_left' class='font-medium text-red-600 justify-center'>10</span></div>`;

  const hangmanImg = createHangmanimg();
  gameDiv.prepend(hangmanImg);

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;
      checkLatter(event.target.id);
    }
  });
  gameDiv.appendChild(keyboardDiv);

  gameDiv.insertAdjacentHTML(
    "beforeend",
    '<button id="quit" class="button_secondary px-2 py-1 mt-4">Quit</button>'
  );

  document.getElementById("quit").onclick = () => {
    const isSure = confirm("Are you sure you want to quit and lose progress?");
    if (isSure) {
      stopGame("quit");
    }
  };
};
