import '../css/style.css'
import { darkModeHandle } from './utils';
import { startGame } from './game';

darkModeHandle();


const startGameButton = document.getElementById('startGame');

startGameButton.addEventListener('click', startGame)

















// darkModeSwitcher.addEventListener('click', () => {
//   const htmlElement = document.documentElement;
//   if (htmlElement.classList.contains('dark')) {
//     htmlElement.classList.remove('dark');
//   } else {
//     htmlElement.classList.add('dark');
//   }
// })

// function checkDark() {
//   const htmlElement = document.documentElement;
//   let flag = false;
//   return () => {
//     if (flag) {
//       htmlElement.classList.remove('dark');
//       flag = false;
//     } else {
//       htmlElement.classList.add('dark');
//       flag = true;
//     }
//   }
// }
// const fn = checkDark();

// darkModeSwitcher.addEventListener('click', fn);


